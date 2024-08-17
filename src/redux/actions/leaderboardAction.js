import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Create a slice for leaderboard and user management
const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState: {
    users: [],
    username: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setLeaderboard: (state, action) => {
      state.users = action.payload;
    },
    updateUserScore: (state, action) => {
      const { username } = action.payload;
      const user = state.users.find(user => user.username === username);
      if (user) user.score += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaderboard.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLeaderboard.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchLeaderboard.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setUsername, setLeaderboard, updateUserScore } = leaderboardSlice.actions;

export const fetchLeaderboard = () => async dispatch => {
  const response = await axios.get('http://localhost:8080/api/leaderboard');
  dispatch(setLeaderboard(response.data));
};

export const recordWin = (username) => async dispatch => {
  await axios.post(`http://localhost:8080/api/win/${username}`);
  dispatch(updateUserScore({ username }));
};

export default leaderboardSlice.reducer;
