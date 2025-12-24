import React, { useState } from 'react';
import { getEconomyStatus } from '../services/api';
import './AIEconomyPanel.css';

function AIEconomyPanel({ gameState }) {
  const [economy, setEconomy] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGetStatus = async () => {
    setLoading(true);
    try {
      const result = await getEconomyStatus();
      setEconomy(result);
    } catch (error) {
      alert('Failed to get economy status: ' + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'bullish': return '#4caf50';
      case 'bearish': return '#f44336';
      case 'stable': return '#ff9800';
      default: return '#888';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'bullish': return '📈';
      case 'bearish': return '📉';
      case 'stable': return '➡️';
      default: return '💰';
    }
  };

  return (
    <div className="ai-economy-panel">
      <div className="economy-header">
        <h3>💰 AI Economy Simulation</h3>
        <button 
          onClick={handleGetStatus} 
          disabled={loading}
          className="get-status-btn"
        >
          {loading ? 'Analyzing...' : 'Analyze Economy'}
        </button>
      </div>

      {!economy ? (
        <div className="no-economy">
          <p>Click "Analyze Economy" to get AI-powered economic analysis!</p>
        </div>
      ) : (
        <div className="economy-content">
          <div className="economy-trend" style={{ borderColor: getTrendColor(economy.trend) }}>
            <div className="trend-header">
              <span className="trend-icon">{getTrendIcon(economy.trend)}</span>
              <span className="trend-label">Market Trend: <strong>{economy.trend}</strong></span>
            </div>
            <p className="economy-description">{economy.description}</p>
          </div>

          {economy.priceChanges && (
            <div className="price-changes">
              <h4>Price Changes</h4>
              <div className="price-list">
                {economy.priceChanges.building !== 0 && (
                  <div className="price-item">
                    <span>🏢 Buildings:</span>
                    <span className={economy.priceChanges.building > 0 ? 'positive' : 'negative'}>
                      {economy.priceChanges.building > 0 ? '+' : ''}{economy.priceChanges.building}%
                    </span>
                  </div>
                )}
                {economy.priceChanges.shop !== 0 && (
                  <div className="price-item">
                    <span>🏪 Shops:</span>
                    <span className={economy.priceChanges.shop > 0 ? 'positive' : 'negative'}>
                      {economy.priceChanges.shop > 0 ? '+' : ''}{economy.priceChanges.shop}%
                    </span>
                  </div>
                )}
                {economy.priceChanges.road !== 0 && (
                  <div className="price-item">
                    <span>🛣️ Roads:</span>
                    <span className={economy.priceChanges.road > 0 ? 'positive' : 'negative'}>
                      {economy.priceChanges.road > 0 ? '+' : ''}{economy.priceChanges.road}%
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {economy.marketEvents && economy.marketEvents.length > 0 && (
            <div className="market-events">
              <h4>Market Events</h4>
              <ul>
                {economy.marketEvents.map((event, idx) => (
                  <li key={idx}>{event}</li>
                ))}
              </ul>
            </div>
          )}

          {economy.recommendations && economy.recommendations.length > 0 && (
            <div className="recommendations">
              <h4>AI Recommendations</h4>
              <ul>
                {economy.recommendations.map((rec, idx) => (
                  <li key={idx}>💡 {rec}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AIEconomyPanel;

