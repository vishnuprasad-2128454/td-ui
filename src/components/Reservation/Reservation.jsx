import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bookRoom } from "../../store/slices/bookingSlice";
import {
  Button,
  Form,
  Container,
  Table,
  Row,
  Col,
  Card,
  InputGroup,
} from "react-bootstrap";
import moment from "moment";

const Reservation = () => {
  const now = moment().format("YYYY-MM-DDTHH:mm");
  const initialState = {
    subject: "",
    name: '',
    room: "",
    startDate: now,
    endDate: moment(now).add(1, "hour").format("YYYY-MM-DDTHH:mm"),
    allDay: false,
  };

  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const bookings = useSelector((state) => state.booking);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "allDay" && checked
        ? {
            endDate: moment(prev.startDate).format("YYYY-MM-DDT23:59"),
            startDate: now,
          }
        : {}),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('from submit');
    const { subject, room, startDate, endDate, allDay, name } = formData;

    const newErrors = {};
    if (!name) newErrors.name = "Name is required";
    if (!subject) newErrors.subject = "Subject is required";
    if (!room) newErrors.room = "Room is required";
    if (!startDate) newErrors.startDate = "Start date is required";
    if (!endDate) newErrors.endDate = "End date is required";
    if (moment(startDate).isBefore(moment(now)))
      newErrors.startDate = "Start date can't be before current date and time";
    if (moment(endDate).isBefore(moment(startDate)))
      newErrors.endDate = "End date can't be before Start date";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (subject && room) {
      dispatch(
        bookRoom({
          subject,
          room,
          startDate: moment(startDate).toString(),
          endDate: moment(endDate).toString(),
          allDay,
          resource: {},
        })
      );
      setFormData(initialState);
      setErrors({});
      navigate('/reservations')
    }
  };

  const handleSaveForLater = (e) => {
    e.preventDefault();
    console.log('from save');
    navigate('/reservations')
  }

  const formattedBookings = useMemo(
    () =>
      bookings.map((booking) => ({
        ...booking,
        startDate: moment(booking.startDate).format("YYYY-MM-DDTHH:mm"),
        endDate: moment(booking.endDate).format("YYYY-MM-DDTHH:mm"),
      })),
    [bookings]
  );

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow-lg">
            <Card.Body>
              <h2 className="text-center mb-4">Room Reservation</h2>
              <Form onSubmit={handleSubmit}>
                {["name", "subject", "room"].map((el) => (
                  <InputGroup className="mb-3 align-items-baseline" key={el}>
                    <Form.Label>
                      {el === "name"
                        ? "Name *"
                        : el === "subject"
                        ? "Subject *"
                        : "Room *"}
                    </Form.Label>
                    <Form.Control
                      className={`ms-2 ${errors[el] ? "is-invalid" : ""}`}
                      type="text"
                      name={el}
                      placeholder={`Enter ${el}`}
                      value={formData[el]}
                      onChange={handleChange}
                    />
                    {errors[el] && (
                      <div className="invalid-feedback">{errors[el]}</div>
                    )}
                  </InputGroup>
                ))}
                {["startDate", "endDate"].map((el) => (
                  <InputGroup className="mb-3 align-items-baseline" key={el}>
                    <Form.Label>
                      {el === "startDate"
                        ? "Start Date & Time *"
                        : "End Date & time *"}
                    </Form.Label>
                    <Form.Control
                      className={`ms-2 ${errors[el] ? "is-invalid" : ""}`}
                      type="datetime-local"
                      value={formData[el]}
                      name={el}
                      onChange={handleChange}
                      disabled={
                        el === "endDate" && formData.allDay ? true : false
                      }
                      min={el === "startDate" ? now : formData.startDate}
                    />
                    {errors[el] && (
                      <div className="invalid-feedback">{errors[el]}</div>
                    )}
                  </InputGroup>
                ))}
                <InputGroup className="mb-3 align-items-baseline">
                  <Form.Check
                    className="ms-2"
                    type="checkbox"
                    label="All Day Booking"
                    name="allDay"
                    checked={formData.allDay}
                    onChange={handleChange}
                  />
                </InputGroup>
                <InputGroup className="">
                  <Button variant="primary" type="submit" className="w-50">
                    Book Room
                  </Button>
                  <Button onClick={handleSaveForLater} variant="warning" type="button" className="w-50">
                    Save for later
                  </Button>
                </InputGroup>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <h3 className="mt-4 text-center">Bookings</h3>
      <Table striped bordered hover className="mt-3">
        <thead className="bg-primary text-white">
          <tr>
            <th>Subject</th>
            <th>Room Number</th>
            <th>Start Date & Time</th>
            <th>End Date & Time</th>
            <th>All Day</th>
          </tr>
        </thead>
        <tbody>
          {formattedBookings.map((booking, index) => (
            <tr key={index}>
              <td>{booking.subject}</td>
              <td>{booking.room}</td>
              <td>{booking?.startDate?.toString()}</td>
              <td>{booking?.endDate?.toString()}</td>
              <td>{booking.allDay ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Reservation;
