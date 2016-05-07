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
      if (this.props.to.startsWith("http")) {
        return (
          <a className={classes} href={this.props.to} target="_blank">
            {this.props.children}
          </a>
        );
      }
      else {
        return (
          <Link className={classes} to={this.props.to}>
            {this.props.children}
          </Link>
        );
      }
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
    var classes = null;

    classes = domClasses.set({
      "list-itemTitle": true,
      "list-itemTitle--event": this.props.event
    });

    return (
      <div className={classes}>{this.props.children}</div>
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

class ItemDate extends React.Component {
  render() {
    return (
      <div className="list-itemDate">
        <span className="list-itemDateDay">{this.props.date}</span>
        {this.props.month}
      </div>
    );
  }
}

ItemDate.propTypes = {
  date: React.PropTypes.string.isRequired,
  month: React.PropTypes.string.isRequired
};

List.Item = Item;
List.ItemTitle = ItemTitle;
List.ItemDescription = ItemDescription;
List.ItemDate = ItemDate;

export default List;
