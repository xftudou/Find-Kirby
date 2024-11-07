import React from 'react';
import PropTypes from 'prop-types';
import './Status.css';


const Status = ({ totalMines, resetGame, flaggedCount }) => {

    return (
        <div className="status">
            <div className="mines-counter">
                Mines: {totalMines - flaggedCount}
            </div>
            <button onClick={resetGame} className="reset-button">Reset</button>
        </div>
    );
};

Status.propTypes = {
    totalMines: PropTypes.number.isRequired,
    flaggedCount: PropTypes.number.isRequired,
    resetGame: PropTypes.func.isRequired,
};

export default Status;