export const GET_DECKS = 'GET_DECKS';
export const ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK';
export const ADD_DECK = 'ADD_DECK';

export function fetchDecks(decks) {
  return {
    type: GET_DECKS,
    decks,
  };
}

export function addDeck(title) {
  return {
    type: ADD_DECK,
    title,
  };
}

export function addCard(title, card) {
  return {
    type: ADD_CARD_TO_DECK,
    title,
    card,
  };
}
