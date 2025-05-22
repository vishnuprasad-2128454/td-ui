import React, { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { Calendar as Cal, momentLocalizer } from "react-big-calendar";
// import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import moment from "moment";
import { Container } from "react-bootstrap";

import "./Calendar.scss";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

export default function Calendar() {
  const { bookings } = useSelector((state) => state.reservations);

  const events = useMemo(
    () =>
      bookings.map((booking) => ({
        title: booking.subject,
        start: moment(booking.startDate).toDate(),
        end: moment(booking.endDate).toDate(),
        allDay: booking.allDay || false,
        resource: {
          ...booking.resource,
          room: booking.room,
          name: booking.name,
        },
      })),
    [bookings],
  );

  const handleOnSelectEvent = useCallback((selectEvent) => {
    console.log(selectEvent);
  }, []);

  return (
    <Container className="mt-2">
      <Cal
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={events}
        resizable
        onSelectEvent={handleOnSelectEvent}
        style={{ height: "100vh" }}
      />
    </Container>
  );
}
