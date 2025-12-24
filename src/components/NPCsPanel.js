import React, { useState, useEffect } from 'react';
import { getNPCs } from '../services/api';
import './NPCsPanel.css';

function NPCsPanel({ gameState, onRefresh }) {
  const [npcs, setNPCs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNPCs();
  }, [gameState]);

  const loadNPCs = async () => {
    try {
      const npcsData = await getNPCs();
      setNPCs(npcsData);
      setLoading(false);
    } catch (error) {
      console.error('Error loading NPCs:', error);
      setLoading(false);
    }
  };

  return (
    <div className="npcs-panel">
      <div className="npcs-header">
        <h3>NPCs (Citizens)</h3>
        <span className="npc-count">{npcs.length} citizens</span>
      </div>

      {loading ? (
        <div>Loading NPCs...</div>
      ) : npcs.length === 0 ? (
        <div className="no-npcs">
          <p>No NPCs yet. Generate some to populate your country!</p>
        </div>
      ) : (
        <div className="npcs-list">
          {npcs.map((npc) => (
            <div key={npc.id} className="npc-card">
              <div className="npc-header">
                <h4>{npc.name}</h4>
                <span className="npc-occupation">{npc.occupation}</span>
              </div>
              <div className="npc-details">
                <p className="npc-personality">
                  <strong>Personality:</strong> {npc.personality}
                </p>
                <p className="npc-backstory">{npc.backstory}</p>
                <div className="npc-stats">
                  <span>Skill: {npc.skillLevel}/5</span>
                  <span>💰 {npc.coins || 0} coins</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NPCsPanel;

