import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import '../Game/Game.jsx'
import homepage_photo from '../../assets/homepage_photo.avif';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home">
            <img src={homepage_photo} alt="Find Kirby!" className="home-image" />
            <nav className="home-nav">
                <button onClick={() => navigate("/game/easy")}>Start Game!</button>
                <button onClick={() => navigate("/rules")}>Rules</button>
            </nav>
        </div>
    );
};

export default Home;