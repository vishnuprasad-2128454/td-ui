import React, { useState } from "react";
import { Wizard, useWizard } from "react-use-wizard";
import {
  Container,
  Button,
  Form,
  Row,
  Col,
  FloatingLabel,
} from "react-bootstrap";

const StepOne = ({ userData, setUserData }) => {
  const { nextStep } = useWizard();

  return (
    <Container className="text-center">
      <h6>Step 1: Enter Room Details</h6>
      <Form>
        <Row className="g-3">
          <Col xs={12} md={6}>
            <FloatingLabel controlId="floatingSelect" label="Subject">
              <Form.Control
                type="text"
                placeholder="Subject"
                value={userData.subject}
                onChange={(e) =>
                  setUserData({ ...userData, subject: e.target.value })
                }
              />
            </FloatingLabel>
          </Col>

          <Col xs={12} md={6}>
            <FloatingLabel controlId="floatingSelect" label="Country">
              <Form.Control
                type="text"
                placeholder="Country"
                value={userData.country}
                onChange={(e) =>
                  setUserData({ ...userData, country: e.target.value })
                }
              />
            </FloatingLabel>
          </Col>
        </Row>

        <Row className="g-3 mt-2">
          <Col xs={12} md={6}>
            <FloatingLabel controlId="floatingSelect" label="Location">
              <Form.Control
                type="text"
                placeholder="Location"
                value={userData.location}
                onChange={(e) =>
                  setUserData({ ...userData, location: e.target.value })
                }
              />
            </FloatingLabel>
          </Col>

          <Col xs={12} md={6}>
            <FloatingLabel controlId="floatingSelect" label="Room">
              <Form.Control
                type="text"
                placeholder="Room"
                value={userData.room}
                onChange={(e) =>
                  setUserData({ ...userData, room: e.target.value })
                }
              />
            </FloatingLabel>
          </Col>
        </Row>

        <Button className="mt-4" onClick={nextStep}>
          Next
        </Button>
      </Form>
    </Container>
  );
};

const StepTwo = ({ userData, setUserData }) => {
  const { nextStep, previousStep } = useWizard();

  return (
    <Container className="text-center">
      <h6>Step 2: Enter Your Details</h6>
      <Form>
        <Row className="g-3 mt-2">
          <Col xs={12} md={6}>
            <FloatingLabel controlId="floatingSelect" label="Name">
              <Form.Control
                type="text"
                placeholder="Name"
                value={userData.name}
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
              />
            </FloatingLabel>
          </Col>
          <Col xs={12} md={6}>
            <FloatingLabel controlId="floatingSelect" label="Email">
              <Form.Control
                type="email"
                placeholder="Email"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
              />
            </FloatingLabel>
          </Col>
        </Row>
      </Form>
      <Button className="m-2" onClick={previousStep}>
        Back
      </Button>
      <Button className="m-2" onClick={nextStep}>
        Next
      </Button>
    </Container>
  );
};

const StepThree = ({ userData }) => {
  const { previousStep } = useWizard();

  return (
    <Container className="text-center">
      <h6>Step 3: Confirm Your Reservation</h6>
      <p>
        <strong>Country:</strong> {userData.country}
      </p>
      <p>
        <strong>Location:</strong> {userData.location}
      </p>
      <p>
        <strong>Room:</strong> {userData.room}
      </p>
      <p>
        <strong>Subject:</strong> {userData.subject}
      </p>
      <p>
        <strong>Name:</strong> {userData.name}
      </p>
      <p>
        <strong>Email:</strong> {userData.email}
      </p>
      <Button className="m-2" onClick={previousStep}>
        Back
      </Button>
      <Button variant="success" onClick={() => alert("Submitted!")}>
        Submit
      </Button>
    </Container>
  );
};

const WizardComponent = () => {
  const initialState = {
    subject: "",
    country: "",
    location: "",
    room: "",
    name: "",
    email: "",
  };
  const [userData, setUserData] = useState(initialState);

  return (
    <Container className="mt-5 p-4 border rounded shadow">
      <h1 className="text-center">Conference Room Reservation</h1>
      <Wizard>
        <StepOne userData={userData} setUserData={setUserData} />
        <StepTwo userData={userData} setUserData={setUserData} />
        <StepThree userData={userData} />
      </Wizard>
    </Container>
  );
};

export default WizardComponent;
