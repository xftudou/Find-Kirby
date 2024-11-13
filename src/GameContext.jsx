import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
    const gameSettings = {
        easy: { rows: 8, cols: 8, mines: 10 },
        medium: { rows: 16, cols: 16, mines: 40 },
        hard: { rows: 16, cols: 30, mines: 99 },
    };

    const [difficulty, setDifficulty] = useState('easy');
    const [board, setBoard] = useState([]);
    const [flaggedCount, setFlaggedCount] = useState(0);
    const [gameStatus, setGameStatus] = useState('playing'); // 'playing', 'won', 'lost'
    const [firstClick, setFirstClick] = useState(true);
    const [totalMines, setTotalMines] = useState(gameSettings['easy'].mines);

    const initializeBoard = (currentDifficulty = difficulty) => {
        const { rows, cols, mines } = gameSettings[currentDifficulty] || gameSettings['easy'];

        setTotalMines(mines);
        setFlaggedCount(0);
        setGameStatus('playing');
        setFirstClick(true);

        const newBoard = Array.from({ length: rows }, () =>
            Array.from({ length: cols }, () => ({
                isMine: false,
                adjacentMines: 0,
                state: 'unselected', // 'unselected', 'selected', 'flagged'
            }))
        );

        setBoard(newBoard);
    };

    useEffect(() => {
        initializeBoard(difficulty);
    }, [difficulty]);

    const handleSquareClick = (row, col) => {
        if (gameStatus !== 'playing') return;

        let updatedBoard = board.map((r) => r.map((square) => ({ ...square })));

        if (firstClick) {
            updatedBoard = placeMines(updatedBoard, row, col, totalMines);
            updatedBoard = calculateAdjacentMines(updatedBoard);
            setFirstClick(false);
        }

        updatedBoard = revealSquare(updatedBoard, row, col);

        const status = checkGameStatus(updatedBoard, totalMines);
        if (status !== 'playing') {
            updatedBoard = revealAll(updatedBoard);
            setGameStatus(status);
        }

        setBoard(updatedBoard);
    };

    const handleSquareRightClick = (row, col) => {
        if (gameStatus !== 'playing') return;

        const square = board[row][col];
        if (square.state === 'selected') return;

        let updatedFlaggedCount = flaggedCount;
        let updatedBoard = board.map((r, rowIndex) =>
            r.map((s, colIndex) => {
                if (rowIndex === row && colIndex === col) {
                    if (s.state === 'unselected') {
                        if (flaggedCount >= totalMines) return s;
                        updatedFlaggedCount += 1;
                        return { ...s, state: 'flagged' };
                    } else if (s.state === 'flagged') {
                        updatedFlaggedCount -= 1;
                        return { ...s, state: 'unselected' };
                    }
                }
                return s;
            })
        );

        setFlaggedCount(updatedFlaggedCount);
        setBoard(updatedBoard);
    };

    const placeMines = (currentBoard, safeRow, safeCol, totalMines) => {
        const rows = currentBoard.length;
        const cols = currentBoard[0].length;
        const newBoard = currentBoard.map(row => row.map(square => ({ ...square })));

        let minesPlaced = 0;
        while (minesPlaced < totalMines) {
            const randRow = Math.floor(Math.random() * rows);
            const randCol = Math.floor(Math.random() * cols);

            if (
                newBoard[randRow][randCol].isMine ||
                (Math.abs(randRow - safeRow) <= 1 && Math.abs(randCol - safeCol) <= 1)
            ) {
                continue;
            }

            newBoard[randRow][randCol].isMine = true;
            minesPlaced++;
        }

        return newBoard;
    };

    const calculateAdjacentMines = (currentBoard) => {
        const rows = currentBoard.length;
        const cols = currentBoard[0].length;

        const directions = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1], [0, 1],
            [1, -1], [1, 0], [1, 1],
        ];

        const newBoard = currentBoard.map(row => row.map(square => ({ ...square })));

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if (!newBoard[r][c].isMine) {
                    newBoard[r][c].adjacentMines = directions.reduce((count, [dx, dy]) => {
                        const newRow = r + dx;
                        const newCol = c + dy;
                        if (
                            newRow >= 0 && newRow < rows &&
                            newCol >= 0 && newCol < cols &&
                            newBoard[newRow][newCol].isMine
                        ) {
                            return count + 1;
                        }
                        return count;
                    }, 0);
                }
            }
        }

        return newBoard;
    };

    const revealSquare = (currentBoard, row, col) => {
        const newBoard = currentBoard.map(r => r.map(square => ({ ...square })));
        const stack = [[row, col]];

        while (stack.length > 0) {
            const [currentRow, currentCol] = stack.pop();
            const square = newBoard[currentRow][currentCol];

            if (square.state === 'selected' || square.state === 'flagged') {
                continue;
            }

            square.state = 'selected';

            if (square.adjacentMines === 0 && !square.isMine) {
                const directions = [
                    [-1, -1], [-1, 0], [-1, 1],
                    [0, -1], [0, 1],
                    [1, -1], [1, 0], [1, 1],
                ];

                directions.forEach(([dx, dy]) => {
                    const newRow = currentRow + dx;
                    const newCol = currentCol + dy;
                    if (
                        newRow >= 0 && newRow < newBoard.length &&
                        newCol >= 0 && newCol < newBoard[0].length &&
                        newBoard[newRow][newCol].state === 'unselected'
                    ) {
                        stack.push([newRow, newCol]);
                    }
                });
            }
        }

        return newBoard;
    };

    const checkGameStatus = (currentBoard, totalMines) => {
        let revealedCount = 0;
        let mineRevealed = false;

        currentBoard.forEach(row => {
            row.forEach(square => {
                if (square.state === 'selected') {
                    revealedCount++;
                    if (square.isMine) {
                        mineRevealed = true;
                    }
                }
            });
        });

        if (mineRevealed) {
            return 'lost';
        }

        const totalSquares = currentBoard.length * currentBoard[0].length;
        if (revealedCount === totalSquares - totalMines) {
            return 'won';
        }

        return 'playing';
    };

    const revealAll = (currentBoard) => {
        return currentBoard.map(row =>
            row.map(square => ({
                ...square,
                state: 'selected',
            }))
        );
    };

    const resetGame = () => {
        initializeBoard();
    };

    return (
        <GameContext.Provider
            value={{
                difficulty,
                setDifficulty,
                board,
                gameStatus,
                handleSquareClick,
                handleSquareRightClick,
                flaggedCount,
                totalMines,
                resetGame,
                gameSettings,
            }}
        >
            {children}
        </GameContext.Provider>
    );
};

GameProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default GameContext;