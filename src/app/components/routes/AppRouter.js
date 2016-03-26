import React from "react";
import { Router, Route, IndexRoute, NotFoundRoute } from "react-router";
import Root from "../Root";
import Cerveza from "../Pages/Cerveza";
import Info from "../Pages/Info";
import Mapa from "../Pages/Mapa";
import Noticias from "../Pages/Noticias";
import createBrowserHistory from "history/lib/createBrowserHistory";

const history = createBrowserHistory();

class NotFound extends React.Component {
  render () {
    return (<h1>Not Found</h1>);
  }
  componentDidMount () {
    document.location = "/404";
  }
}

// <Route path="eventos" component={Eventos} name="eventos" />
export default (
  <Router history={history}>
    <Route path="/" component={Root}>
      <Route path="cerveza" component={Cerveza} />
      <Route path="info" component={Info} />
      <Route path="noticias" component={Noticias} />
      <Route path="eventos" component={Noticias} />

      <IndexRoute component={Mapa} />

      <Route path="*" component={NotFound} />
    </Route>
  </Router>
);
