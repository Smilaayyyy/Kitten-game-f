import React from 'react';
import '../Cards.css'; // Import the CSS file with the styles

const Card = ({ symbol, onClick }) => {
  return (
    <div className="card-container">
      <div className="card" onClick={onClick}>
        <div className="card-symbol top">{symbol}</div>
        <div className="card-symbol bottom">{symbol}</div>
      </div>
    </div>
  );
};

export default Card;
