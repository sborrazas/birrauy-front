import React from "react";
import domClasses from "../../../utils/dom/classes";
import { Link } from "react-router";

class Filters extends React.Component {
  render () {
    return (
      <nav className="filters">{this.props.children}</nav>
    );
  }
}

class Item extends React.Component {
  render () {
    var classes = null;

    classes = domClasses.set({
      "filters-item": true
    });

    return (
      <Link className={classes}
            to={this.props.to}
            query={this.props.query}
            activeClassName="is-active">
        {this.props.children}
      </Link>
    );
  }
}

Item.propTypes = {
  to: React.PropTypes.string.isRequired,
  query: React.PropTypes.object
};

Filters.Item = Item;

export default Filters;
