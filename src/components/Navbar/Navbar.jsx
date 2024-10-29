import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    return (
        <nav className="navbar">
            <NavLink
                to="/"
                end
                className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
            >
                Home
            </NavLink>
            <NavLink
                to="/game/easy"
                end
                className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
            >
                Easy
            </NavLink>
            <NavLink
                to="/game/medium"
                end
                className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
            >
                Medium
            </NavLink>
            <NavLink
                to="/game/hard"
                end
                className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
            >
                Hard
            </NavLink>
            <NavLink
                to="/rules"
                end
                className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
            >
                Rules
            </NavLink>
        </nav>
    );
}

export default Navbar;