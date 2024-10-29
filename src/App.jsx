import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Game from './components/Game/Game';
import Rules from './components/Rules/Rules';
import './App.css';

const App = () => {
  return (
    <Router>
      <Header />
      <ShowNavbar />
      <div className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game/:difficulty" element={<Game />} />
          <Route path="/rules" element={<Rules />} />
        </Routes>
      </div>
    </Router>
  );
}

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
