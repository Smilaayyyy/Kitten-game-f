import axios from 'axios';

// Action Types
export const START_GAME_SUCCESS = 'START_GAME_SUCCESS';
export const START_GAME_FAIL = 'START_GAME_FAIL';
export const DRAW_CARD_SUCCESS = 'DRAW_CARD_SUCCESS';
export const DRAW_CARD_FAIL = 'DRAW_CARD_FAIL';
export const GAME_OVER = 'GAME_OVER';

// Action to start the game
export const startGame = () => async (dispatch) => {
  try {
    // Initialize the deck with specified cards and shuffle
    const initialDeck = ['😼', '🙅‍♂️', '🔀', '💣', '😼'];
    const shuffledDeck = initialDeck.sort(() => Math.random() - 0.5);

    // Optionally, send this to the backend to persist the game state
    //const { data } = await axios.post('http://localhost:8080/api/start-game', { deck: shuffledDeck });

    dispatch({ type: START_GAME_SUCCESS, payload: { deck: shuffledDeck, defuseCount: 0, points: 0 } });
  } catch (error) {
    dispatch({ type: START_GAME_FAIL, payload: error.message });
  }
};

// Action to draw a card
export const drawCard = () => async (dispatch, getState) => {
  try {
    const { deck, points, defuseCount } = getState().game;

    if (deck.length === 0) {
      dispatch({ type: GAME_OVER, payload: { message: 'No more cards. Game over!', points } });
      return;
    }

    const drawnCard = deck[0];
    const newDeck = deck.slice(1);
    let newPoints = points;
    let newDefuseCount = defuseCount;

    // Handle special cards
    switch (drawnCard) {
      case '🙅‍♂️': // Defuse card
        newDefuseCount += 1;
        break;
      case '💣': // Exploding kitten
        if (newDefuseCount > 0) {
          newDefuseCount -= 1; // Use one defuse card
          // Optionally, shuffle the bomb back into the deck or discard it
        } else {
          dispatch({ type: GAME_OVER, payload: { message: 'You drew an Exploding Kitten! Game over!', points: newPoints } });
          return;
        }
        break;
      case '🔀': // Shuffle card
        newDeck.sort(() => Math.random() - 0.5);
        break;
      default:
        newPoints += 1;
    }

    dispatch({
      type: DRAW_CARD_SUCCESS,
      payload: { deck: newDeck, drawnCard, defuseCount: newDefuseCount, points: newPoints },
    });

    if (newDeck.length === 0) {
      dispatch({ type: GAME_OVER, payload: { message: 'You have drawn all cards. You win!', points: newPoints } });
    }
  } catch (error) {
    dispatch({ type: DRAW_CARD_FAIL, payload: error.message });
  }
};
