import React from "react";
import { Link } from "react-router";

class Details extends React.Component {
  render () {
    return (
      <div className="details">{this.props.children}</div>
    );
  }
}

class Item extends React.Component {
  render () {
    return (
      <div className="details-item">{this.props.children}</div>
    );
  }
}

class Title extends React.Component {
  render () {
    return (
      <span className="details-title">{this.props.children}</span>
    );
  }
}

Details.Item = Item;
Details.Title = Title;

export default Details;
