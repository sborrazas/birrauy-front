import React from "react";

class Text extends React.Component {
  render () {
    return (
      <span className="text">{this.props.children}</span>
    );
  }
}

Text.propTypes = {
  strong: React.PropTypes.bool
};

export default Text;
