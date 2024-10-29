import React from 'react';
import './Game.css';
import { useParams } from 'react-router-dom';

const gameSettings = {
    easy: { rows: 8, cols: 8, mines: 10 },
    medium: { rows: 16, cols: 16, mines: 40 },
    hard: { rows: 16, cols: 30, mines: 99 },
};

const Game = () => {
    const { difficulty } = useParams();

    return (
        <div>
            <h2>Game Difficulty: {difficulty}</h2>
        </div>
    );
};

export default Game;