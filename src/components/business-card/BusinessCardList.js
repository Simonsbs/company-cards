import React, { useContext } from "react";
import { BusinessCardsContext } from "../../contexts/BusinessCardsContext";
import { Container, Row, Col } from "react-bootstrap";
import BusinessCard from "./BusinessCard";

const BusinessCardList = () => {
  const { cards } = useContext(BusinessCardsContext);

  return (
    <Container className="mt-4">
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
