import { GET_DECKS, ADD_CARD_TO_DECK, ADD_DECK } from '../actions/decks';

export default function decksReducer(state = {}, action) {
  switch (action.type) {
    case GET_DECKS:
      return action.decks;
    case ADD_DECK:
      return {
        ...state,
        [action.title]: {
          title: action.title,
          questions: [],
        },
      };
    case ADD_CARD_TO_DECK:
      return {
        ...state,
        [action.title]: {
          ...state[action.title],
          questions: state[action.title].questions.concat(action.card),
        },
      };
    default:
      return state;
  }
}
