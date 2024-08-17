import axios from 'axios';

// Action Types
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';


// Action Creators
export const login = (username, password) => async dispatch => {
  try {
    const response = await axios.post('http://localhost:8080/api/login', { username, password });
    dispatch({ type: LOGIN_SUCCESS, payload: response.data });
  } catch (error) {
    console.error(error);
    dispatch({ type: LOGIN_FAILURE, payload: error.message });
  }
};


