import App from "../../app";
import Store from "../../utils/Store.js";

var appEl = document.getElementById("app")
  , store = new Store();

// Create new app and attach to element
(new App({ store: store })).renderToDOM(appEl);
