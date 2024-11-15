import React, { useRef } from 'react';
import './Square.css';
import PropTypes from 'prop-types';
import kirby_bomb from '../../assets/pixel_kirby.jpg';
import dee_flag from '../../assets/pixel_dee.webp';

const Square = ({ square, onClick, onRightClick }) => {
    const timerRef = useRef(null);
    const touchStartTimeRef = useRef(0);
    const longPressThreshold = 500; // milliseconds

    const handleTouchStart = (event) => {
        touchStartTimeRef.current = Date.now();

        timerRef.current = setTimeout(() => {
            onRightClick();
            timerRef.current = null;
        }, longPressThreshold);
    };

    const handleTouchEnd = (event) => {
        const touchDuration = Date.now() - touchStartTimeRef.current;

        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;

            if (touchDuration < longPressThreshold) {
                onClick();
            }
        }
    };

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
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onContextMenu={(event) => {
                event.preventDefault();
                onRightClick();
            }}
            style={{ touchAction: 'manipulation' }}
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