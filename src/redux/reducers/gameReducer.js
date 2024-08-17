const initialState = {
 
  deck: [],
  drawnCard: null,
  points: 0,
  defuseCount: 0,
  gameOver: false,
  message: '',
};

export const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'START_GAME_SUCCESS':
      return { ...state, deck: action.payload.deck, points: action.payload.points, defuseCount: action.payload.defuseCount, gameOver: false, message: '', drawnCard: null };
    case 'DRAW_CARD_SUCCESS':
      return { ...state, deck: action.payload.deck, drawnCard: action.payload.drawnCard, points: action.payload.points, defuseCount: action.payload.defuseCount };
    case 'GAME_OVER':
      return { ...state, gameOver: true, message: action.payload.message, points: action.payload.points };
    case 'START_GAME_FAIL':
    case 'DRAW_CARD_FAIL':
      return { ...state, message: action.payload };
    default:
      return state;
  }
};
