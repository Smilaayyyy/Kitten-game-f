import axios from 'axios';

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';

export const registerUser = (username) => async dispatch => {
    try {
      const response = await fetch('http://localhost:8080/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });
  
      if (!response.ok) {
        const errorText = await response.text(); // Get error text from response
        throw new Error(errorText || 'Registration failed');
      }
  
      const data = await response.json();
      dispatch({ type: REGISTER_SUCCESS, payload: { username } }); // Ensure payload has the username
    } catch (error) {
      console.error('Error registering user:', error);
      dispatch({ type: REGISTER_FAIL, payload: error.message });
    }
};
