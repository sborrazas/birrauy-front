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
      "layout-content--detail": this.props.detail,
      "layout-content--withBanner": this.props.withBanner,
      "layout-content--withSecondaryBanner": this.props.withSecondaryBanner
    });

    return (
      <div className={classes}>
        {this.props.children}
      </div>
    );
  }
}

Content.propTypes = {
  detail: React.PropTypes.bool,
  withBanner: React.PropTypes.bool,
  withSecondaryBanner: React.PropTypes.bool,
};

class Banner extends React.Component {
  render () {
    var classes = null;

    classes = domClasses.set({
      "layout-banner": true,
      "layout-banner--secondary": this.props.secondary,
      "layout-banner--thirdary": this.props.thirdary
    });

    return (
      <div className={classes}>
        {this.props.children}
      </div>
    );
  }
}

Banner.propTypes = {
  secondary: React.PropTypes.bool
};

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
