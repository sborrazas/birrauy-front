import React from "react";
import Layout from "../Base/Layout";
import Banner from "../Base/Banner";
import Relay from "../../../utils/Relay.js";

class Cerveza extends React.Component {
  constructor () {
    super();

    this.state = {
      activeBreweryId: null
    };
  }
  render () {
    var beers = this.props.beers;

    console.log("beers", beers.toJS());

    if (beers.get("status") === "loading") {
      return (<div>Loading</div>);
    }

    return (
      <Layout.Content withBanner={false}>
        {
          beers.get("data").map(function (beer) {
            return (
              <div key={beer.get("id")}>
                {beer.get("brand")}
                {" - "}{beer.get("style")}
              </div>
            );
          })
        }
      </Layout.Content>
    );
  }
  _selectMarkerHandler (breweryId) {
    return () => {
      this.setState({ activeBreweryId: breweryId });
    };
  }
}

Cerveza.propTypes = {
  beers: React.PropTypes.object.isRequired
};

export default Relay.createContainer(Cerveza, {
  queries: {
    beers: {
      info: function (params, request) {
        return {
          id: "/beers"
        };
      }
    }
  }
});
