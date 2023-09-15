import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import Gravatar from "react-gravatar";
import { Navbar, Nav, NavDropdown, Form, Button } from "react-bootstrap";
import { ThemeContext } from "../../contexts/ThemeContext";
import {
  Sun,
  Moon,
  PersonFill,
  CardList,
  BoxArrowRight,
  DoorOpen,
  PersonPlus,
  PeopleFill,
} from "react-bootstrap-icons";

const Header = () => {
  const { token, setToken, user } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [name, setName] = useState("Profile");

  const handleLogout = () => {
    setToken(null);
  };

  useEffect(() => {
    if (user) {
      setName(user.Name);
    } else {
      setName("Profile");
    }
  }, [user]);

  return (
    <Navbar bg={theme} variant={theme} expand="lg" className="px-4 mb-3">
      <Navbar.Brand as={Link} to="/">
        Business Cards App
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto align-items-center">
          <Form className="me-3">
            <Form.Check
              type="switch"
              id="theme-switch"
              label={
                theme === "dark" ? (
                  <Moon className="ms-1" />
                ) : (
                  <Sun className="ms-1" />
                )
              }
              onChange={toggleTheme}
              checked={theme === "dark"}
            />
          </Form>

          {token && user?.Email && (
            <Gravatar
              email={user?.Email}
              className="mr-2 rounded-circle"
              size={30}
            />
          )}
          {token ? (
            <NavDropdown title={name} align="end">
              <NavDropdown.Item as={Link} to="/profile">
                <PersonFill className="me-2" /> Profile
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/user-business-cards">
                <CardList className="me-2" /> My Business Cards
              </NavDropdown.Item>
              {user?.Role === "Admin" ? (
                <NavDropdown.Item as={Link} to="/users">
                  <PeopleFill className="me-2" /> User Management
                </NavDropdown.Item>
              ) : (
                <></>
              )}
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>
                <BoxArrowRight className="me-2" /> Logout
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <>
              <Button
                as={Link}
                to="/login"
                variant="outline-primary"
                className="mx-2"
              >
                <DoorOpen className="me-2" /> Login
              </Button>
              <Button
                as={Link}
                to="/register"
                variant="primary"
                className="mx-2"
              >
                <PersonPlus className="me-2" /> Register
              </Button>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
