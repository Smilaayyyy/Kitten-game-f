const initialState = {
  leaderboard: [], // Initialize as an empty array
};

const leaderboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LEADERBOARD':
      return {
        ...state,
        leaderboard: action.payload,
      };
    default:
      return state;
  }
};

export default leaderboardReducer;
