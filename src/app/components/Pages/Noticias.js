import React from "react";
import Layout from "../Base/Layout";
import Banner from "../Base/Banner";
import { GoogleMap, Marker } from "react-google-maps";
import Relay from "../../../utils/Relay.js";
import {
  DEFAULT_LOCATION,
  IMAGES_URL,
  BREWERY_TYPES,
  BREWERY_IMG_MAP
} from "../../../../config/app.js";

class Mapa extends React.Component {
  constructor () {
    super();

    this.state = {
      activeBreweryId: null
    };
  }
  render () {
    console.log(this.props.news);
    return (<div>a</div>);


    var breweries = this.props.breweries
      , activeBreweryId = this.state.activeBreweryId
      , activeBrewery = null
      , breweryPhoto = null
      , containerProps = null
      , markers = null;

    containerProps = {
      style: {
        height: "100%",
      }
    };

    if (breweries.get("status") === "loading") {
      return (<div>Loading</div>);
    }

    if (activeBreweryId) {
      activeBrewery = breweries.get("data").find((brewery) => {
        return brewery.get("id") === activeBreweryId;
      });

      if (activeBrewery.get("photo_suffix")) {
        breweryPhoto = (
          <Banner.Img src={activeBrewery.get("photo_prefix") + "height50" + activeBrewery.get("photo_suffix")} />
        );
      }

      activeBrewery = (
        <Layout.Banner>
          <Banner>
            {breweryPhoto}
            <Banner.Title>{activeBrewery.get("name")}</Banner.Title>
            <Banner.Description>
              {activeBrewery.get("address")}
            </Banner.Description>
          </Banner>
        </Layout.Banner>
      );
    }

    markers = breweries.get("data")
      .filter((brewery) => {
        return brewery.get("lat") && brewery.get("lng") &&
          BREWERY_TYPES.indexOf(brewery.get("brewery_type")) !== -1;
      })
      .map((brewery) => {
        var isActive = brewery.get("id") === activeBreweryId
          , imgKey = BREWERY_IMG_MAP[brewery.get("brewery_type")]
          , position = null
          , icon = null;

        if (isActive) {
          imgKey += "-active";
        }

        position = {
          lat: parseFloat(brewery.get("lat")),
          lng: parseFloat(brewery.get("lng"))
        };
        icon = {
          url: (IMAGES_URL + imgKey + ".png"),
          scaledSize: {
            width: 34,
            height: 45
          }
        };

        return (
          <Marker key={brewery.get("id")}
                  position={position}
                  defaultAnimation={2}
                  icon={icon}
                  onClick={this._selectMarkerHandler(brewery.get("id"))} />
        );
      })
      .toJS();

    return (
      <Layout.Content withBanner={!!activeBrewery}>
        <GoogleMap containerProps={containerProps}
                   defaultCenter={DEFAULT_LOCATION}
                   defaultZoom={14}>
          {markers}
        </GoogleMap>
        {activeBrewery}
      </Layout.Content>
    );
  }
  _selectMarkerHandler (breweryId) {
    return () => {
      this.setState({ activeBreweryId: breweryId });
    };
  }
}

Mapa.propTypes = {
  news: React.PropTypes.object.isRequired
};

export default Relay.createContainer(Mapa, {
  queries: {
    news: {
      info: function (params, request) {
        return {
          id: "/posts"
        };
      }
    }
  }
});
