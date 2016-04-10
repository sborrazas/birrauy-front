import React from "react";
import { Link } from "react-router";

class MainHeader extends React.Component {
  render () {
    return (
      <header className="mainHeader">{this.props.children}</header>
    );
  }
}

class Title extends React.Component {
  render () {
    return (
      <h1 className="mainHeader-title">{this.props.children}</h1>
    );
  }
}

class Logo extends React.Component {
  render () {
    return (
      <Link to="/"><img className="mainHeader-logo" src={this.props.src} /></Link>
    );
  }
}

MainHeader.Title = Title;
MainHeader.Logo = Logo;

export default MainHeader;
