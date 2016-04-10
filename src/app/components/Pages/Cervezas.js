import React from "react";
import Layout from "../Base/Layout";
import Banner from "../Base/Banner";
import Relay from "../../../utils/Relay.js";
import List from "../Base/List";

class Cervezas extends React.Component {
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
      <Layout.Content>
        <List>
          {
            beersByBrand.keySeq().map((brand) => {
              const beers = beersByBrand.get(brand);

              const list = [
                <List.Item key={"brand-" + brand} title={true}>
                  {brand}
                </List.Item>
              ];

              const brandBeers = beers.map((beer) => {
                const id = beer.get("id");

                return (
                  <List.Item key={id} to={`/cervezas/${id}`}>
                    <List.ItemTitle>
                      {brand}
                      {" "}{beer.getIn(["style", "name"])}
                      {" "}{beer.get("size")}
                    </List.ItemTitle>
                    <List.ItemDescription>
                      {beer.getIn(["brewery", "name"])}
                    </List.ItemDescription>
                  </List.Item>
                );
              }).toJS();

              return list.concat(brandBeers);
            }).toJS()
          }
        </List>
      </Layout.Content>
    );
  }
}

Cervezas.propTypes = {
  beers: React.PropTypes.object.isRequired
};

export default Relay.createContainer(Cervezas, {
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
