import React, { useState, useEffect } from "react";
import { getItems } from "../../services/api";
import { Container, Row, Col } from "react-bootstrap";
import BusinessCard from "./BusinessCard";

const BusinessCardList = () => {
  const [cards, setCards] = useState([]);
  const itemCategory = "BusinessCards"; // Define the category for business cards

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await getItems(null, itemCategory);
        setCards(response);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };
    fetchCards();
  }, []);

  return (
    <Container>
      <Row>
        {cards.map((card) => (
          <Col md={4} key={card.ItemID}>
            <BusinessCard card={card} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default BusinessCardList;
