import React from 'react';
import './Navbar.css';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Navbar = () => {
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    return (
        <nav className='nav-bar'>
            <ul>
                <li><Link to="/ ">Home</Link></li>
                <li><Link to="/game/easy">Easy</Link></li>
                <li><Link to="/game/medium">Medium</Link></li>
                <li><Link to="/game/hard">Hard</Link></li>
                <li><Link to="/rules">Rules</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;