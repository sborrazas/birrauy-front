import React from "react";
import Layout from "../Base/Layout";
import Banner from "../Base/Banner";
import Relay from "../../../utils/Relay.js";
import List from "../Base/List";

class Cerveza extends React.Component {
  constructor () {
    super();

    this.state = {
      activeBreweryId: null
    };
  }
  render () {
    var beers = this.props.beers
      , beersByBrand = null;

    if (beers.get("status") === "loading") {
      return (<div>Loading</div>);
    }

    beersByBrand = beers.get("data").groupBy((b) => b.get("brand"));

    return (
      <Layout.Content withBanner={false}>
        <List>
          {
            beersByBrand.map((beers, brand) => {
              const list = [
                <List.Item key={"brand-" + brand} title={true}>
                  {brand}
                </List.Item>
              ];
              const brandBeers = beers.map((beer) => {
                return (
                  <List.Item key={beer.get("id")}>
                    <List.ItemTitle>
                      {beer.get("brand")}
                      {" "}{beer.get(["style", "name"])}
                      {" "}{beer.get("size")}
                    </List.ItemTitle>
                    <List.ItemDescription>
                      {beer.getIn(["brewery", "name"])}
                    </List.ItemDescription>
                  </List.Item>
                );
              })
              .toJS();

              return list.concat(brandBeers);
            })
          }
        </List>
      </Layout.Content>
    );
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
