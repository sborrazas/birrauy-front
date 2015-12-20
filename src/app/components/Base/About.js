import React from "react";
import domClasses from "../../../utils/dom/classes";

class About extends React.Component {
  render () {
    return (
      <article className="about">{this.props.children}</article>
    );
  }
}

class Title extends React.Component {
  render () {
    var classes = null;

    return (
      <h1 className="about-title">
        {this.props.children}
      </h1>
    );
  }
}

Title.propTypes = {
  secondary: React.PropTypes.bool
};

class Description extends React.Component {
  render () {
    return (
      <p className="about-description">
        {this.props.children}
      </p>
    );
  }
}

class List extends React.Component {
  render () {
    return (
      <ul className="about-list">
        {this.props.children}
      </ul>
    );
  }
}

class ListItem extends React.Component {
  render () {
    return (
      <li className="about-listItem">
        {this.props.children}
      </li>
    );
  }
}

About.Title = Title;
About.Description = Description;
About.List = List;
About.ListItem = ListItem;

export default About;
