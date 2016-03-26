import React from "react";
import domClasses from "../../../utils/dom/classes";

class Icon extends React.Component {
  render () {
    var classes = null;

    classes = domClasses.set({
      "icon": true
    }, this.props.className, "icon--" + this.props.name);

    return (
      <i className={classes} />
    );
  }
}

Icon.propTypes = {
  name: React.PropTypes.string.isRequired,
  className: React.PropTypes.string
};

export default Icon;
