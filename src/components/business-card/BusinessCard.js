import { useContext, useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import {
  Globe,
  Facebook,
  Linkedin,
  Telephone,
  Envelope,
  GeoAlt,
  HeartFill,
  Heart,
} from "react-bootstrap-icons";
import { AuthContext } from "../../contexts/AuthContext";
import { updateUser } from "../../services/api";

const BusinessCard = ({ card, onDelete, onEdit, editable = false }) => {
  const [favorite, setFavorite] = useState();
  const { user, token } = useContext(AuthContext);

  useEffect(() => {
    if (!user || !card) {
      setFavorite(false);
    } else {
      //console.log(user);
      setFavorite(user.Favorites.includes(card.ItemID));
    }
  }, [user, card]);

  const toggleFavorite = async () => {
    // Toggle the local favorite state
    const isFavorite = !favorite;
    setFavorite(isFavorite);

    if (!user.Favorites) {
      user.Favorites = [];
    }

    // Modify the user's favorites
    if (isFavorite) {
      user.Favorites.push(card.ItemID);
    } else {
      const index = user.Favorites.indexOf(card.ItemID);
      if (index > -1) {
        user.Favorites.splice(index, 1);
      }
    }

    // Update the user in the API
    try {
      //console.log(user);

      await updateUser(
        token,
        user.Email,
        null,
        user.Name,
        user.Role,
        user.Favorites
      );
    } catch (error) {
      console.error("Error updating favorite status:", error);
      setFavorite(!isFavorite);
    }
  };

  return (
    <Card className={`h-100 shadow-sm border-0 rounded position-relative`}>
      <div
        className="position-absolute top-0 end-0 mt-2 me-2"
        style={{ cursor: "pointer" }}
        onClick={toggleFavorite}
      >
        {favorite ? <HeartFill color="red" size={24} /> : <Heart size={24} />}
      </div>
      <Card.Body>
        <Card.Title className="font-weight-bold mb-3">
          {card.Data.name}
        </Card.Title>

        {card.Data.URL && (
          <Card.Text className="d-flex align-items-center mb-2">
            <Globe className="me-2" size={20} />
            <a href={card.Data.URL} target="_blank" rel="noopener noreferrer">
              Website
            </a>
          </Card.Text>
        )}
        {card.Data.facebook && (
          <Card.Text className="d-flex align-items-center mb-2">
            <Facebook className="me-2" size={20} />
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
          <Card.Text className="d-flex align-items-center mb-2">
            <Linkedin className="me-2" size={20} />
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
          <Card.Text className="d-flex align-items-center mb-2">
            <Telephone className="me-2" size={20} />
            {card.Data.phone}
          </Card.Text>
        )}
        {card.Data.fax && (
          <Card.Text className="d-flex align-items-center mb-2">
            <Telephone className="me-2" size={20} />
            Fax: {card.Data.fax}
          </Card.Text>
        )}
        {card.Data.email && (
          <Card.Text className="d-flex align-items-center mb-2">
            <Envelope className="me-2" size={20} />
            {card.Data.email}
          </Card.Text>
        )}
        {card.Data.address && (
          <Card.Text className="d-flex align-items-center">
            <GeoAlt className="me-2" size={20} />
            {card.Data.address}
          </Card.Text>
        )}
      </Card.Body>
      {editable && (
        <Card.Footer className="border-top-0 d-flex justify-content-between">
          <Button variant="outline-info" size="sm" onClick={() => onEdit(card)}>
            Edit
          </Button>
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => onDelete(card)}
          >
            Delete
          </Button>
        </Card.Footer>
      )}
    </Card>
  );
};

export default BusinessCard;
