import React, { useState, useContext } from "react";
import { BusinessCardsContext } from "../../contexts/BusinessCardsContext";
import {
  InputGroup,
  FormControl,
  Button,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { XCircle, ArrowRepeat, Search } from "react-bootstrap-icons";

const SearchFilterForm = () => {
  const { setFilterValue, resetFilter, reloadCards } =
    useContext(BusinessCardsContext);
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    setFilterValue(e.target.value);
  };

  const handleResetFilter = () => {
    setSearchValue("");
    resetFilter();
  };

  return (
    <div className="search-filter-form">
      <InputGroup className="mb-3">
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
    </div>
  );
};

export default SearchFilterForm;
