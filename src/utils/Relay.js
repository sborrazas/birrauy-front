import React from "react";
import { Map } from "immutable";

export default {
  createContainer: function (Component, options) {
    var queries = new Map(options.queries);

    class Wrapper extends React.Component {
      constructor (props, context) {
        var params = new Map();

        super();

        this.state = {
          params: params
        };
      }
      componentWillMount () {
        this.context.store.onChange(this._storeChanged.bind(this));
        this._storeChanged();
      }
      componentWillUnmount () {
        this.context.store.removeOnChangeListener(this._storeChanged);
      }
      shouldComponentUpdate (nextProps, nextState) {
        return true;
      }
      render () {
        return (
          <Component {...this.props}
                     {...this.state.data}
                     setParams={this._setParams} />
        );
      }
      _storeChanged () {
        this.setState({ data: this._getStoreData(this.state.params) });
      }
      _setParams (newParams) {
        var params = this.state.params.merge(newParams)
          , data = this._getStoreData(params);

        this.setState({ params: params, data: data });
      }
      _getStoreData (params) {
        var store = this.context.store
          , data = {};

        queries.forEach((query, name) => {
          data[name] = store.fetchQuery(query, this.props.params);
        });

        return data;
      }
    }

    Wrapper.contextTypes = {
      store: React.PropTypes.object.isRequired
    };

    return Wrapper;
  }
}
