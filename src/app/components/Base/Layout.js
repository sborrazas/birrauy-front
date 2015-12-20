import React from "react";
import domClasses from "../../../utils/dom/classes";

class Layout extends React.Component {
  render () {
    return (
      <div className="layout">
        {this.props.children}
      </div>
    );
  }
}

class Header extends React.Component {
  render () {
    return (
      <div className="layout-header">
        {this.props.children}
      </div>
    );
  }
}

class Content extends React.Component {
  render () {
    var classes = null;

    classes = domClasses.set({
      "layout-content": true,
      "layout-content--withBanner": this.props.withBanner
    });

    return (
      <div className={classes}>
        {this.props.children}
      </div>
    );
  }
}

Content.propTypes = {
  withBanner: React.PropTypes.bool
};

class Banner extends React.Component {
  render () {
    return (
      <div className="layout-banner">
        {this.props.children}
      </div>
    );
  }
}

class Footer extends React.Component {
  render () {
    return (
      <div className="layout-footer">
        {this.props.children}
      </div>
    );
  }
}

Layout.Header = Header;
Layout.Content = Content;
Layout.Banner = Banner;
Layout.Footer = Footer;

export default Layout;
