import React from "react";
import domClasses from "../../../utils/dom/classes";

class Icon extends React.Component {
  render () {
    var classes = null;

    classes = domClasses.set({
      "icon": true
    }, this.props.className);

    return (
      <img className={classes}
           src={"/images/icons/" + this.props.name + ".svg"} />
    );
  }
}

Icon.propTypes = {
  name: React.PropTypes.string.isRequired,
  className: React.PropTypes.string
};

export default Icon;
