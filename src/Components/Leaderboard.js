import React, { useEffect, useState } from 'react';

// Establish the WebSocket connection
const socket = new WebSocket('http://localhost:8080/ws');

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    // Listen for messages from the server
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      if (message.type === 'updateLeaderboard') {
        setLeaderboard(message.data);
      }
    };

    // Fetch the initial leaderboard data
    socket.onopen = () => {
      socket.send(JSON.stringify({ type: 'getLeaderboard' }));
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div style={{ marginTop: '50px', textAlign: 'center' }}>
      <h1>Leaderboard</h1>
      <ul>
        {leaderboard.map((user, index) => (
          <li key={index}>{user.username}: {user.wins} wins</li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
