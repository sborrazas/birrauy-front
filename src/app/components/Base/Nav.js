import React from "react";
import Icon from "./Icon";
import { Link, IndexLink } from "react-router";

class Nav extends React.Component {
  render () {
    return (
      <nav className="nav">{this.props.children}</nav>
    );
  }
}

class Item extends React.Component {
  render () {
    if (this.props.to === "/") {
      return (
        <IndexLink to={this.props.to} className="nav-item" activeClassName="is-active">
          <Icon name={this.props.icon} className="nav-itemIcon" />
          {this.props.children}
        </IndexLink>
      );
    }
    else {
      return (
        <Link to={this.props.to} className="nav-item" activeClassName="is-active">
          <Icon name={this.props.icon} className="nav-itemIcon" />
          {this.props.children}
        </Link>
      );
    }
  }
}

Item.propTypes = {
  icon: React.PropTypes.string.isRequired,
  to: React.PropTypes.string.isRequired
};

Nav.Item = Item;

export default Nav;
