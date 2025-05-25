import React, { useState } from "react";
import {
  Button,
  Row,
  Col,
  Form,
  InputGroup,
  FloatingLabel,
} from "react-bootstrap";

const ReservationForm = (props) => {
  const {
    onSubmit,
    initialData,
    fields,
    formData,
    onChange,
    advancedSearch,
    handleToggle,
  } = props;

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    onChange(name, value, type, checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    fields.forEach(({ name, required, type, label }) => {
      // console.log(formData);
      if (required && !formData[name]) {
        newErrors[name] = `${label} is required`;
      }
      if (required && type === "select") {
        if (formData[name] === `Select a ${label}`) {
          newErrors[name] = `Please select a proper ${label}`;
        }
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    onSubmit(formData);
    onChange(initialData);
    // setFormData(initialData);
    setErrors({});
  };

  const quickSearchFields = fields.filter(({ name }) =>
    [
      "country",
      "location",
      "locationCategory",
      "date",
      "fromTime",
      "toTime",
      "attendees",
      "layout",
    ].includes(name)
  );
  const advancedSearchFields = fields.filter(({ name }) =>
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
    ].includes(name)
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="g-3">
        {(advancedSearch ? advancedSearchFields : quickSearchFields)
          .filter((el) => el["type"] !== "checkbox")
          .map(({ name, label, type, required, options, min }) => {
            return (
              <Col xs={12} sm={6} md={4} key={name}>
                <InputGroup className="align-items-baseline">
                  {options ? (
                    <FloatingLabel
                      controlId="floatingSelect"
                      label={`${label}${required ? "*" : ""}`}
                    >
                      <Form.Select
                        className={errors[name] ? "is-invalid" : ""}
                        name={name}
                        value={formData?.[name]}
                        onChange={handleChange}
                        multiple={false}
                      >
                        {options?.map((opt) => {
                          return (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          );
                        })}
                      </Form.Select>
                    </FloatingLabel>
                  ) : (
                    <FloatingLabel
                      controlId="floatingInput"
                      label={`${label}${required ? "*" : ""}`}
                    >
                      <Form.Control
                        className={errors[name] ? "is-invalid" : ""}
                        type={type}
                        name={name}
                        placeholder={`Enter ${label}`}
                        value={formData[name]}
                        onChange={handleChange}
                        min={
                          type === "date" ||
                          type === "number" ||
                          type === "dateTime-local"
                            ? min
                            : null
                        }
                      />
                    </FloatingLabel>
                  )}
                  {errors[name] && (
                    <div className="invalid-feedback mx-5 px-5">
                      {errors[name]}
                    </div>
                  )}
                </InputGroup>
              </Col>
            );
          })}
      </Row>
      <Row className="g-3">
        {(advancedSearch ? advancedSearchFields : quickSearchFields)
          .filter((el) => el["type"] === "checkbox")
          .map(({ name, label }) => (
            <Col xs={12} key={name}>
              <Form.Check
                className="mt-3"
                type="checkbox"
                label={label}
                name={name}
                checked={formData[name]}
                onChange={handleChange}
              />
            </Col>
          ))}
      </Row>
      <Row className="mt-3">
        <Col xs={12} className="text-end">
          <a
            // onClick={handleToggleSearchMode}
            onClick={() => handleToggle()}
            className="text-primary"
            style={{ cursor: "pointer", fontSize: "14px" }}
          >
            {advancedSearch ? "Back to Quick Search" : "Advanced Search"}
          </a>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col xs={12} className="d-flex justify-content-around">
          <Button variant="primary" type="submit" className="w-10">
            Search Rooms
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default ReservationForm;
