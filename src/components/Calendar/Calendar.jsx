import React, { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { Calendar as Cal, momentLocalizer } from "react-big-calendar";
// import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import moment from "moment";

import './Calendar.scss';
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

export default function Calendar() {
  const bookings = useSelector((state) => state.booking);

  // console.log(bookings);
  // console.log(moment().add(-1, "hour").toDate());
  let test1 = moment().add(1, "hour").toDate();
  let test2 = moment().add(1, "hour").toDate();

  console.log(test1)
  console.log(test2)

  const events = useMemo(
    () =>
      bookings.map((booking) => ({
        title: booking.title,
        start: moment(booking.start).toDate(),
        end: moment(booking.start).toDate(),
        allDay: booking.allDay || false,
        resource: booking.resource || {},
      })),
    [bookings]
  );

  const handleOnSelectEvent = useCallback((selectEvent) => {
    console.log(selectEvent);
  }, []);

  const eventStyleGetter = () => {
    const now = new Date();
    const start = new Date(event.start);
    const end = new Date(event.end);
    let backgroundColor = end < now ? 'red' : start <= now && end >= now ? 'grey' : 'blue'
      return {
        style: {backgroundColor}
      }
    }
  return (
    <div className="">
      <Cal
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={events}
        resizable
        onSelectEvent={handleOnSelectEvent}
        eventPropGetter={eventStyleGetter}
        style={{ height: "100vh" }}
      />
    </div>
  );
}
