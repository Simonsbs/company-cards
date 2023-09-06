import React, { useContext } from "react";
import { BusinessCardsContext } from "../../contexts/BusinessCardsContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Container, Row, Col } from "react-bootstrap";
import BusinessCard from "./BusinessCard";

const BusinessCardList = () => {
  const { cards } = useContext(BusinessCardsContext);
  const { theme } = useContext(ThemeContext);

  // Determine the theme class based on the current theme state
  const themeClass =
    theme === "dark" ? "bg-dark text-white" : "bg-light text-dark";

  return (
    <Container className={`mt-4 ${themeClass}`}>
      <Row>
        {cards.map((card) => (
          <Col md={4} key={card.ItemID} className="mb-4">
            <BusinessCard card={card} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default BusinessCardList;
