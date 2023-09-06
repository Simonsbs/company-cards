import React, { useState, useContext } from "react"; // Import useContext
import { Form, Button, Row, Col } from "react-bootstrap";
import { ThemeContext } from "../../contexts/ThemeContext"; // Import ThemeContext

const defaultCardData = {
  name: "",
  URL: "",
  facebook: "",
  linkedin: "",
  phone: "",
  fax: "",
  email: "",
  address: "",
};

const BusinessCardForm = ({ initialData = {}, onSave, onCancel }) => {
  const [cardData, setCardData] = useState({
    ...defaultCardData,
    ...initialData,
  });
  const { theme } = useContext(ThemeContext); // Access the theme value from the context

  const textColorClass = theme === "dark" ? "text-light" : "text-dark"; // Determine text color class based on theme
  const bgClass = theme === "dark" ? "bg-dark" : "bg-light"; // Determine background color class based on theme

  const handleChange = (e) => {
    setCardData({
      ...cardData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(cardData);
  };

  return (
    <Form onSubmit={handleSubmit} className={`${textColorClass} ${bgClass}`}>
      {" "}
      {/* Apply theme and text color classes */}
      <Row>
        {Object.entries(defaultCardData).map(([key], index) => (
          <Col md={index < 2 ? 12 : 6} key={key}>
            <Form.Group className="mb-3">
              <Form.Label>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Form.Label>
              <Form.Control
                type="text"
                name={key}
                placeholder={`Enter ${key}`}
                value={cardData[key] || ""}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        ))}
      </Row>
      <div className="d-flex justify-content-end">
        <Button variant="secondary" className="me-2" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          Save
        </Button>
      </div>
    </Form>
  );
};

export default BusinessCardForm;
