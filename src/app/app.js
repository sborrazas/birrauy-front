import React from "react";
import ReactDOM from "react-dom";
import AppRouter from "./components/routes/AppRouter";

class InnerApp extends React.Component {
  getChildContext () {
    return {
      store: this.props.store
    };
  }

  render () {
    return AppRouter;
  }
}

InnerApp.propTypes = {
  store: React.PropTypes.object.isRequired
};

InnerApp.childContextTypes = {
  store: React.PropTypes.object.isRequired
};

/*
 * @class App
 */
class App {

  /*
   * @constructs App
   * @param {Object} options
   */
  constructor (options) {
    this.store = options.store;
  }

  /*
   * @method render
   * @param {DOM} [element]
   * @returns {String|undefined}
   */
  render (element) {
    // would be in JSX: <AppRoot state={this.state} />
    var appRootElement = React.createElement(InnerApp, {
      store: this.store
    });

    // render to DOM
    if (element) {
      ReactDOM.render(appRootElement, element);
      return;
    }

    // render to string
    return React.renderToString(appRootElement);
  }

  /*
   * @method render
   * @param {DOM} element
   */
  renderToDOM (element) {
    if (!element) {
      throw new Error("App.renderToDOM: element is required");
    }

    this.render(element);
  }

  /*
   * @method renderToString
   * @returns {String}
   */
  renderToString () {
    return this.render();
  }
}

export default App;
