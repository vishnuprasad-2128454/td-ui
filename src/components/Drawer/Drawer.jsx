import React from "react";
import { useNavigate } from "react-router-dom";
import { Offcanvas, Nav } from "react-bootstrap";

export default function Drawer({ show, onHide }) {
  const navigate = useNavigate();

  function handleNavClick(path) {
    navigate(path);
    onHide();
  }
  return (
    <>
      <Offcanvas
        style={{ width: "250px" }}
        show={show}
        onHide={onHide}
        backdrop={true}
      >
        <Offcanvas.Header closeButton />
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link
              style={{ color: "#008a00" }}
              onClick={() => handleNavClick("/")}
            >
              Home
            </Nav.Link>
            <Nav.Link
              style={{ color: "#008a00" }}
              onClick={() => handleNavClick("/reservations")}
            >
              Search Conference Room
            </Nav.Link>
            <Nav.Link
              style={{ color: "#008a00" }}
              onClick={() => handleNavClick("reservations/create-reservation")}
            >
              Create Reservation
            </Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
