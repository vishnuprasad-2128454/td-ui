import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { bookRoom } from "../../store/slices/reservationSlice";
import { Container, Row, Col, Card } from "react-bootstrap";
import moment from "moment";
import ReservationForm from "./ReservationForm";

const Reservation = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const { bookings } = useSelector((state) => state.reservations);

  const [timeArray, setTimeArray] = useState([]);
  const today = moment().format("YYYY-MM-DD");
  const now = moment().format("YYYY-MM-DD HH:mm");

  useEffect(() => {
    const generateTimeArr = () => {
      let currentTime = moment().startOf("hour");
      let endTime = moment().endOf("day").add(1, "minute");
      let timeArr = [];

      while (currentTime < endTime) {
        if (moment().isAfter(currentTime)) currentTime.add(30, "minutes");
        timeArr.push(currentTime.format("hh:mm A"));
        currentTime.add(30, "minutes");
      }
      setTimeArray(timeArr);
    };
    generateTimeArr();
  }, []);

  const initialState = {
    country: "",
    location: "",
    locationCategory: "",
    date: today,
    fromTime: timeArray[0],
    toTime: timeArray,
    attendees: "",
    layout: "",
    floor: "",
    workspaceType: "",
    vcu: false,
    from: moment().format("YYYY-MM-DDTHH:mm"),
    to: moment().add(1, "hour").format("YYYY-MM-DDTHH:mm"),
  };

  const fields = [
    {
      name: "country",
      label: "Country",
      type: "select",
      required: true,
      options: ["Select a Country", "US", "Canada"],
    },
    {
      name: "location",
      label: "Location",
      type: "select",
      required: true,
      options: [
        "Select a Location",
        "California",
        "Texas",
        "Florida",
        "New York",
        "Pennsylvania",
        "Ontario",
        "Quebec",
        "British Columbia",
        "Alberta",
        "Manitoba",
      ],
    },
    {
      name: "locationCategory",
      label: "Location Category",
      type: "select",
      options: [
        "Select a Location Category",
        "Location Category 1",
        "Location Category 2",
        "Location Category 3",
      ],
    },
    {
      name: "floor",
      label: "Floor",
      type: "select",
      options: ["Select a Floor", "Floor 1", "Floor 2", "Floor 3"],
    },
    {
      name: "workspaceType",
      label: "Workspace Type",
      type: "select",
      options: [
        "Select a Workspace Type",
        "Workspace Type 1",
        "Workspace Type 2",
        "Workspace Type 3",
      ],
    },
    {
      name: "date",
      label: "Date",
      type: "date",
      required: true,
      min: today,
    },
    {
      name: "fromTime",
      label: "From",
      type: "select",
      options: timeArray.slice(0, timeArray.length - 1),
      required: true,
    },
    {
      name: "toTime",
      label: "To",
      type: "select",
      options: timeArray.slice(1),
      required: true,
    },
    {
      name: "from",
      label: "From",
      type: "dateTime-local",
      required: true,
      min: now,
    },
    {
      name: "to",
      label: "To",
      type: "dateTime-local",
      required: true,
      min: moment(now).add(1, "hour").format("YYYY-MM-DD HH:mm"),
    },
    {
      name: "attendees",
      label: "Number of Attendees",
      type: "number",
      required: true,
      min: 1,
    },
    {
      name: "layout",
      label: "Layout",
      type: "select",
      options: ["Select a Layout", "Layout 1", "Layout 2", "Layout 3"],
    },
    {
      name: "vcu",
      label: "Video Conferencing Unit",
      type: "checkbox",
      checked: false,
    },
  ];

  const handleBooking = (formData) => {
    console.log(formData);
    dispatch(
      bookRoom({
        ...formData,
        resource: {},
      }),
    );
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col>
          <Card className="shadow-lg">
            <Card.Body>
              <h2 className="text-center mb-4">Conference Room Reservation</h2>
              <ReservationForm
                onSubmit={handleBooking}
                bookings={bookings}
                initialData={initialState}
                fields={fields}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Reservation;
