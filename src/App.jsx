import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Game from './components/Game/Game';
import Rules from './components/Rules/Rules';
import { GameProvider } from './GameContext';
import './App.css';


const App = () => {
  return (
    <Router>
      <GameProvider>
        <Header />
        <ShowNavbar />
        <div className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/game/:difficulty" element={<GameRoute />} />
            <Route path="/rules" element={<Rules />} />
            <Route path="*" element={<Navigate to="/game/easy" replace />} />
          </Routes>
        </div>
      </GameProvider>
    </Router>
  );
};

const GameRoute = () => {
  return <Game />;
};

// Fixed Header on the top
const Header = () => (
  <header className="app-header">
    <h1>Find Kirby!</h1>
  </header>
)

// Show navbar if not on homepage
function ShowNavbar() {
  const location = useLocation();
  const ShowNavbar = location.pathname !== "/";
  return ShowNavbar ? <Navbar /> : null;
}

export default App;
