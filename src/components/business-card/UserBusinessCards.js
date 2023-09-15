import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { BusinessCardsContext } from "../../contexts/BusinessCardsContext";
import { deleteItem, postItem, updateItem } from "../../services/api";
import { Container, Row, Col, Button, Modal, Spinner } from "react-bootstrap";
import BusinessCardForm from "./BusinessCardForm";
import BusinessCard from "./BusinessCard";
import { BusinessCardsCategory } from "../../constants/constants";
import { ThemeContext } from "../../contexts/ThemeContext";
import SearchFilterForm from "./SearchFilterForm";

const UserBusinessCards = () => {
  const { theme } = useContext(ThemeContext);
  const { token, user } = useContext(AuthContext);
  const { cards, addCard, updateCard, deleteCard, loading } =
    useContext(BusinessCardsContext);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [editCard, setEditCard] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userCards, setUserCards] = useState(cards);

  useEffect(() => {
    if (user && cards) {
      setUserCards(cards.filter((card) => card.Data.createdBy === user.Email));
    } else {
      setUserCards([]);
    }
  }, [user, cards]);

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
    setIsLoading(true);
    if (cardToDelete) {
      try {
        await deleteItem(token, BusinessCardsCategory, cardToDelete.ItemID);
        deleteCard(cardToDelete.ItemID);
        setShowDeleteModal(false);
        setCardToDelete(null);
      } catch (error) {
        console.error("Error deleting card:", error);
      }
    }
    setIsLoading(false);
  };

  const handleSave = async (cardData) => {
    setIsLoading(true);
    try {
      if (editCard) {
        const updatedData = {
          ...editCard,
          Data: cardData,
        };
        const response = await updateItem(
          token,
          BusinessCardsCategory,
          editCard.ItemID,
          updatedData
        );
        updateCard(response);
      } else {
        const cardDataWithUser = {
          ...cardData,
          createdBy: user ? user.email : null,
        };

        const response = await postItem(token, BusinessCardsCategory, {
          Scope: "Public",
          Data: cardDataWithUser,
        });
        addCard(response);
      }
      setShowAddModal(false);
    } catch (error) {
      console.error("Error saving card:", error);
    }
    setIsLoading(false);
  };

  const textColorClass = theme === "dark" ? "text-light" : "text-dark";
  const bgClass = theme === "dark" ? "bg-dark" : "bg-light";
  const modalTextColorClass = theme === "dark" ? "text-light" : "text-dark";
  const modalBgClass = theme === "dark" ? "bg-dark" : "bg-light";

  if (loading) {
    return (
      <Container className="d-flex justify-content-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container className={`${textColorClass} ${bgClass}`}>
      <SearchFilterForm />
      <Row className="mb-4">
        {userCards.length ? (
          userCards.map((card) => (
            <Col md={4} key={card.ItemID} className="mb-4">
              <BusinessCard
                card={card}
                onDelete={openDeleteModal}
                onEdit={openEditModal}
                editable={true}
              />
            </Col>
          ))
        ) : (
          <Col className="text-center">
            <p>You haven't created any business cards yet.</p>
          </Col>
        )}
      </Row>
      <div className="d-flex justify-content-center mb-4">
        <Button variant="success" onClick={openAddModal} disabled={isLoading}>
          {isLoading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />{" "}
              Processing...
            </>
          ) : (
            "Add New Card"
          )}
        </Button>
      </div>

      {/* Add/Edit Card Modal */}
      <Modal
        show={showAddModal}
        onHide={closeAddModal}
        dialogClassName={modalBgClass}
      >
        <Modal.Header closeButton className={modalBgClass}>
          <Modal.Title className={modalTextColorClass}>
            {editCard ? "Edit Card" : "Add New Card"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={`${modalTextColorClass} ${modalBgClass}`}>
          <BusinessCardForm
            initialData={editCard?.Data}
            onSave={handleSave}
            onCancel={closeAddModal}
          />
        </Modal.Body>
      </Modal>

      {/* Delete Card Modal */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        dialogClassName={modalBgClass}
      >
        <Modal.Header closeButton className={modalBgClass}>
          <Modal.Title className={modalTextColorClass}>
            Confirm Deletion
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={`${modalTextColorClass} ${modalBgClass}`}>
          Are you sure you want to delete the card for{" "}
          <strong>{cardToDelete?.Data.name}</strong>?
        </Modal.Body>
        <Modal.Footer className={modalBgClass}>
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
