// src/redux/reducers/registerReducer.js

import { REGISTER_SUCCESS, REGISTER_FAIL } from '../actions/RegisterAction';

const initialState = {
  username: '',
  error: null,
};

const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        username : action.payload.username,
        error: null,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

export default registerReducer;
