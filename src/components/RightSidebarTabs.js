import React, { useState } from 'react';
import './RightSidebarTabs.css';
import JobPanel from './JobPanel';
import NPCsPanel from './NPCsPanel';
import AIQuestsPanel from './AIQuestsPanel';
import AIChatPanel from './AIChatPanel';
import AIEventsPanel from './AIEventsPanel';
import AIPlanningPanel from './AIPlanningPanel';
import AIEconomyPanel from './AIEconomyPanel';

function RightSidebarTabs({ walletAddress, player, gameState, onUpdate }) {
  const [activeTab, setActiveTab] = useState('jobs');

  const tabs = [
    { id: 'jobs', label: '💼 Jobs', icon: '💼' },
    { id: 'npcs', label: '👥 NPCs', icon: '👥' },
    { id: 'ai', label: '🤖 AI', icon: '🤖' },
    { id: 'economy', label: '📊 Economy', icon: '📊' }
  ];

  if (!walletAddress || !player) {
    return (
      <div className="right-sidebar-tabs">
        <div className="connect-prompt-compact">
          <h3>Connect Wallet</h3>
          <p>Connect to start playing</p>
        </div>
      </div>
    );
  }

  return (
    <div className="right-sidebar-tabs">
      <div className="sidebar-tabs-header">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
            title={tab.label}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label.replace(/[^\w\s]/g, '').trim()}</span>
          </button>
        ))}
      </div>

      <div className="sidebar-tabs-content">
        {activeTab === 'jobs' && (
          <div className="tab-panel">
            <JobPanel 
              walletAddress={walletAddress} 
              player={player}
              onUpdate={onUpdate}
            />
            <AIQuestsPanel 
              walletAddress={walletAddress}
              player={player}
              onUpdate={onUpdate}
            />
          </div>
        )}

        {activeTab === 'npcs' && (
          <div className="tab-panel">
            <NPCsPanel gameState={gameState} onRefresh={onUpdate} />
            <AIChatPanel npcs={gameState?.npcs || []} />
          </div>
        )}

        {activeTab === 'ai' && (
          <div className="tab-panel">
            <AIEventsPanel gameState={gameState} onRefresh={onUpdate} />
            <AIPlanningPanel gameState={gameState} />
          </div>
        )}

        {activeTab === 'economy' && (
          <div className="tab-panel">
            <AIEconomyPanel gameState={gameState} />
          </div>
        )}
      </div>
    </div>
  );
}

export default RightSidebarTabs;

