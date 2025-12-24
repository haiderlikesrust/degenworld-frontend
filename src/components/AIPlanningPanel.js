import React, { useState } from 'react';
import { getPlanningSuggestions } from '../services/api';
import './AIPlanningPanel.css';

function AIPlanningPanel({ gameState }) {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGetSuggestions = async () => {
    setLoading(true);
    try {
      const result = await getPlanningSuggestions();
      setSuggestions(result.suggestions || []);
    } catch (error) {
      alert('Failed to get planning suggestions: ' + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#f44336';
      case 'medium': return '#ff9800';
      case 'low': return '#4caf50';
      default: return '#888';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'building': return '🏢';
      case 'road': return '🛣️';
      case 'shop': return '🏪';
      case 'district': return '🏘️';
      default: return '📍';
    }
  };

  return (
    <div className="ai-planning-panel">
      <div className="planning-header">
        <h3>🏗️ AI City Planning</h3>
        <button 
          onClick={handleGetSuggestions} 
          disabled={loading}
          className="get-suggestions-btn"
        >
          {loading ? 'Analyzing...' : 'Get Suggestions'}
        </button>
      </div>

      {suggestions.length === 0 ? (
        <div className="no-suggestions">
          <p>Click "Get Suggestions" to receive AI-powered city planning advice!</p>
        </div>
      ) : (
        <div className="suggestions-list">
          {suggestions.map((suggestion, idx) => (
            <div key={idx} className="suggestion-card">
              <div className="suggestion-header">
                <span className="suggestion-icon">{getTypeIcon(suggestion.type)}</span>
                <h4>{suggestion.suggestion}</h4>
                <span 
                  className="suggestion-priority"
                  style={{ background: getPriorityColor(suggestion.priority) }}
                >
                  {suggestion.priority}
                </span>
              </div>
              <p className="suggestion-reason">{suggestion.reason}</p>
              {suggestion.estimatedCost && (
                <div className="suggestion-cost">
                  Estimated Cost: 💰 {suggestion.estimatedCost} coins
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AIPlanningPanel;

