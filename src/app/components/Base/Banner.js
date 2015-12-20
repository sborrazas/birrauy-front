import React from "react";

class Banner extends React.Component {
  render () {
    return (
      <header className="banner">{this.props.children}</header>
    );
  }
}

class Title extends React.Component {
  render () {
    return (
      <h1 className="banner-title">{this.props.children}</h1>
    );
  }
}

class Description extends React.Component {
  render () {
    return (
      <p className="banner-description">{this.props.children}</p>
    );
  }
}

class Img extends React.Component {
  render () {
    return (
      <img className="banner-img" src={this.props.src} />
    );
  }
}

Img.propTypes = {
  src: React.PropTypes.string.isRequired
};

Banner.Title = Title;
Banner.Description = Description;
Banner.Img = Img;

export default Banner;
