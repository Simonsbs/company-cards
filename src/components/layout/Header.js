import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { BusinessCardsContext } from "../../contexts/BusinessCardsContext";
import Gravatar from "react-gravatar";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  Button,
  FormControl,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import { ThemeContext } from "../../contexts/ThemeContext";
import {
  Sun,
  Moon,
  PersonFill,
  CardList,
  BoxArrowRight,
  DoorOpen,
  PersonPlus,
  ArrowRepeat,
  XCircle,
} from "react-bootstrap-icons";

const Header = () => {
  const { token, setToken, user } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { setFilterValue, resetFilter, reloadCards } =
    useContext(BusinessCardsContext);
  const [searchValue, setSearchValue] = useState("");

  const reloadTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Reload cards
    </Tooltip>
  );

  const clearTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Clear search
    </Tooltip>
  );

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    setFilterValue(e.target.value);
  };

  const handleResetFilter = () => {
    setSearchValue("");
    resetFilter();
  };

  const handleLogout = () => {
    setToken(null);
  };
  return (
    <Navbar bg={theme} variant={theme} expand="lg" className="px-4">
      <Navbar.Brand as={Link} to="/">
        Business Cards App
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Form inline className="me-auto d-flex">
          <FormControl
            type="text"
            placeholder="Search cards..."
            value={searchValue}
            onChange={handleSearchChange}
            className="me-2"
          />
          <OverlayTrigger placement="bottom" overlay={clearTooltip}>
            <Button variant="outline-secondary" onClick={handleResetFilter}>
              <XCircle />
            </Button>
          </OverlayTrigger>
          <OverlayTrigger placement="bottom" overlay={reloadTooltip}>
            <Button
              className="ms-2"
              variant="outline-secondary"
              onClick={reloadCards}
            >
              <ArrowRepeat />
            </Button>
          </OverlayTrigger>
        </Form>

        <Nav className="ml-auto align-items-center">
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
                <PersonFill className="me-2" /> Profile
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/user-business-cards">
                <CardList className="me-2" /> My Business Cards
              </NavDropdown.Item>
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
