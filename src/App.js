import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';
import GameHeader from './components/GameHeader';
import GameMap from './components/GameMap';
import GameStats from './components/GameStats';
import EvolutionPanel from './components/EvolutionPanel';
import RightSidebarTabs from './components/RightSidebarTabs';
import Documentation from './components/Documentation';
import { getGameState, initializeGame } from './services/api';

function Game() {
  const [gameState, setGameState] = useState(null);
  const [walletAddress, setWalletAddress] = useState(null);
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [showInitModal, setShowInitModal] = useState(false);
  const [initForm, setInitForm] = useState({ tokenContractAddress: '' });

  useEffect(() => {
    loadGameState();
    const interval = setInterval(loadGameState, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const loadGameState = async () => {
    try {
      const state = await getGameState();
      setGameState(state);
      if (!state.initialized) {
        setShowInitModal(true);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error loading game state:', error);
      setLoading(false);
    }
  };

  const handleInitialize = async (e) => {
    e.preventDefault();
    try {
      await initializeGame(initForm.tokenContractAddress);
      setShowInitModal(false);
      loadGameState();
    } catch (error) {
      alert('Failed to initialize game: ' + (error.response?.data?.error || error.message));
    }
  };

  const handleWalletConnect = (address, playerData) => {
    setWalletAddress(address);
    setPlayer(playerData);
  };

  if (loading) {
    return <div className="loading">Loading game...</div>;
  }

  if (!gameState?.initialized) {
    return (
      <div className="init-modal-overlay">
        <div className="init-modal">
          <h2>Initialize Game</h2>
          <p>Enter your token contract address. The central bank wallet is automatically detected from your .env file.</p>
          <form onSubmit={handleInitialize}>
            <div className="form-group">
              <label>Token Mint Address (SPL Token CA):</label>
              <input
                type="text"
                value={initForm.tokenContractAddress}
                onChange={(e) => setInitForm({ ...initForm, tokenContractAddress: e.target.value })}
                placeholder="Enter SPL token mint address..."
                required
              />
            </div>
            <div className="form-note">
              <p>ℹ️ Central bank wallet is automatically detected from CENTRAL_BANK_PRIVATE_KEY in .env</p>
              <p>Make sure your central bank wallet holds the token and CENTRAL_BANK_PRIVATE_KEY is set!</p>
            </div>
            <button type="submit" className="btn-primary">Initialize Game</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <GameHeader 
        gameState={gameState}
        player={player}
        walletAddress={walletAddress}
        onWalletConnect={handleWalletConnect}
      />

      <div className="app-content">
        <div className="left-panel">
          <GameStats gameState={gameState} player={player} />
          <EvolutionPanel gameState={gameState} onRefresh={loadGameState} />
        </div>

        <div className="center-panel">
          <GameMap gameState={gameState} />
        </div>

        <div className="right-panel">
          <RightSidebarTabs
            walletAddress={walletAddress}
            player={player}
            gameState={gameState}
            onUpdate={loadGameState}
          />
        </div>
      </div>
    </div>
  );
}

function AppRouter() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Game />} />
        <Route path="/docs" element={<Documentation />} />
      </Routes>
    </Router>
  );
}

function NavBar() {
  const location = useLocation();
  const isDocsPage = location.pathname === '/docs';

  if (isDocsPage) return null; // Don't show nav on docs page

  return (
    <nav className="top-nav">
      <Link to="/" className="nav-logo">
        🌍 DegenWorld
      </Link>
      <div className="nav-links">
        <Link to="/" className="nav-link">Play</Link>
        <Link to="/docs" className="nav-link">Documentation</Link>
      </div>
    </nav>
  );
}

export default AppRouter;
