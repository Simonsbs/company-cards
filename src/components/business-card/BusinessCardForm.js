import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

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

const BusinessCardForm = ({ initialData = {}, onSave }) => {
  const [cardData, setCardData] = useState({
    ...defaultCardData,
    ...initialData,
  });

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
    <Form onSubmit={handleSubmit}>
      {Object.entries(defaultCardData).map(([key]) => (
        <Form.Group className="mb-3" key={key}>
          <Form.Label>{key.charAt(0).toUpperCase() + key.slice(1)}</Form.Label>
          <Form.Control
            type="text"
            name={key}
            value={cardData[key] || ""}
            onChange={handleChange}
          />
        </Form.Group>
      ))}
      <Button variant="primary" type="submit">
        Save
      </Button>
    </Form>
  );
};

export default BusinessCardForm;
