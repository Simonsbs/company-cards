import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { deleteItem, getItems, postItem, updateItem } from "../../services/api";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import BusinessCardForm from "./BusinessCardForm";
import "./UserBusinessCards.css";
import BusinessCard from "./BusinessCard";

const UserBusinessCards = () => {
  const { token } = useContext(AuthContext);
  const itemCategory = "BusinessCards";
  const [cards, setCards] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [editCard, setEditCard] = useState(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await getItems(token, itemCategory);
        setCards(response);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };
    fetchCards();
  }, [token]);

  const openAddModal = () => {
    setEditCard(null);
    setShowAddModal(true);
  };

  const openEditModal = (card) => {
    setEditCard(card);
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
  };

  const openDeleteModal = (card) => {
    setCardToDelete(card);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (cardToDelete) {
      try {
        await deleteItem(token, itemCategory, cardToDelete);
        setCards(cards.filter((card) => card.ItemID !== cardToDelete));
        setShowDeleteModal(false);
        setCardToDelete(null);
      } catch (error) {
        console.error("Error deleting card:", error);
      }
    }
  };

  const handleSave = async (cardData) => {
    try {
      if (editCard) {
        // Update existing card in the API and in the state
        const updatedData = {
          ...editCard,
          Data: cardData,
        };
        const response = await updateItem(
          token,
          itemCategory,
          editCard.ItemID,
          updatedData
        );
        setCards(
          cards.map((card) =>
            card.ItemID === response.ItemID ? response : card
          )
        );
      } else {
        // Add new card to the API and to the state
        const response = await postItem(token, itemCategory, {
          Scope: "Public",
          Data: cardData,
        });
        setCards([...cards, response]);
      }
      setShowAddModal(false);
    } catch (error) {
      console.error("Error saving card:", error);
    }
  };

  return (
    <Container>
      <Row>
        {cards.map((card) => (
          <Col
            md={4}
            key={card.ItemID}
            style={{ height: "400px", marginBottom: "20px" }}
          >
            <BusinessCard
              card={card}
              onDelete={openDeleteModal}
              onEdit={openEditModal}
              editable={true}
            />
          </Col>
        ))}
      </Row>

      <Button variant="success" onClick={openAddModal}>
        Add New Card
      </Button>

      {/* Add Card Modal */}
      <Modal show={showAddModal} onHide={closeAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editCard ? "Edit Card" : "Add New Card"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BusinessCardForm initialData={editCard?.Data} onSave={handleSave} />
        </Modal.Body>
      </Modal>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the card for{" "}
          <strong>{cardToDelete?.Data.name}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Confirm Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default UserBusinessCards;
