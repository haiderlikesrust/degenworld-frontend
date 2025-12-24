import React, { useState, useEffect } from 'react';
import { generateEvent, getActiveEvents } from '../services/api';
import './AIEventsPanel.css';

function AIEventsPanel({ gameState, onRefresh }) {
  const [events, setEvents] = useState([]);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    loadActiveEvents();
    const interval = setInterval(loadActiveEvents, 10000);
    return () => clearInterval(interval);
  }, []);

  const loadActiveEvents = async () => {
    try {
      const active = await getActiveEvents();
      setEvents(active);
    } catch (error) {
      console.error('Error loading events:', error);
    }
  };

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      const result = await generateEvent();
      alert(result.message);
      loadActiveEvents();
      onRefresh();
    } catch (error) {
      alert('Failed to generate event: ' + (error.response?.data?.error || error.message));
    } finally {
      setGenerating(false);
    }
  };

  const getEventIcon = (type) => {
    switch (type) {
      case 'festival': return '🎉';
      case 'disaster': return '⚡';
      case 'positive': return '✨';
      case 'challenge': return '⚔️';
      default: return '📅';
    }
  };

  const getEventColor = (type) => {
    switch (type) {
      case 'festival': return '#d4af37'; // Gold for money/events
      case 'disaster': return '#dc3545'; // Red ONLY for disasters
      case 'positive': return '#6b9a7a'; // Muted green for economy/growth
      case 'challenge': return '#667eea'; // Purple (primary accent)
      default: return '#ccc';
    }
  };

  return (
    <div className="ai-events-panel">
      <div className="events-header">
        <h3>🤖 AI Events</h3>
        <button 
          onClick={handleGenerate} 
          disabled={generating}
          className="generate-event-btn"
        >
          {generating ? 'Generating...' : 'Generate Event'}
        </button>
      </div>

      {events.length === 0 ? (
        <div className="no-events">
          <p>No active events. Generate one to see AI-powered events!</p>
        </div>
      ) : (
        <div className="events-list">
          {events.map((event) => (
            <div 
              key={event.id} 
              className="event-card"
              style={{ borderLeft: `3px solid ${getEventColor(event.type)}` }}
            >
              <div className="event-header">
                <span className="event-icon">{getEventIcon(event.type)}</span>
                <h4>{event.name}</h4>
                <span className="event-type">{event.type}</span>
              </div>
              <p className="event-description">{event.description}</p>
              {event.effects && (
                <div className="event-effects">
                  {event.effects.coins !== 0 && (
                    <span className={`effect ${event.effects.coins > 0 ? 'positive' : 'negative'}`}>
                      💰 {event.effects.coins > 0 ? '+' : ''}{event.effects.coins} coins
                    </span>
                  )}
                  {event.effects.buildings !== 0 && (
                    <span className={`effect ${event.effects.buildings > 0 ? 'positive' : 'negative'}`}>
                      🏢 {event.effects.buildings > 0 ? '+' : ''}{event.effects.buildings} buildings
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AIEventsPanel;

