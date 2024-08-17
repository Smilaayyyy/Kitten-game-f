import {
    RECORD_WIN_REQUEST,
    RECORD_WIN_SUCCESS,
    RECORD_WIN_FAILURE,
    FETCH_LEADERBOARD_REQUEST,
    FETCH_LEADERBOARD_SUCCESS,
    FETCH_LEADERBOARD_FAILURE,
    SAVE_GAME_STATE_REQUEST,
    SAVE_GAME_STATE_SUCCESS,
    SAVE_GAME_STATE_FAILURE
} from '../actions/gameStateAction';

const initialState = {
    leaderboard: {}, // Ensure this is an object or array based on your actual data structure
    loading: false,
    error: null,
};

const gameStateReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_LEADERBOARD_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_LEADERBOARD_SUCCESS:
            return { ...state, loading: false, leaderboard: action.payload, error: null };
        case FETCH_LEADERBOARD_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default gameStateReducer;

  