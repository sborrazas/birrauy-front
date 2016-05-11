import React from "react";
import Layout from "../Base/Layout";
import Relay from "../../../utils/Relay.js";
import List from "../Base/List";
import EmptyState from "../Base/EmptyState";
import date from "../../../utils/date.js";

const NEWS_URL = "https://www.facebook.com/CervezaArtesanalUY/posts/";

class Noticias extends React.Component {
  render () {
    const news = this.props.news;
    let content;

    if (news.get("status") === "loading") {
      return (<div>Loading</div>);
    }

    if (news.get("data").size > 0) {
      content = news.get("data")
        .filter((pNews) => {
          return pNews.get("message");
        })
        .map((pNews) => {
          const createdTime = pNews.get("created_time");

          return (
            <List.Item key={pNews.get("id")} to={NEWS_URL + pNews.get("id")}>
              <List.ItemDate date={date.date(createdTime)}
                             month={date.month(createdTime)} />
              <List.ItemTitle event={true}>{pNews.get("message")}</List.ItemTitle>
              <List.ItemDescription>
                {date.pretty(createdTime)}
              </List.ItemDescription>
            </List.Item>

          );
        });
    }
    else {
      content = (
        <EmptyState title="Estos programadores..."
                    subtitle="No se encontró ninguna noticia" />

      );
    }

    return (
      <Layout.Content>
        {content}
      </Layout.Content>
    );
  }
}

Noticias.propTypes = {
  news: React.PropTypes.object.isRequired
};

export default Relay.createContainer(Noticias, {
  queries: {
    news: {
      info: function (params, request) {
        return {
          id: "/news",
          local: true
        };
      }
    }
  }
});
