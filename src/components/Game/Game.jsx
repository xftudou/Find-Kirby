import React from 'react';
import './Game.css';
import { useParams } from 'react-router-dom';

const Game = () => {
    const { difficulty } = useParams();

    return (
        <div>
            <h2>Game Difficulty: {difficulty}</h2>
        </div>
    );
};

export default Game;