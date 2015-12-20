import React from "react";

class Link extends React.Component {
  render () {
    return (
      <a href={this.props.to} className="link">{this.props.children}</a>
    );
  }
}

Link.propTypes = {
  to: React.PropTypes.string.isRequired
};

export default Link;
