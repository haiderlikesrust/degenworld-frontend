import React, { useState, useEffect } from 'react';
import { getEvolutionStatus, triggerEvolution, getEvolutionSuggestions } from '../services/api';
import './EvolutionPanel.css';

function EvolutionPanel({ gameState, onRefresh }) {
  const [evolutionStatus, setEvolutionStatus] = useState(null);
  const [triggering, setTriggering] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);

  useEffect(() => {
    loadEvolutionStatus();
    const interval = setInterval(loadEvolutionStatus, 1000);
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

  const handleTriggerEvolution = async () => {
    setTriggering(true);
    try {
      const result = await triggerEvolution();
      alert(result.message);
      onRefresh();
      loadEvolutionStatus();
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to trigger evolution');
    } finally {
      setTriggering(false);
    }
  };

  const handleGetSuggestions = async () => {
    setLoadingSuggestions(true);
    try {
      const result = await getEvolutionSuggestions();
      setSuggestions(result.suggestions || []);
    } catch (error) {
      console.error('Error getting suggestions:', error);
    } finally {
      setLoadingSuggestions(false);
    }
  };

  if (!evolutionStatus) return <div>Loading evolution status...</div>;

  const timeUntilNext = Math.max(0, evolutionStatus.timeUntilNextEvolution);
  const minutes = Math.floor(timeUntilNext / 60000);
  const seconds = Math.floor((timeUntilNext % 60000) / 1000);
  const canEvolve = timeUntilNext === 0;
  const progress = Math.max(0, Math.min(100, (600000 - timeUntilNext) / 600000 * 100)); // 10 min = 600000ms

  // What unlocks at next level
  const nextLevel = (evolutionStatus.evolutionLevel || 0) + 1;
  const unlocks = [
    nextLevel % 3 === 0 ? 'New Job Types' : null,
    nextLevel % 2 === 0 ? 'Advanced Buildings' : null,
    nextLevel % 4 === 0 ? 'Special Events' : null,
    'New NPCs',
    'Enhanced Infrastructure'
  ].filter(Boolean);

  return (
    <div className="evolution-panel">
      <h3>⭐ Country Evolution</h3>
      
      <div className="evolution-level-card">
        <div className="level-badge-large">Level {evolutionStatus.evolutionLevel}</div>
        {canEvolve && <div className="pulse-effect">✨</div>}
      </div>

      <div className="evolution-timer">
        {canEvolve ? (
          <div className="ready-to-evolve">
            <div className="ready-glow">✨ Country is ready to evolve! ✨</div>
            <button
              onClick={handleTriggerEvolution}
              disabled={triggering}
              className="evolve-btn"
            >
              {triggering ? 'Evolving...' : '🚀 Trigger Evolution'}
            </button>
          </div>
        ) : (
          <div className="countdown">
            <div className="progress-bar-container">
              <div className="progress-bar" style={{ width: `${progress}%` }}></div>
            </div>
            <p className="countdown-label">Next evolution in:</p>
            <div className="timer-large">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </div>
            <div className="unlocks-preview">
              <div className="unlocks-label">Next level unlocks:</div>
              <div className="unlocks-list">
                {unlocks.slice(0, 3).map((unlock, idx) => (
                  <span key={idx} className="unlock-badge">{unlock}</span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="evolution-stats">
        <div className="evolution-stat">
          <span className="stat-icon">🏢</span>
          <span>{evolutionStatus.buildingsCount} Buildings</span>
        </div>
        <div className="evolution-stat">
          <span className="stat-icon">🛣️</span>
          <span>{evolutionStatus.roadsCount} Roads</span>
        </div>
        <div className="evolution-stat">
          <span className="stat-icon">🏪</span>
          <span>{evolutionStatus.shopsCount} Shops</span>
        </div>
      </div>

      <div className="evolution-info">
        <p>Your country evolves automatically every 10 minutes, adding new buildings, roads, and shops!</p>
      </div>

      <div className="ai-suggestions-section">
        <button 
          onClick={handleGetSuggestions} 
          disabled={loadingSuggestions}
          className="get-suggestions-btn"
        >
          {loadingSuggestions ? 'Getting AI Suggestions...' : '🤖 Get AI Evolution Suggestions'}
        </button>
        
        {suggestions.length > 0 && (
          <div className="suggestions-list">
            <h4>AI Suggestions:</h4>
            {suggestions.map((suggestion, idx) => (
              <div key={idx} className="suggestion-item">
                <strong>{suggestion.name}</strong>
                <p>{suggestion.reason}</p>
                <span className={`priority ${suggestion.priority}`}>{suggestion.priority}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default EvolutionPanel;

