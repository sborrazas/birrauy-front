import React from "react";
import Immutable from "immutable";
import Layout from "../Base/Layout";
import List from "../Base/List";
import EmptyState from "../Base/EmptyState";
import Relay from "../../../utils/Relay.js";
import date from "../../../utils/date.js";

const THIS_WEEK_DAYS = 7;
const NEXT_WEEK_DAYS = 14;
const EVENT_URL = "https://www.facebook.com/events/";

const processEvents = (events) => {
  return events.map((event) => {
    const startTime = event.get("start_time");

    return (
      <List.Item key={event.get("id")} to={EVENT_URL + event.get("id")}>
        {
          startTime &&
            <List.ItemDate date={date.date(event.get("start_time"))}
                           month={date.month(event.get("start_time"))} />
        }
        <List.ItemTitle event={true}>{event.get("name")}</List.ItemTitle>
        {
          startTime &&
            <List.ItemDescription>{date.pretty(startTime)}</List.ItemDescription>
        }
      </List.Item>
    );
  }).toJS();
};

class Eventos extends React.Component {
  render () {
    const events = this.props.events;
    let listItems = [];
    let result;

    if (events.get("status") === "loading") {
      return (<div>Loading</div>);
    }

    const thisWeek = events.get("data").filter((event) => {
      const startTime = event.get("start_time");
      const daysLeft = startTime && date.daysLeft(startTime);

      return daysLeft && 0 <= daysLeft && daysLeft <= THIS_WEEK_DAYS;
    });
    const nextWeek = events.get("data").filter((event) => {
      const startTime = event.get("start_time");
      const daysLeft = startTime && date.daysLeft(startTime);

      return daysLeft && THIS_WEEK_DAYS < daysLeft && daysLeft <= NEXT_WEEK_DAYS;
    });
    const rest = events.get("data").filter((event) => {
      const startTime = event.get("start_time");
      const daysLeft = startTime && date.daysLeft(startTime);

      return daysLeft && daysLeft > NEXT_WEEK_DAYS;
    });
    const past = events.get("data").filter((event) => {
      const startTime = event.get("start_time");
      const daysLeft = startTime && date.daysLeft(startTime);

      return daysLeft && daysLeft < 0;
    });

    if (thisWeek.size > 0) {
      listItems.push(
        <List.Item key="this-week" title={true}>Esta semana</List.Item>
      );
      listItems = listItems.concat(processEvents(thisWeek));
    }
    if (nextWeek.size > 0) {
      listItems.push(
        <List.Item key="next-week" title={true}>Próxima semana</List.Item>
      );
      listItems = listItems.concat(processEvents(nextWeek));
    }
    if (rest.size > 0) {
      listItems.push(
        <List.Item key="rest" title={true}>Próximamente</List.Item>
      );
      listItems = listItems.concat(processEvents(rest));
    }
    if (past.size > 0) {
      listItems.push(
        <List.Item key="past" title={true}>Anteriores</List.Item>
      );
      listItems = listItems.concat(processEvents(past));
    }

    if (thisWeek.size > 0 || nextWeek.size > 0 || rest.size > 0 || past.size > 0) {
      result = (<List>{listItems}</List>);
    }
    else {
      result = (
        <EmptyState title="¿Nadie me invitó?"
                    subtitle="¿O no hay eventos?..." />
      );
    }


    return (
      <Layout.Content>
        {result}
      </Layout.Content>
    );
  }
}

Eventos.propTypes = {
  events: React.PropTypes.object.isRequired
};

export default Relay.createContainer(Eventos, {
  queries: {
    events: {
      info: function (params, request) {
        return {
          id: "/events",
          local: true
        };
      }
    }
  }
});
