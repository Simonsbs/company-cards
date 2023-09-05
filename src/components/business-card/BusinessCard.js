import React from "react";
import { Card, Button } from "react-bootstrap";
import {
  Globe,
  Facebook,
  Linkedin,
  Telephone,
  Envelope,
  GeoAlt,
} from "react-bootstrap-icons";

const BusinessCard = ({ card, onDelete, onEdit, editable = false }) => {
  return (
    <Card className="h-100 fixed-card">
      <Card.Body>
        <Card.Title>{card.Data.name}</Card.Title>
        {card.Data.URL && (
          <Card.Text>
            <Globe className="mr-2" />
            <a href={card.Data.URL} target="_blank" rel="noopener noreferrer">
              Website
            </a>
          </Card.Text>
        )}
        {card.Data.facebook && (
          <Card.Text>
            <Facebook className="mr-2" />
            <a
              href={card.Data.facebook}
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
          </Card.Text>
        )}
        {card.Data.linkedin && (
          <Card.Text>
            <Linkedin className="mr-2" />
            <a
              href={card.Data.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </Card.Text>
        )}
        {card.Data.phone && (
          <Card.Text>
            <Telephone className="mr-2" />
            {card.Data.phone}
          </Card.Text>
        )}
        {card.Data.fax && (
          <Card.Text>
            <Telephone className="mr-2" />
            Fax: {card.Data.fax}
          </Card.Text>
        )}
        {card.Data.email && (
          <Card.Text>
            <Envelope className="mr-2" />
            {card.Data.email}
          </Card.Text>
        )}
        {card.Data.address && (
          <Card.Text>
            <GeoAlt className="mr-2" />
            {card.Data.address}
          </Card.Text>
        )}
      </Card.Body>

      {editable && (
        <Card.Footer>
          <Button variant="info" className="mr-2" onClick={() => onEdit(card)}>
            Edit
          </Button>
          <Button variant="danger" onClick={() => onDelete(card)}>
            Delete
          </Button>
        </Card.Footer>
      )}
    </Card>
  );
};

export default BusinessCard;
