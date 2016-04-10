import React from "react";
import { Link } from "react-router";

class Header extends React.Component {
  render () {
    return (
      <header className="header">{this.props.children}</header>
    );
  }
}

class Title extends React.Component {
  render () {
    return (
      <h1 className="header-title">{this.props.children}</h1>
    );
  }
}

Header.Title = Title;

export default Header;
