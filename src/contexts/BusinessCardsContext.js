import { createContext, useState, useContext, useEffect } from "react";
import { getItems } from "../services/api";
import { AuthContext } from "./AuthContext";
import { BusinessCardsCategory } from "../constants/constants";

export const BusinessCardsContext = createContext();

export const BusinessCardsProvider = ({ children }) => {
  const [cards, setCards] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  const filteredCards = cards.filter((card) =>
    card.Data.name.toLowerCase().includes(filterValue.toLowerCase())
  );

  const fetchCards = async () => {
    setLoading(true);
    try {
      const response = await getItems(token, BusinessCardsCategory);
      setCards(response);
    } catch (error) {
      console.error("Error fetching cards:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const resetFilter = () => {
    setFilterValue("");
  };

  const reloadCards = () => {
    fetchCards();
  };

  return (
    <BusinessCardsContext.Provider
      value={{
        cards: filteredCards,
        addCard,
        updateCard,
        deleteCard,
        token,
        setFilterValue,
        resetFilter,
        reloadCards,
        loading,
      }}
    >
      {children}
    </BusinessCardsContext.Provider>
  );
};

export default BusinessCardsProvider;
