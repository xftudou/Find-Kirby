import React, { useContext, useEffect } from 'react';
import './Game.css';
import { useParams } from 'react-router-dom';
import Board from '../Board/Board';
import Status from '../Status/Status';
import GameContext from '../../GameContext';

const Game = () => {
    const {
        difficulty,
        setDifficulty,
        board,
        gameStatus,
        handleSquareClick,
        handleSquareRightClick,
        totalMines,
        flaggedCount,
        resetGame,
    } = useContext(GameContext);

    const { difficulty: routeDifficulty } = useParams();

    useEffect(() => {
        if (
            routeDifficulty &&
            ['easy', 'medium', 'hard'].includes(routeDifficulty) &&
            routeDifficulty !== difficulty
        ) {
            setDifficulty(routeDifficulty);
        }
    }, [routeDifficulty]);


    return (
        <div className="game">
            <Status
                totalMines={totalMines}
                flaggedCount={flaggedCount}
                resetGame={resetGame}
            />
            <Board
                board={board}
                onSquareClick={handleSquareClick}
                onSquareRightClick={handleSquareRightClick}
            />
            {gameStatus === 'won' && (
                <div className="message">
                    🎉 Game Over! <br /> You caught all the Kirbies.
                </div>
            )}
            {gameStatus === 'lost' && (
                <div className="message">
                    💥 Game Over! <br /> Kirbies escaped.
                </div>
            )}
        </div>
    );
};

export default Game;