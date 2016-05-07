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
  }
  onChange (callback) {
    this.on("change", callback);
  }
  removeOnChangeListener (callback) {
    this.removeListener("change", callback);
  }
  fetchQuery (query, params) {
    return this._fetchResource(query.info(params));
  }
  _fetchResource (params) {
    var id = params.id
      , req = null;

    if (params.cursor) {
      id = [id, params.cursor].join("?");
    }

    if (!this._state.has(id)) {
      this._state = this._state.set(id, new Map({
        id: id,
        status: "loading",
        data: {}
      }));


      if (params.local) {
        req = request.get("/api" + id);
      }
      else {
        req = request.get("//birra.herokuapp.com/api/v1" + id);
      }

      req
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
    }

    return this._state.get(id);
  }
}

module.exports = Store;
