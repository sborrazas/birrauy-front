import React from "react";

class EmptyState extends React.Component {
  render () {
    return (
      <div className="emptyState">
        <h1 className="emptyState-title">{this.props.title}</h1>
        <h2 className="emptyState-subtitle">{this.props.subtitle}</h2>
      </div>
    );
  }
}

EmptyState.propTypes = {
  subtitle: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired
};

export default EmptyState;
