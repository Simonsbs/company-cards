import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import Gravatar from "react-gravatar";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

const Header = () => {
  const { token, setToken, user } = useContext(AuthContext);

  const handleLogout = () => {
    setToken(null);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="px-3">
      <Navbar.Brand as={Link} to="/">
        Business Cards App
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="align-items-center">
        <Nav className="ms-auto align-items-center">
          {token && user?.email && (
            <Gravatar
              email={user.email}
              className="mr-2 rounded-circle"
              size={30}
            />
          )}
          {token ? (
            <NavDropdown title={user?.name || "Profile"} align="end">
              <NavDropdown.Item as={Link} to="/profile">
                Profile
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/user-business-cards">
                My Business Cards
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          ) : (
            <>
              <Nav.Link as={Link} to="/login" className="mx-2">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/register" className="mx-2">
                Register
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
