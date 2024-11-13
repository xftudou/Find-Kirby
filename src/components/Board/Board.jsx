import React, { useContext, useState, useEffect } from 'react';
import GameContext from '../../GameContext';
import './Board.css';
import Square from '../Square/Square';

const Board = () => {
    const { board,
        handleSquareClick,
        handleSquareRightClick,
        difficulty,
        gameSettings } = useContext(GameContext);


    const [isViewportLargeEnough, setIsViewportLargeEnough] = useState(true);

    useEffect(() => {
        const checkScreenSize = () => {
            const settings = gameSettings[difficulty];
            const minWidth = settings.cols * 30 + 50;
            setIsViewportLargeEnough(window.innerWidth >= minWidth);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, [difficulty, gameSettings]);

    if (!isViewportLargeEnough) {
        return <div className="warning"><strong>Please use a larger window size to play this game.</strong></div >;
    }


    if (!board || board.length === 0 || !board[0]) {
        return <div className="board">Loading...</div>;
    }

    const rows = board.length;
    const cols = board[0].length;

    return (
        <div
            className="board"
            style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${cols}, 30px)`,
                gridTemplateRows: `repeat(${rows}, 30px)`,
            }}
        >
            {board.map((row, rowIndex) =>
                row.map((square, colIndex) => (
                    <Square
                        key={`${rowIndex}-${colIndex}`}
                        square={square}
                        onClick={() => handleSquareClick(rowIndex, colIndex)}
                        onRightClick={() => handleSquareRightClick(rowIndex, colIndex)}
                    />
                ))
            )}
        </div>
    );
};

export default Board;