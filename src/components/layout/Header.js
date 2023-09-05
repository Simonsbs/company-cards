import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { Navbar, Nav, Button } from "react-bootstrap";

const Header = () => {
  const { token, setToken } = useContext(AuthContext);

  const handleLogout = () => {
    setToken(null);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/">
        Business Cards App
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/business-cards">
            Public Business Cards
          </Nav.Link>
          {token && (
            <>
              <Nav.Link as={Link} to="/user-business-cards">
                My Business Cards
              </Nav.Link>
            </>
          )}
        </Nav>
        <Nav>
          {!token ? (
            <>
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/register">
                Register
              </Nav.Link>
            </>
          ) : (
            <Button variant="outline-info" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
