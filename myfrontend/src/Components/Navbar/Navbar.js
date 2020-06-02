import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

const NavHeader = (props) => {
  if (props.location.pathname === '/mymap') {
    return false;
  }

  return (
    <Navbar collapseOnSelect expand="lg">
      <Link to="/" style={{ color: 'yellow' }} className="navbar-brand logo">
        Traveldiaries
      </Link>

      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto links">
          <Link to="/" style={{ color: 'yellow' }} className="nav-link">
            Home
          </Link>

          <Link to="/login" style={{ color: 'yellow' }} className="nav-link">
            Login
          </Link>

          <Link to="/register" style={{ color: 'yellow' }} className="nav-link">
            Register
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default withRouter(NavHeader);
