import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';
import '../../App.css';

const AppNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={NavLink} to="/home">mech-warehouse</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto yellow-links">
            <Nav.Link as={NavLink} to="/home">Home</Nav.Link>
            <NavDropdown title="Inventory" id="basic-nav-dropdown">
              <NavDropdown.Item as={NavLink} to="/parts">Parts</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/tools">Tools</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/equipment">Equipment</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Orders" id="basic-nav-dropdown">
              <NavDropdown.Item as={NavLink} to="/orders">Orders</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/new-order">New order</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={NavLink} to="/raports">Raports</Nav.Link>
          </Nav>
          <Nav className="ms-auto yellow-links">
            <Nav.Link as={NavLink} to="/employees">Employees</Nav.Link>
            <NavDropdown title="Account" id="basic-nav-dropdown">
              <NavDropdown.Item as={NavLink} to="/account">My account</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/">Log out</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;