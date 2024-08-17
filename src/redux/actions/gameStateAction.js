import axios from 'axios';

// Action Types
export const RECORD_WIN_REQUEST = 'RECORD_WIN_REQUEST';
export const RECORD_WIN_SUCCESS = 'RECORD_WIN_SUCCESS';
export const RECORD_WIN_FAILURE = 'RECORD_WIN_FAILURE';

export const FETCH_LEADERBOARD_REQUEST = 'FETCH_LEADERBOARD_REQUEST';
export const FETCH_LEADERBOARD_SUCCESS = 'FETCH_LEADERBOARD_SUCCESS';
export const FETCH_LEADERBOARD_FAILURE = 'FETCH_LEADERBOARD_FAILURE';

export const SAVE_GAME_STATE_REQUEST = 'SAVE_GAME_STATE_REQUEST';
export const SAVE_GAME_STATE_SUCCESS = 'SAVE_GAME_STATE_SUCCESS';
export const SAVE_GAME_STATE_FAILURE = 'SAVE_GAME_STATE_FAILURE';

// Action Creators
const recordWinRequest = () => ({ type: RECORD_WIN_REQUEST });
const recordWinSuccess = (data) => ({ type: RECORD_WIN_SUCCESS, payload: data });
const recordWinFailure = (error) => ({ type: RECORD_WIN_FAILURE, payload: error });

const fetchLeaderboardRequest = () => ({ type: FETCH_LEADERBOARD_REQUEST });
const fetchLeaderboardSuccess = (data) => ({ type: FETCH_LEADERBOARD_SUCCESS, payload: data });
const fetchLeaderboardFailure = (error) => ({ type: FETCH_LEADERBOARD_FAILURE, payload: error });

const saveGameStateRequest = () => ({ type: SAVE_GAME_STATE_REQUEST });
const saveGameStateSuccess = (data) => ({ type: SAVE_GAME_STATE_SUCCESS, payload: data });
const saveGameStateFailure = (error) => ({ type: SAVE_GAME_STATE_FAILURE, payload: error });

// Thunk Actions
export const recordWin = (username, points) => {
  return async (dispatch) => {
      dispatch({ type: RECORD_WIN_REQUEST });
      try {
          console.log("Recording win with:", { username, points }); // Add this log
          const response = await axios.post('https://kitten-game-backend-zaia.onrender.com/record-win', { username, points });
          dispatch({ type: RECORD_WIN_SUCCESS, payload: response.data });
          console.log('Win recorded successfully:', response.data);
      } catch (error) {
          dispatch({ type: RECORD_WIN_FAILURE, payload: error.response ? error.response.data : error.message });
          console.error('Error recording win:', error.response ? error.response.data : error.message);
      }
  };
};

export const fetchLeaderboard = () => async (dispatch) => {
  dispatch(fetchLeaderboardRequest());
  try {
    const response = await axios.get('https://kitten-game-backend-zaia.onrender.com/leaderboard');
    
    dispatch(fetchLeaderboardSuccess(response.data));
  } catch (error) {
    dispatch(fetchLeaderboardFailure(error.message));
  }
};

export const saveGameState = (gameState) => async (dispatch) => {
  dispatch(saveGameStateRequest());
  try {
    await axios.post('https://kitten-game-backend-zaia.onrender.com/api/save-game', gameState);
    dispatch(saveGameStateSuccess(gameState));
  } catch (error) {
    dispatch(saveGameStateFailure(error.message));
  }
};
