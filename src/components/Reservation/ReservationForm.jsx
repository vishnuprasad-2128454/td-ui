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
  // console.log(formData);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    onChange(name, value, type, checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    fields.forEach(({ name, required, type, label }) => {
      if (required && !formData[name]) {
        newErrors[name] = `${label} is required`;
      }
      if (required && type === "select") {
        if (formData[name] === `Select a ${label}`) {
          newErrors[name] = `Please select a proper ${label}`;
        }
      }
      if (type === "dateTime-local" && formData["from"] === formData["to"])
        newErrors["to"] = "To Date and Time can't be same as from time";
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

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="g-3">
        {fields
          .filter((el) => el["type"] !== "checkbox")
          .map(({ name, label, type, required, options, min }) => {
            return (
              <Col xs={12} sm={6} md={4} key={name}>
                <InputGroup className="align-items-baseline">
                  {options ? (
                    <FloatingLabel
                      controlId={`floating-${name}`}
                      label={`${label}${required ? "*" : ""}`}
                      aria-label={label}
                    >
                      <Form.Select
                        className={errors[name] ? "is-invalid" : ""}
                        aria-invalid={errors[name] ? true : false}
                        name={name}
                        value={formData?.[name] || ""}
                        onChange={handleChange}
                        multiple={false}
                      >
                        {options?.map((opt, index) => {
                          return (
                            <option key={index} value={opt || ""}>
                              {opt}
                            </option>
                          );
                        })}
                      </Form.Select>
                    </FloatingLabel>
                  ) : (
                    <FloatingLabel
                      controlId="floatingInput"
                      aria-label={label}
                      label={`${label}${required ? "*" : ""}`}
                    >
                      <Form.Control
                        className={errors[name] ? "is-invalid" : ""}
                        aria-invalid={errors[name] ? true : false}
                        type={type}
                        name={name}
                        placeholder={`Enter ${label}`}
                        value={formData[name] || ""}
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
                </InputGroup>
                {errors[name] && (
                  <span className="text-danger d-flex px-2 mx-1">
                    {errors[name]}
                  </span>
                )}
              </Col>
            );
          })}
      </Row>
      <Row className="g-3">
        {fields
          .filter((el) => el["type"] === "checkbox")
          .map(({ name, label }) => (
            <Col xs={12} key={name}>
              <Form.Check
                className="mt-3"
                type="checkbox"
                label={label}
                name={name}
                checked={formData[name] ?? false}
                onChange={handleChange}
              />
            </Col>
          ))}
      </Row>
      <Row className="mt-3">
        <Col xs={12} className="text-end">
          <a
            // onClick={handleToggleSearchMode}
            onClick={handleToggle}
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
