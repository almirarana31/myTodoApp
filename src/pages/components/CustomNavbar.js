import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import "../../styles/NavbarStyles.css";

const CustomNavbar = () => {
  const navigate = useNavigate();
  return (
    <Navbar collapseOnSelect expand="lg" className="custom-navbar">
      <Container className='nav-container'>
        <Navbar.Brand href="/home">
          <img src={logo} alt="Logo" className="navbar-logo"/>
          Ally's To-do App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
          <Nav.Link onClick={() => navigate("/home")}>Home</Nav.Link>
            <Nav.Link onClick={() => navigate("/profile")}>Profile</Nav.Link>
            <Nav.Link onClick={() => navigate("/")}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;