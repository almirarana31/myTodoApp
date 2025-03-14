import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png"; // Ensure the logo path is correct
import "../../styles/HomeStyles.css";

const CustomNavbar = () => {
  const navigate = useNavigate();
  return (
      <Navbar collapseOnSelect expand="lg" className="custom-navbar">
        <Container>
          <Navbar.Brand href="/home">Ally's To-do App</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={() => navigate("/profile")}>Profile</Nav.Link>
              <Nav.Link onClick={() => navigate("/settings")}>Settings</Nav.Link>
              <Nav.Link onClick={() => navigate("/")}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
};

export default CustomNavbar;
