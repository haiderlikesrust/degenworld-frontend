import React, { useState, useEffect } from 'react';
import { generateQuest, getQuests, completeQuest } from '../services/api';
import './AIQuestsPanel.css';

function AIQuestsPanel({ walletAddress, player, onUpdate }) {
  const [quests, setQuests] = useState([]);
  const [generating, setGenerating] = useState(false);
  const [completing, setCompleting] = useState(null);

  const loadQuests = React.useCallback(async () => {
    try {
      const questsData = await getQuests(walletAddress);
      setQuests(questsData.filter(q => q.status === 'active'));
    } catch (error) {
      console.error('Error loading quests:', error);
    }
  }, [walletAddress]);

  useEffect(() => {
    if (walletAddress) {
      loadQuests();
    }
  }, [walletAddress, loadQuests]);

  const handleGenerate = async () => {
    if (!walletAddress) {
      alert('Please connect your wallet first');
      return;
    }
    setGenerating(true);
    try {
      const result = await generateQuest(walletAddress);
      alert(result.message);
      loadQuests();
    } catch (error) {
      alert('Failed to generate quest: ' + (error.response?.data?.error || error.message));
    } finally {
      setGenerating(false);
    }
  };

  const handleComplete = async (questId) => {
    setCompleting(questId);
    try {
      const result = await completeQuest(questId, walletAddress);
      let message = result.message;
      if (result.transactionSignature) {
        message += `\n\nTransaction: ${result.transactionSignature.slice(0, 8)}...${result.transactionSignature.slice(-8)}`;
        message += `\nView on Solana Explorer: https://solscan.io/tx/${result.transactionSignature}`;
      }
      if (result.dailyQuestsRemaining !== undefined) {
        message += `\n\nDaily quests remaining: ${result.dailyQuestsRemaining}/10`;
      }
      alert(message);
      loadQuests();
      onUpdate();
    } catch (error) {
      alert('Failed to complete quest: ' + (error.response?.data?.error || error.message));
    } finally {
      setCompleting(null);
    }
  };

  const getQuestIcon = (type) => {
    switch (type) {
      case 'collect': return '📦';
      case 'build': return '🏗️';
      case 'explore': return '🗺️';
      case 'defend': return '🛡️';
      case 'trade': return '💰';
      default: return '📋';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return '#4caf50';
      case 'medium': return '#ff9800';
      case 'hard': return '#f44336';
      default: return '#888';
    }
  };

  if (!walletAddress) {
    return (
      <div className="ai-quests-panel">
        <h3>🤖 AI Quests</h3>
        <p>Connect your wallet to get personalized AI-generated quests!</p>
      </div>
    );
  }

  // Get daily quests remaining
  const dailyQuestsRemaining = player?.questStats?.dailyQuests !== undefined 
    ? Math.max(0, 10 - player.questStats.dailyQuests)
    : 10;

  return (
    <div className="ai-quests-panel">
      <div className="quests-header">
        <h3>🤖 AI Quests</h3>
        <div className="quest-header-controls">
          <button 
            onClick={handleGenerate} 
            disabled={generating}
            className="generate-quest-btn"
          >
            {generating ? 'Generating...' : 'Get Quest'}
          </button>
          <span className="quest-limit-text">
            {dailyQuestsRemaining}/10 quests today
          </span>
        </div>
      </div>

      {quests.length === 0 ? (
        <div className="no-quests">
          <p>No active quests. Generate one to get started!</p>
        </div>
      ) : (
        <div className="quests-list">
          {quests.map((quest) => (
            <div key={quest.id} className="quest-card">
              <div className="quest-header">
                <span className="quest-icon">{getQuestIcon(quest.type)}</span>
                <h4>{quest.title}</h4>
                <span 
                  className="quest-difficulty"
                  style={{ background: getDifficultyColor(quest.difficulty) }}
                >
                  {quest.difficulty}
                </span>
              </div>
              <p className="quest-description">{quest.description}</p>
              
              {quest.requirements && (
                <div className="quest-requirements">
                  <strong>Requirements:</strong>
                  {quest.requirements.coins > 0 && (
                    <span>💰 {quest.requirements.coins} coins</span>
                  )}
                </div>
              )}

              {quest.rewards && (
                <div className="quest-rewards">
                  <strong>Rewards:</strong>
                  {quest.rewards.coins > 0 && (
                    <span className="reward">💰 +{quest.rewards.coins} coins</span>
                  )}
                  {quest.rewards.experience > 0 && (
                    <span className="reward">⭐ +{quest.rewards.experience} exp</span>
                  )}
                </div>
              )}

              <button
                onClick={() => handleComplete(quest.id)}
                disabled={completing === quest.id}
                className="complete-quest-btn"
              >
                {completing === quest.id ? 'Completing...' : 'Complete Quest'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AIQuestsPanel;

