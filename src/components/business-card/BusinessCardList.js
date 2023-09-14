import { useContext } from "react";
import { BusinessCardsContext } from "../../contexts/BusinessCardsContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Container, Row, Col } from "react-bootstrap";
import BusinessCard from "./BusinessCard";
import { Spinner } from "react-bootstrap";
import SearchFilterForm from "./SearchFilterForm";

const BusinessCardList = () => {
  const { cards, loading } = useContext(BusinessCardsContext);
  const { theme } = useContext(ThemeContext);

  const themeClass =
    theme === "dark" ? "bg-dark text-white" : "bg-light text-dark";

  if (loading) {
    return (
      <Container className="d-flex justify-content-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container className={`mt-4 ${themeClass}`}>
      <SearchFilterForm />
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
