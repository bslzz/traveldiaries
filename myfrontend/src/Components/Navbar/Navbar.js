import React from 'react';
import { Link} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav } from "react-bootstrap";

const NavHeader = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="primary">
      <Navbar.Brand href="/">
       <img id="brand-image" alt="Website logo" src="joelogo.jpg" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="ml-auto">
          <Link className="d-inline p-2 text-white" to="/">
            Home
          </Link>
          <Link className="d-inline p-2 text-white" to="/login">
            Login
          </Link>
          <Link className="d-inline p-2 text-white" to="/register">
            Register
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavHeader;
