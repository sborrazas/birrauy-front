import React from "react";
import Layout from "../Base/Layout";
import Header from "../Base/Header";
import Details from "../Base/Details";
import Relay from "../../../utils/Relay.js";
import List from "../Base/List";

class Cerveza extends React.Component {
  render () {
    const beerQuery = this.props.beer;
    const beer = beerQuery.get("data");

    if (beerQuery.get("status") === "loading") {
      return (<div>Loading</div>);
    }

    console.log(beer.toJS());

    return (
      <Layout.Content detail={true}>
        <Header>
          <Header.Title>
            {beer.get("brand")}
            {" "}{beer.getIn(["style", "name"])}
          </Header.Title>
        </Header>
        <Details>
          <Details.Item>
            <Details.Title>Tamaño</Details.Title>
            {beer.get("size")}
          </Details.Item>
          <Details.Item>
            <Details.Title>Amargura</Details.Title>
            {beer.get("bitterness")}
          </Details.Item>
          <Details.Item>
            <Details.Title>Alcohol</Details.Title>
            {beer.get("alcohol")}
          </Details.Item>
          <Details.Item>
            <Details.Title>Tirada</Details.Title>
            {beer.get("draft") ? "Sí" : "No"}
          </Details.Item>
          <Details.Item>
            <Details.Title>Color</Details.Title>
            {beer.get("color")}
          </Details.Item>
          <Details.Item>
            <Details.Title>Estilo</Details.Title>
            {beer.getIn(["style", "name"]) || "–"}
          </Details.Item>
        </Details>
        <List>
          <List.Item title={true}>Dónde conseguirla</List.Item>
        <List.Item>{beer.getIn(["brewery", "name"])}</List.Item>
        </List>
      </Layout.Content>
    );
  }
}

Cerveza.propTypes = {
  beer: React.PropTypes.object.isRequired
};

export default Relay.createContainer(Cerveza, {
  queries: {
    beer: {
      info: function (params) {
        return {
          id: `/beers/${params.id}`
        };
      }
    }
  }
});
