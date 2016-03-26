import React from "react";
import domClasses from "../../../utils/dom/classes";

class List extends React.Component {
  render () {
    return (
      <ul className="list">{this.props.children}</ul>
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
      "list-item--title": this.props.title
    });

    return (
      <li className={classes}>{this.props.children}</li>
    );
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
