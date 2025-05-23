import React, { useEffect, useMemo, useState } from "react";
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
      const currentTime = moment()
      const startOfHour = moment().startOf("hour");
      let endTime = moment().endOf("day").add(1, "minute");
      let timeArr = [];

      if (currentTime.isBefore(startOfHour.clone().add(30, 'minutes'))) {
        startOfHour.add(30, "minutes")
          .format("hh:mm A");
      } else {
        startOfHour.add(1, 'hour').format("hh:mm A");
      }

      while (startOfHour < endTime) {
        timeArr.push(startOfHour.format("hh:mm A"));
        startOfHour.add(30, "minutes");
      }
      setTimeArray(timeArr);
    };
    generateTimeArr();
  }, []);

  let timeObj = setInitialTime(moment(), moment()
  .startOf("hour"))
  
  function setInitialTime(currentTime, startOfHour) {
    let time = {}
    if (currentTime.isBefore(startOfHour.clone().add(30, 'minutes'))) {
      time.fromTime = 
      startOfHour.add(30, "minutes")
        .format("hh:mm A");
    } else {
      time.fromTime = startOfHour.add(1, 'hour').format("hh:mm A");
    }
      time.toTime = startOfHour
        .add(30, "minutes")
        .format("hh:mm A");
      return time
  }

  const initialState = useMemo(
    () => ({
      attendees: "",
      country: "",
      date: today,
      floor: "",
      from: moment().format("YYYY-MM-DDTHH:mm"),
      fromTime: timeObj.fromTime,
      location: "",
      layout: "",
      locationCategory: "",
      to: moment().add(1, "hour").format("YYYY-MM-DDTHH:mm"),
      toTime: timeObj.toTime,
      vcu: false,
      workspaceType: "",
    }),
    [timeObj.fromTime, timeObj.toTime, today]
  );

  const [formData, setFormData] = useState(initialState);

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
      default: timeArray[0],
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

  const handleChange = (name, value, type, checked) => {
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleBooking = (formData) => {
    console.log(formData);
    dispatch(
      bookRoom({
        ...formData,
      })
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
                formData={formData}
                onChange={handleChange}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Reservation;