import EventEmitter from "events";
import { Map, fromJS } from "immutable";
import request from "superagent";

var ACTIONS_METHOD_MAP = null;

ACTIONS_METHOD_MAP = {
  "edit": "put",
  "delete": "delete"
};

class Store extends EventEmitter {
  constructor () {
    super();
    this._state = new Map();
    this._request = new Map();
  }
  onChange (callback) {
    this.on("change", callback);
  }
  removeOnChangeListener (callback) {
    this.removeListener("change", callback);
  }
  setRequest (request) {
    this._request = request;
    this.emit("change");
  }
  fetchQuery (query, params) {
    return this._fetchResource(query.info(params, this._request));
  }
  fetchMutator (mutator, params, forceLoad) {
    var self = this
      , related = {}
      , id = null
      , state = null
      , resourceInfo = null
      , stale = []
      , resource = null;

    if (mutator.related) {
      collection.each(mutator.related(), function (_, id) {
        related[id] = self._state[id];
      });
    }

    resourceInfo = mutator.info(params, related);
    id = resourceInfo.id;

    forceLoad = forceLoad && resourceInfo.expires;

    if (mutator.stale) {
      stale = mutator.stale(params, related);
    }

    if (!self._mutators[id]) {
      if (resourceInfo.create) {
        self._createMutator({
          id: id,
          status: "success",
          resource: resourceInfo.initial || {},
          create: true,
          append: resourceInfo.append,
          stale: stale
        });
      }
      else {
        resource = self._fetchResource({
          id: id,
          forceLoad: forceLoad
        });

        if (resource.status === "success") {
          if (collection.isArray(resource.data)) {
            resource = collection.clone(resource.data);
          }
          else {
            resource = object.clone(resource.data);
          }

          self._createMutator({
            id: id,
            status: "success",
            resource: resource,
            initial: resourceInfo.initial,
            append: resourceInfo.append,
            stale: stale
          });
        }
        else {
          return resource;
        }
      }
    }

    return self._mutators[id];
  }
  clearMutator (mutator) {
    delete this._mutators[mutator.id];
  }
  _createMutator (params) {
    var self = this
      , item = null
      , mutator = null
      , data = null;

    data = params.resource;

    if (params.status === "success" && params.resource.collection) {
      data = this._denormalizeCollection(data);
    }

    mutator = self._mutators[params.id] = {
      id: params.id,
      status: params.status,
      item: item,
      data: object.deepClone(data),
      errors: params.errors || {},
      create: params.create,
      update (key) {
        return function (value) {
          self._updateMutator({
            id: params.id,
            key: key,
            value: value
          });
        };
      },
      replace (value) {
        self._replaceMutator({
          id: params.id,
          status: "success",
          data: value || {},
        });
      },
      delete (key) {
        self._deleteMutator(id, key);
      },
      save (action, options, successCallback, failedCallback) {
        return self._saveMutator({
          id: params.id,
          action: action,
          options: options,
          successCallback: successCallback,
          failedCallback: failedCallback,
          create: params.create,
          append: params.append,
          stale: params.stale
        });
      },
      revert (key) {
        self._updateMutator({
          id: params.id,
          key: key,
          value: self._state[params.id].data[key]
        });
      },
      reload (successCallback, failedCallback) {
        self._fetchResource({
          id: params.id,
          forceLoad: true,
          successCallback (resource) {
            delete self._mutators[params.id];
            if (successCallback) {
              successCallback(resource);
            }
          },
          failedCallback: failedCallback
        });
      }
    };
  }
  _updateMutator (params) {
    var mutator = this._mutators[params.id];

    if (mutator.status === "loading") {
      return;
    }

    mutator.status = "success";
    mutator.data[params.key] = params.value;
    if (mutator.errors.hasOwnProperty(params.key)) {
      delete mutator.errors[params.key];
    }

    this.emit("change");
  }
  _replaceMutator (params) {
    var mutator = this._mutators[params.id];

    if (mutator.status === "loading") {
      return;
    }

    mutator.status = params.status;
    mutator.data = params.data;
    mutator.errors = {};

    this.emit("change");
  }
  _deleteMutator(id, key) {
    var mutator = this._mutators[id];

    if (mutator.status === "loading") {
      return;
    }

    mutator.status = "success";
    mutator.data.splice(key, 1);
    mutator.errors = {};

    this.emit("change");
  }
  _saveMutator (params) {
    var self = this
      , mutator = this._mutators[params.id]
      , create = mutator.create
      , path = params.id
      , method = "post";

    if (mutator.status === "loading") {
      return;
    }

    mutator.status = "loading";
    self.emit("change");

    if (params.action) {
      path = [path, params.action].join("/");
      method = ACTIONS_METHOD_MAP[params.action] || "post";
    }

    return ajax[method](path, { payload: mutator.data }, params.options)
      .then(function (resource) {
        delete self._mutators[params.id];

        if (create && resource) {
          if (params.append && self._state[params.id] &&
              self._state[params.id].status === "success") {

            self._state[params.id].data.items.push(resource._id);
          }
          params.id = resource._id;
        }

        if (resource && resource.collection) {
          self._state[params.id] = {
            status: "success",
            data: self._normalizeCollection(params.id, resource)
          };
        }
        else {
          self._state[params.id] = {
            status: "success",
            data: resource
          };
        }

        collection.each(params.stale, function (_, resourceId) {
          var pattern = new RegExp(resourceId + "(?:\\?.*)?$");

          collection.each(object.keys(self._state), function (_, stateId) {
            if (stateId.match(pattern)) {
              delete self._state[stateId];
            }
          });
        });

        self.emit("change");

        if (params.successCallback) {
          params.successCallback(resource);
        }
      }, function (resource) {
        mutator.status = "failed";

        if (!resource) {
          console.error("ERROR: " + method + " " + params.id);

          self.emit("change");

          return;
        }

        mutator.errors = resource.errors;

        if (params.options && params.options.revertOnFailure) {
          mutator.data = self._state[params.id].data || {};
        }

        self.emit("change");

        if (params.failedCallback) {
          params.failedCallback(resource);
        }
      })
      .done();
  }
  _fetchResource (params) {
    var id = params.id
      , resource = null;

    if (params.cursor) {
      id = [id, params.cursor].join("?");
    }

    if (!this._state.has(id)) {
      this._state = this._state.set(id, new Map({
        id: id,
        status: "loading",
        data: {}
      }));

      request.get("//birra.herokuapp.com/api/v1" + id)
        .set("Accept", "application/json")
        .end((error, response) => {
          var resource = fromJS(response.body);

          this._state = this._state.set(id, new Map({
            id: id,
            status: "success",
            data: resource
          }));

          this.emit("change");
        });
        // }, function (resource) {
        //   self._state[resourceId] = {
        //     status: "failed",
        //     data: resource || {}
        //   };

        //   if (!resource) {
        //     console.error("ERROR: " + resourceId);
        //   }

        //   self.emit("change");

        //   if (params.failedCallback) {
        //     params.failedCallback(resource);
        //   }
        // })
        // .done();
    }

    return this._state.get(id);
  }
}

module.exports = Store;
