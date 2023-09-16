import React, { useState, useContext } from "react";
import { BusinessCardsContext } from "../../contexts/BusinessCardsContext";
import {
  InputGroup,
  FormControl,
  Button,
  OverlayTrigger,
  Tooltip,
  Dropdown,
  Row,
  Col,
} from "react-bootstrap";
import { XCircle, ArrowRepeat, Search, Filter } from "react-bootstrap-icons";
import { AuthContext } from "../../contexts/AuthContext";

const SearchFilterForm = () => {
  const { setFilterValue, resetFilter, reloadCards } =
    useContext(BusinessCardsContext);
  const [searchValue, setSearchValue] = useState("");
  const { favoriteFilter, setFavoriteFilter, ownerFilter, setOwnerFilter } =
    useContext(BusinessCardsContext);
  const { user } = useContext(AuthContext);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    setFilterValue(e.target.value);
  };

  const handleResetFilter = () => {
    setSearchValue("");
    resetFilter();
  };

  return (
    <div className="search-filter-form mb-3">
      <Row>
        <Col xs={12} md={6} className="mb-3 mb-md-0">
          <InputGroup className="w-100">
            <InputGroup.Text>
              <Search />
            </InputGroup.Text>
            <FormControl
              type="text"
              placeholder="Search cards..."
              value={searchValue}
              onChange={handleSearchChange}
            />
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id="tooltip-clear">Clear search</Tooltip>}
            >
              <Button variant="outline-secondary" onClick={handleResetFilter}>
                <XCircle />
              </Button>
            </OverlayTrigger>
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id="tooltip-reload">Reload cards</Tooltip>}
            >
              <Button variant="outline-secondary" onClick={reloadCards}>
                <ArrowRepeat />
              </Button>
            </OverlayTrigger>
          </InputGroup>
        </Col>

        <Col xs={12} md={3} className="mb-3 mb-md-0">
          <Dropdown className="w-100">
            <Dropdown.Toggle variant="outline-secondary" className="w-100">
              <Filter className="me-1" />
              Favorites: {favoriteFilter}
            </Dropdown.Toggle>
            <Dropdown.Menu className="w-100">
              <Dropdown.Item
                eventKey="all"
                onSelect={() => setFavoriteFilter("all")}
              >
                All
              </Dropdown.Item>
              <Dropdown.Item
                eventKey="selected"
                onSelect={() => setFavoriteFilter("selected")}
              >
                Selected
              </Dropdown.Item>
              <Dropdown.Item
                eventKey="unselected"
                onSelect={() => setFavoriteFilter("unselected")}
              >
                Unselected
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>

        {user && (
          <Col xs={12} md={3}>
            <Dropdown className="w-100">
              <Dropdown.Toggle variant="outline-secondary" className="w-100">
                <Filter className="me-1" />
                Cards: {ownerFilter}
              </Dropdown.Toggle>
              <Dropdown.Menu className="w-100">
                <Dropdown.Item
                  eventKey="all"
                  onSelect={() => setOwnerFilter("all")}
                >
                  All
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="mine"
                  onSelect={() => setOwnerFilter("mine")}
                >
                  Only Mine
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="others"
                  onSelect={() => setOwnerFilter("others")}
                >
                  Only Others
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default SearchFilterForm;
