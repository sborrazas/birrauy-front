import React from "react";
import domClasses from "../../../utils/dom/classes";
import { Link } from "react-router";

class List extends React.Component {
  render () {
    return (
      <div className="list">{this.props.children}</div>
    );
  }
}

List.propTypes = {
};

class Item extends React.Component {
  render () {
    var classes = null;

    classes = domClasses.set({
      "list-item": true,
      "list-item--title": this.props.title,
      "list-item--link": this.props.to
    });

    if (this.props.to) {
      return (
        <Link className={classes} to={this.props.to}>
          {this.props.children}
        </Link>
      );
    }
    else {
      return (
        <div className={classes}>{this.props.children}</div>
      );
    }
  }
}

Item.propTypes = {
  title: React.PropTypes.bool
};

class ItemTitle extends React.Component {
  render () {
    return (
      <div className="list-itemTitle">{this.props.children}</div>
    );
  }
}

class ItemDescription extends React.Component {
  render () {
    return (
      <div className="list-itemDescription">{this.props.children}</div>
    );
  }
}

List.Item = Item;
List.ItemTitle = ItemTitle;
List.ItemDescription = ItemDescription;

export default List;
