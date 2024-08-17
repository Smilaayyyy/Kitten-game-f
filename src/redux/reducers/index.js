import { combineReducers } from 'redux';
import authReducer from './authReducer';
import { gameReducer } from './gameReducer';
import  leaderboardReducer  from './leaderboardReducer';
import registerReducer from './registerReducer'; 
import  gameStateReducer  from './gameStateReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  leaderboard: leaderboardReducer,
  gameState : gameStateReducer,
  register: registerReducer,
  game: gameReducer
});

export default rootReducer;
