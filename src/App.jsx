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
      <AppContent /> { }
    </Router>
  );
};

const AppContent = () => {
  const location = useLocation();

  return (
    <>
      <header className="app-header">
        <h1>Find Kirby!</h1>
      </header>

      {location.pathname !== "/" && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:difficulty" element={<Game />} />
        <Route path="/rules" element={<Rules />} />
      </Routes>
    </>
  );
};


export default App;
