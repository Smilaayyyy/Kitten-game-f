import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startGame, drawCard } from '../redux/actions/gameAction';
import { registerUser } from '../redux/actions/RegisterAction';
import Card from './Card';
import { recordWin, fetchLeaderboard, saveGameState } from '../redux/actions/gameStateAction';
import '../Gameboard.css' ;
const GameBoard = () => {
    const dispatch = useDispatch();
    const { deck, drawnCard, points, defuseCount, gameOver, message} = useSelector(state => state.game);
    const { leaderboard, loading, error } = useSelector(state => state.gameState);
    const { username } = useSelector(state => state.register);
    const [inputUsername, setInputUsername] = useState('');
    const [registered, setRegistered] = useState(false);

    // State to hold leaderboard updates from WebSocket
    const [wsLeaderboard, setWsLeaderboard] = useState({});

    // Save game state whenever there's a change in relevant fields
    useEffect(() => {
        if ((deck.length > 0 || gameOver) && username) {
            dispatch(saveGameState({ deck, drawnCard, points, defuseCount, gameOver, username }));
        }
    }, [deck, drawnCard, points, defuseCount, gameOver, username, dispatch]);

    // WebSocket connection setup for real-time leaderboard updates
    useEffect(() => {
        const ws = new WebSocket('ws://https://kitten-game-backend-zaia.onrender.com/ws/leaderboard');

        ws.onmessage = (event) => {
            const updatedLeaderboard = JSON.parse(event.data);
            setWsLeaderboard(updatedLeaderboard);
        };

        ws.onerror = (error) => {
            console.error('WebSocket Error:', error);
        };

        // Cleanup WebSocket connection when the component unmounts
        return () => {
            ws.close();
        };
    }, []);

    // Fallback to fetching leaderboard via HTTP
    useEffect(() => {
        dispatch(fetchLeaderboard());
    }, [dispatch]);

    // Automatically record a win if the game is over, the deck is empty, and the user has points
    useEffect(() => {
      console.log("Game Over:", gameOver);
      console.log("Deck Length:", deck.length);
      console.log("Points:", points);
      console.log("Username:", username);  
  
      if (gameOver && deck.length === 0 && points === 2 && username ) {
          console.log("Conditions met. Dispatching recordWin.");
          dispatch(recordWin(username, points));
      } else {
          console.log("Conditions not met for recording win.");
      }
  }, [gameOver, deck.length, points, username, dispatch]);
  

    const handleStartGame = () => {
        dispatch(startGame());
    };

    const handleDrawCard = () => {
        dispatch(drawCard());
    };

    const handleRegister = () => {
        if (inputUsername.trim()) {
            dispatch(registerUser(inputUsername));
            setRegistered(true);
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px', position: 'relative' }}>
            <h1>Card Game</h1>
            {!registered && (
                <div>
                    <input
                        type="text"
                        value={inputUsername}
                        onChange={(e) => setInputUsername(e.target.value)}
                        placeholder="Enter your username"
                        style={{ padding: '10px', fontSize: '16px' }}
                    />
                    <button onClick={handleRegister} style={{ padding: '10px 20px', fontSize: '16px', marginLeft: '10px' }}>
                        Register
                    </button>
                </div>
            )}

            {registered && !deck.length && !gameOver && (
                <button onClick={handleStartGame} style={{ padding: '10px 20px', fontSize: '16px' }}>
                    Start Game
                </button>
            )}

            {deck.length > 0 && !gameOver && (
                <div>
                    <p>Cards Remaining: {deck.length}</p>
                    <p>Defuse Cards: {defuseCount}</p>
                    <button onClick={handleDrawCard} style={{ padding: '10px 20px', fontSize: '16px' }}>
                        Draw Card
                    </button>
                    {drawnCard && (
                        <div style={{ marginTop: '20px' }}>
                            <h2>Drawn Card:</h2>
                            <Card symbol={drawnCard} />
                        </div>
                    )}
                </div>
            )}

            {gameOver && (
                <div style={{ marginTop: '20px' }}>
                    <h2>{message}</h2>
                    <p>Total Points: {points}</p>
                    <button onClick={handleStartGame} style={{ padding: '10px 20px', fontSize: '16px' }}>
                        Restart Game
                    </button>
                </div>
            )}

            {/* Leaderboard section positioned on the top-right */}
            <div style={{
                position: 'absolute',
                top: '5px',
                right: '5px',
                border: '2px solid #e0e0e0', /* Softer border color */
                padding: '5px', /* Increased padding for more spacious feel */
                backgroundColor: '#c68dc2', /* Pure white background */
                borderRadius: '12px', /* Increased border radius for a softer look */
                boxShadow: '3px 3px 8px rgba(0, 0, 0, 0.1), -3px -3px 8px rgba(255, 255, 255, 0.6)', /* Soft, subtle shadow */
                width: '200px', /* Fixed width for consistency */
                zIndex: 1000, /* Ensure it's above other elements */
                fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif', /* Modern font */
                color: '#333', /* Dark text color for contrast */
                textAlign: 'center' /* Centered text alignment */
            }}>
                <h2>Leaderboard</h2>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error: {error}</p>
                ) : (
                    <table style={{ borderCollapse: 'collapse', width: '200px' }}>
                        <thead>
                            <tr>
                                <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Username</th>
                                <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Wins</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(wsLeaderboard).length > 0 ? (
                                Object.entries(wsLeaderboard).map(([username, wins]) => (
                                    <tr key={username}>
                                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{username}</td>
                                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{wins}</td>
                                    </tr>
                                ))
                            ) : (
                                Object.entries(leaderboard).map(([username, data]) => (
                                    <tr key={username}>
                                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{username}</td>
                                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{data.wins}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default GameBoard;
