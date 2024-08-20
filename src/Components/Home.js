import React from 'react';
import { Link } from 'react-router-dom';
import '../Home.css'; // Import custom CSS file

const Home = () => {
    return (
        <div className="home-page">
            <h1 className="home-title">Exploring Kitten Game</h1>
            <p className="home-description">
                Join us on an adventurous journey with playful kittens! Navigate through the game and see how far you can go.
            </p>
            <Link to="/Gameboard">
                <button className="btn start-game-btn">Start the Adventure</button>
            </Link>
        </div>
    );
};

export default Home;
