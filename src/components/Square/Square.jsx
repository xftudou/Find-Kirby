import React from 'react';
import './Square.css';
import PropTypes from 'prop-types';
import kirby_bomb from '../../assets/pixel_kirby.jpg';
import dee_flag from '../../assets/pixel_dee.webp';

const Square = ({ square, onClick, onRightClick }) => {
    let display = '';
    let className = 'square';

    if (square.state === 'selected') {
        className += ' selected';
        if (square.isMine) {
            display = <img src={kirby_bomb} alt="Bomb" className="bomb-icon" />;
        } else if (square.adjacentMines > 0) {
            display = square.adjacentMines;
        }
    } else if (square.state === 'flagged') {
        className += ' flagged';
        display = <img src={dee_flag} alt="Flag" className="flag-icon" />;
    }

    return (
        <div
            className={className}
            onClick={onClick}
            onContextMenu={(event) => {
                event.preventDefault();
                onRightClick();
            }}
        >
            {display}
        </div>
    );
};

Square.propTypes = {
    square: PropTypes.shape({
        state: PropTypes.oneOf(['unselected', 'selected', 'flagged']).isRequired,
        isMine: PropTypes.bool,
        adjacentMines: PropTypes.number,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
    onRightClick: PropTypes.func.isRequired,
};

export default Square;