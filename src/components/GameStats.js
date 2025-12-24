import React from 'react';
import './GameStats.css';

function GameStats({ gameState, player }) {
  if (!gameState) return null;

  const formatTime = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const formatDuration = (ms) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ${hours % 24}h`;
    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
  };

  const gameDuration = Date.now() - (gameState.gameStartTime || Date.now());

  return (
    <div className="game-stats-compact">
      {/* Player Stats - Most Important */}
      {player && (
        <div className="player-stats-compact">
          <div className="player-stat-main">
            <div className="stat-icon-large">💰</div>
            <div className="stat-main-content">
              <div className="stat-main-label">Coins</div>
              <div className="stat-main-value">{player.coins || 0}</div>
            </div>
          </div>
          <div className="player-stat-secondary">
            <div className="stat-secondary-item">
              <span className="stat-secondary-label">Level</span>
              <span className="stat-secondary-value">{player.level || 1}</span>
            </div>
            <div className="stat-secondary-item">
              <span className="stat-secondary-label">XP</span>
              <span className="stat-secondary-value">{player.experience || 0}</span>
            </div>
          </div>
        </div>
      )}

      {/* Key Metrics - Compact Grid */}
      <div className="metrics-grid-compact">
        <div className="metric-item">
          <div className="metric-icon">⭐</div>
          <div className="metric-value">{gameState.evolutionLevel || 0}</div>
          <div className="metric-label">Level</div>
        </div>
        <div className="metric-item">
          <div className="metric-icon">🏢</div>
          <div className="metric-value">{(gameState.buildings || []).length}</div>
          <div className="metric-label">Buildings</div>
        </div>
        <div className="metric-item">
          <div className="metric-icon">👥</div>
          <div className="metric-value">{(gameState.npcs || []).length}</div>
          <div className="metric-label">Citizens</div>
        </div>
        <div className="metric-item">
          <div className="metric-icon">🛣️</div>
          <div className="metric-value">{(gameState.roads || []).length}</div>
          <div className="metric-label">Roads</div>
        </div>
      </div>
    </div>
  );
}

export default GameStats;

