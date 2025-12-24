import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getEvolutionStatus, getActiveEvents } from '../services/api';
import WalletConnection from './WalletConnection';
import './GameHeader.css';

function GameHeader({ gameState, player, walletAddress, onWalletConnect }) {
  const [evolutionStatus, setEvolutionStatus] = useState(null);
  const [activeEvents, setActiveEvents] = useState([]);
  const [coinsPerMin, setCoinsPerMin] = useState(0);

  useEffect(() => {
    loadEvolutionStatus();
    loadActiveEvents();
    const interval = setInterval(() => {
      loadEvolutionStatus();
      loadActiveEvents();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Calculate coins per minute based on job
    if (player?.currentJob) {
      // Default jobs
      const defaultJobs = [
        { id: 1, coinsPerWork: 10 },
        { id: 2, coinsPerWork: 15 },
        { id: 3, coinsPerWork: 20 },
        { id: 4, coinsPerWork: 12 },
        { id: 5, coinsPerWork: 25 }
      ];
      
      const allJobs = [...defaultJobs, ...(gameState?.jobs || [])];
      const job = allJobs.find(j => j.id === player.currentJob);
      
      if (job) {
        // Assuming average work every 5 minutes (cooldown)
        const coinsPerWork = job.coinsPerWork * (player.level || 1);
        const estimatedPerMin = coinsPerWork / 5; // Rough estimate
        setCoinsPerMin(Math.round(estimatedPerMin * 10) / 10);
      }
    } else {
      setCoinsPerMin(0);
    }
  }, [player, gameState]);

  useEffect(() => {
    // Pulse animation for evolution timer
    const interval = setInterval(() => {
      setPulse(p => !p);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const loadEvolutionStatus = async () => {
    try {
      const status = await getEvolutionStatus();
      setEvolutionStatus(status);
    } catch (error) {
      console.error('Error loading evolution status:', error);
    }
  };

  const loadActiveEvents = async () => {
    try {
      const events = await getActiveEvents();
      setActiveEvents(events || []);
    } catch (error) {
      console.error('Error loading events:', error);
    }
  };

  const formatEvolutionTime = (ms) => {
    if (!ms || ms <= 0) return 'Ready!';
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <header className="game-header">
      <div className="header-left">
        <div className="logo-section">
          <Link to="/" className="game-title-link">
            <h1 className="game-title">
              🌍 DegenWorld
              <span className="pulse-dot">●</span>
            </h1>
          </Link>
          <p className="game-subtitle">On-chain city simulation</p>
        </div>
      </div>

      <div className="header-center">
        {player && (
          <div className="live-signals">
            {coinsPerMin > 0 && (
              <div className="signal-item coins-signal">
                <span className="signal-icon">💰</span>
                <span className="signal-value">+{coinsPerMin}/min</span>
              </div>
            )}
            
            {evolutionStatus && (
              <div className={`signal-item evolution-signal ${evolutionStatus.timeUntilNextEvolution === 0 ? 'ready' : ''}`}>
                <span className="signal-icon">⏱️</span>
                <span className="signal-value">
                  Next: {formatEvolutionTime(evolutionStatus.timeUntilNextEvolution)}
                </span>
              </div>
            )}

            {activeEvents.length > 0 && (
              <div className="signal-item event-signal">
                <span className="signal-icon">🔔</span>
                <span className="signal-value">{activeEvents.length} event{activeEvents.length > 1 ? 's' : ''}</span>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="header-right">
        <Link to="/docs" className="docs-link">
          📚 Docs
        </Link>
        <WalletConnection onConnect={onWalletConnect} walletAddress={walletAddress} />
      </div>
    </header>
  );
}

export default GameHeader;

