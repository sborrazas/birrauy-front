import React from "react";
import Layout from "./Base/Layout";
import MainHeader from "./Base/MainHeader";
import Nav from "./Base/Nav";
import Mapa from "./Pages/Mapa";
import Cerveza from "./Pages/Cerveza";
import Noticias from "./Pages/Noticias";
import Info from "./Pages/Info";
import config from "../../../config/app";

/*
 * @class Root
 * @extends React.Component
 */
class Root extends React.Component {

  /*
   * @method render
   * @returns {JSX}
   */
  render () {
    return (
      <Layout>
        <Layout.Header>
          <MainHeader>
            <MainHeader.Logo src="/images/dondepinta-logo.png" />
            <MainHeader.Title>Dónde pinta?</MainHeader.Title>
          </MainHeader>
        </Layout.Header>
        {this.props.children}
        <Layout.Footer>
          <Nav>
            <Nav.Item to="/cervezas" icon="cerveza">Cerveza</Nav.Item>
            <Nav.Item to="/info" icon="info">Info</Nav.Item>
            <Nav.Item to="/" icon="mapa">Mapa</Nav.Item>
            <Nav.Item to="/eventos" icon="eventos">Eventos</Nav.Item>
            <Nav.Item to="/noticias" icon="noticias">Noticias</Nav.Item>
          </Nav>
        </Layout.Footer>
      </Layout>
    );
  }
}

// Prop types validation
Root.contextTypes = {
  store: React.PropTypes.object.isRequired
};

export default Root;
