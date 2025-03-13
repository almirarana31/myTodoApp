import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from "../assets/logo.png"; // Import your logo

const CustomNavbar = () => {
  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container>
        {/* Logo and Brand Name */}
        <Navbar.Brand href="#home" className="d-flex align-items-center">
          <img
            src={logo}
            alt="Logo"
            className="navbar-logo"
          />
          <span>Ally's To-do App</span>
        </Navbar.Brand>

        {/* Toggle Button for Small Screens (Hamburger Menu) */}
        <Navbar.Toggle aria-controls="navbar-nav" />

        {/* Collapsible Menu */}
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            <Nav.Link href="#profile">Profile</Nav.Link>
            <Nav.Link href="#settings">Settings</Nav.Link>
            <Nav.Link href="#logout">Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
