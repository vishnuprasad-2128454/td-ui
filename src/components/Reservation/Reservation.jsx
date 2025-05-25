import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { bookRoom } from "../../store/slices/reservationSlice";
import { Container, Row, Col, Card } from "react-bootstrap";
import moment from "moment";
import ReservationForm from "./ReservationForm";

const Reservation = () => {
  // const navigate = useNavigate();
  const dateTimeFormat = "YYYY-MM-DDThh:mm";
  const dateFormat = "YYYY-MM-DD";
  const timeFormat = "hh:mm A";
  const dispatch = useDispatch();
  const { bookings } = useSelector((state) => state.reservations);

  const [timeArray, setTimeArray] = useState([]);
  const [advancedSearch, setAdvancedSearch] = useState(false);

  const now = moment();
  const [selectDateTime, setSelectDateTime] = useState(now);

  const selectedDateTime = useMemo(
    () => moment(selectDateTime),
    [selectDateTime],
  );

  function setInitialTime(currentTime) {
    let time = {};
    let startOfHour = moment(currentTime).startOf("hour");
    if (currentTime.isBefore(startOfHour.clone().add(30, "minutes"))) {
      time.fromTime = startOfHour.add(30, "minutes");
    } else {
      time.fromTime = startOfHour.add(1, "hour");
    }
    time.toTime = startOfHour.clone().add(30, "minutes");
    time.current = moment(currentTime);
    return time;
  }

  useEffect(() => {
    const generateTimeArr = () => {
      const currentTime = moment(selectDateTime);
      const startOfHour = moment(selectDateTime).startOf("hour").clone();
      let endTime = moment(selectDateTime).endOf("day").add(1, "minute");
      let timeArr = [];

      if (currentTime.isBefore(startOfHour.clone().add(30, "minutes"))) {
        startOfHour.add(30, "minutes").format(timeFormat);
      } else {
        startOfHour.add(1, "hour").format(timeFormat);
      }

      while (startOfHour < endTime) {
        timeArr.push(startOfHour.format(timeFormat));
        startOfHour.add(30, "minutes");
      }
      setTimeArray(timeArr);
    };
    generateTimeArr();
  }, [selectDateTime]);

  let timeObj = useMemo(() => setInitialTime(selectDateTime), [selectDateTime]);

  const fields = useMemo(
    () => [
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
        min: now.format(dateFormat),
      },
      {
        name: "fromTime",
        label: "From",
        type: "select",
        options:
          selectedDateTime.format(dateFormat) > now.format(dateFormat)
            ? timeArray
            : timeArray.slice(0, timeArray.length - 1),
        default: timeArray[0],
        required: true,
      },
      {
        name: "toTime",
        label: "To",
        type: "select",
        options:
          selectedDateTime.format(dateFormat) > now.format(dateFormat)
            ? timeArray.slice(0, timeArray.length - 1)
            : timeArray.slice(1),
        required: true,
      },
      {
        name: "from",
        label: "From",
        type: "dateTime-local",
        required: true,
        min: now.format(dateTimeFormat),
      },
      {
        name: "to",
        label: "To",
        type: "dateTime-local",
        required: true,
        min: selectedDateTime.add(1, "hour").format(dateTimeFormat),
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
    ],
    [now, selectedDateTime, timeArray],
  );

  const quickSearchFields = useMemo(
    () =>
      fields.filter(({ name }) =>
        [
          "country",
          "location",
          "locationCategory",
          "date",
          "fromTime",
          "toTime",
          "attendees",
          "layout",
        ].includes(name),
      ),
    [fields],
  );

  const advancedSearchFields = useMemo(
    () =>
      fields.filter(({ name }) =>
        [
          "country",
          "location",
          "floor",
          "workspaceType",
          "from",
          "to",
          "attendees",
          "layout",
          "vcu",
        ].includes(name),
      ),
    [fields],
  );

  const selectedFields = advancedSearch
    ? advancedSearchFields
    : quickSearchFields;
  console.log(selectedFields.length);

  const initialState = useMemo(
    () => ({
      attendees: "",
      country: "",
      date: timeObj.current.format(dateFormat),
      floor: "",
      from: moment().format(dateTimeFormat),
      fromTime: timeObj.fromTime?.format(timeFormat),
      location: "",
      layout: "",
      locationCategory: "",
      to: moment().add(1, "hour").format(dateTimeFormat),
      toTime: timeObj.toTime?.format(timeFormat),
      vcu: false,
      workspaceType: "",
    }),
    [timeObj],
  );

  const [formData, setFormData] = useState(initialState);

  const handleChange = useCallback((name, value, type, checked) => {
    if (name === "date" || name === "from") {
      setSelectDateTime(
        moment(value).isSame(moment(), "day") ? moment() : moment(value),
      );
    }
    setFormData((prev) => {
      const updatedValue = type === "checkbox" ? checked : value;
      return prev[name] === updatedValue
        ? prev
        : { ...prev, [name]: updatedValue };
    });
  }, []);

  const handleBooking = (formData) => {
    console.log(formData);
    dispatch(
      bookRoom({
        ...formData,
      }),
    );
  };

  const handleToggleSearchMode = useCallback(() => {
    setAdvancedSearch((prev) => !prev);
  }, []);

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
                fields={
                  advancedSearch ? advancedSearchFields : quickSearchFields
                }
                formData={formData}
                onChange={handleChange}
                advancedSearch={advancedSearch}
                handleToggle={handleToggleSearchMode}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Reservation;
