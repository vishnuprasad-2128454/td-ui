import React, { useState } from "react";
import { Navbar, NavbarBrand, NavItem } from "react-bootstrap";
import Drawer from "../Drawer/Drawer";
// import { useDispatch } from "react-redux";
// import { toggleTheme } from "../../store/slices/themeSlice";
import HamburgerIcon from "../../assets/hamburger.svg";
import tdb_logo from "../../assets/td_logo.svg";

import "./Header.scss";

export default function Header() {
  const [showSidebar, setShowSidebar] = useState(false);
  // const dispatch = useDispatch();

  function handleClick() {
    setShowSidebar(true);
  }
  return (
    <>
      <Navbar
        className="px-3 d-flex align-items-baseline shadow-sm justify-content-between"
        style={{ background: "#42b129" }}
      >
        <div className="d-flex">
          <NavbarBrand
            onClick={handleClick}
            style={{ cursor: "pointer" }}
            className=""
          >
            <img
              src={HamburgerIcon}
              alt="Menu"
              width="20"
              height="20"
              draggable={false}
            />
          </NavbarBrand>
          <NavItem className="header-nav-item fs-5">
            <img
              src={tdb_logo}
              width="258px"
              height="53px"
              alt="Logo"
              draggable={false}
            />
          </NavItem>
        </div>
        {/* <NavItem className="d-none d-sm-block pt-2">
          <p
            style={{
              margin:0,
              cursor: "pointer",
              padding: "5px",
              color: '#efefef',
              border: 'solid 1px',
              borderRadius: '5px'
            }}
            onClick={() => dispatch(toggleTheme())}
          >
            Toggle
          </p>
        </NavItem> */}
      </Navbar>
      <Drawer show={showSidebar} onHide={() => setShowSidebar(false)} />
    </>
  );
}
