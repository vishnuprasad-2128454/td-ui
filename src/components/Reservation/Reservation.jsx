import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bookRoom } from "../../store/slices/reservationSlice";
import { fetchDataService } from "../../service";
import { Container, Row, Col, Card } from "react-bootstrap";
import moment from "moment";
import ReservationForm from "./ReservationForm";
import ModalComponent from "../Modal/Modal";

const Reservation = () => {
  const navigate = useNavigate();
  const dateTimeFormat = "YYYY-MM-DDTHH:mm";
  const dateFormat = "YYYY-MM-DD";
  const timeFormat = "hh:mm A";
  const dispatch = useDispatch();
  const { bookings } = useSelector((state) => state.reservations);

  const [timeArray, setTimeArray] = useState([]);
  const [advancedSearch, setAdvancedSearch] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  const [data, setData] = useState({
    countries: [],
    location: [],
    locationCategory: [],
  });
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
        options: ["Select a Country", ...data.countries],
      },
      {
        name: "location",
        label: "Location",
        type: "select",
        required: true,
        options: ["Select a Location", ...data.location],
      },
      {
        name: "locationCategory",
        label: "Location Category",
        type: "select",
        options: ["Select a Location Category", ...data.locationCategory],
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
        min: selectedDateTime.clone().add(1, "hour").format(dateTimeFormat),
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
    [now, selectedDateTime, timeArray, data],
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

  let initialState = useMemo(
    () =>
      (advancedSearch ? advancedSearchFields : quickSearchFields).reduce(
        (acc, { name, type }) => {
          if (type === "checkbox") acc[name] = false;
          if (!advancedSearch && type === "date")
            acc[name] = timeObj.current.format(dateFormat);
          if (!advancedSearch && type === "select" && name === "fromTime")
            acc[name] = timeObj.fromTime?.format(timeFormat);
          if (!advancedSearch && type === "select" && name === "toTime")
            acc[name] = timeObj.toTime.format(timeFormat);
          if (advancedSearch && type === "dateTime-local" && name === "from")
            acc[name] = moment().format(dateTimeFormat);
          if (advancedSearch && type === "dateTime-local" && name === "to")
            acc[name] = moment().add(1, "hour").format(dateTimeFormat);
          if (acc[name] === undefined) acc[name] = "";

          return acc;
        },
        {},
      ),
    [advancedSearch, timeObj],
  );

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    setFormData(initialState);
  }, [advancedSearch]);

  const handleChange = useCallback(
    (name, value, type, checked) => {
      if (name === "country") {
        fetchDataService("https://countriesnow.space/api/v0.1/countries/states")
          .then(
            ({ data }) =>
              data &&
              data.filter(
                (data) => data?.name?.toLowerCase() === value?.toLowerCase(),
              ),
          )
          .then((country) =>
            country?.[0]?.states.length > 0
              ? country[0].states.map(({ name }) => name)
              : [],
          )
          .then((locCat) => {
            locCat &&
              setData((prev) => ({
                ...prev,
                location:
                  locCat?.length > 0
                    ? locCat.sort((a, b) => a.localeCompare(b))
                    : [],
              }));
          })
          .catch((err) => console.log("API error ", err));
      }
      if (name === "location") {
        let dataObj = {
          country: formData["country"],
          state: value,
        };
        fetchDataService(
          "https://countriesnow.space/api/v0.1/countries/state/cities",
          null,
          "POST",
          dataObj,
        )
          .then(({ data }) => {
            data &&
              setData((prev) => ({
                ...prev,
                locationCategory:
                  data?.length > 0
                    ? data.sort((a, b) => a.localeCompare(b))
                    : [],
              }));
          })
          .catch((err) => console.log("API error", err));
      }
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
    },
    [formData],
  );

  const handleSubmit = (formData) => {
    console.log(formData);
    dispatch(
      bookRoom({
        ...formData,
      }),
    );
    if (JSON.stringify(formData) !== JSON.stringify(initialState)) {
      if (formData["date"] || formData["from"]) {
        let DateTime = formData["date"]
          ? moment(
              `${formData["date"]} ${formData["fromTime"]}`,
              dateTimeFormat,
            )
          : moment(formData["from"], dateTimeFormat);

        DateTime.diff(moment(), "hour") > 72
          ? setModalShow(true)
          : navigate("/reservations/create-reservation");
      }
    }
    setSelectDateTime(now);
    setFormData(initialState);
  };

  const handleToggleSearchMode = useCallback(() => {
    setAdvancedSearch((prev) => !prev);
  }, []);

  useEffect(() => {
    fetchDataService("https://restcountries.com/v3.1/all")
      .then((data) => {
        // console.log(data);
        data &&
          setData((prev) => ({
            ...prev,
            countries: data
              ?.map(({ name }) => name.common)
              ?.sort((a, b) => a.localeCompare(b)),
          }));
      })
      .catch((err) => console.log("API error: ", err));
  }, []);

  return (
    <Container className="mt-4">
      {modalShow && (
        <ModalComponent
          show={modalShow}
          onConfirm={() => navigate("/reservations/create-reservation")}
          onHide={() => setModalShow(false)}
        />
      )}
      <Row className="justify-content-center">
        <Col>
          <Card className="shadow-lg">
            <Card.Body>
              <h2 className="text-center mb-4">Conference Room Reservation</h2>
              <ReservationForm
                onSubmit={handleSubmit}
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
