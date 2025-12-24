import React from 'react';
import './GameStats.css';

function GameStats({ gameState, player }) {
  if (!gameState) return null;

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

