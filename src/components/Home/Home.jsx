import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import '../Game/Game.jsx'
import homepage_photo from './homepage_photo.avif';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home">
            <img src={homepage_photo} alt="Find Kirby!" className="home-image" />
            <nav className="home-nav">
                <ul>
                    <li>
                        <button onClick={() => navigate("/game/easy")}>Start Game!</button> {/* Button for navigation */}
                    </li>
                    <li>
                        <button onClick={() => navigate("/rules")}>Rules</button> {/* Button for navigation */}
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Home;