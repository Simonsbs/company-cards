import { createContext, useState, useContext, useEffect } from "react";
import { getItems } from "../services/api";
import { AuthContext } from "./AuthContext";

export const BusinessCardsContext = createContext();

export const BusinessCardsProvider = ({ children }) => {
  const [cards, setCards] = useState([]);
  const { token } = useContext(AuthContext);
  const itemCategory = "BusinessCards";

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

  const addCard = (card) => {
    setCards((prevCards) => [...prevCards, card]);
  };

  const updateCard = (updatedCard) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.ItemID === updatedCard.ItemID ? updatedCard : card
      )
    );
  };

  const deleteCard = (cardId) => {
    setCards((prevCards) => prevCards.filter((card) => card.ItemID !== cardId));
  };

  return (
    <BusinessCardsContext.Provider
      value={{ cards, addCard, updateCard, deleteCard, token }}
    >
      {children}
    </BusinessCardsContext.Provider>
  );
};
