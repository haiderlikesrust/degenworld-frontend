import React, { useState } from 'react';
import { chatWithNPC } from '../services/api';
import './AIChatPanel.css';

function AIChatPanel({ npcs }) {
  const [selectedNPC, setSelectedNPC] = useState(null);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [sending, setSending] = useState(false);

  const handleNPCSelect = (npc) => {
    setSelectedNPC(npc);
    setChatHistory([]);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim() || !selectedNPC || sending) return;

    const userMessage = message;
    setMessage('');
    setSending(true);

    // Add user message to history
    const newHistory = [...chatHistory, { role: 'user', text: userMessage }];
    setChatHistory(newHistory);

    try {
      const result = await chatWithNPC(selectedNPC.id, userMessage);
      setChatHistory([...newHistory, { role: 'npc', text: result.response, npc: result.npc }]);
    } catch (error) {
      setChatHistory([...newHistory, { 
        role: 'npc', 
        text: 'Sorry, I cannot respond right now.', 
        npc: { name: selectedNPC.name } 
      }]);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="ai-chat-panel">
      <h3>💬 Chat with NPCs (AI)</h3>
      
      {!selectedNPC ? (
        <div className="npc-selector">
          <p>Select an NPC to chat with:</p>
          <div className="npc-list">
            {npcs && npcs.length > 0 ? (
              npcs.map((npc) => (
                <button
                  key={npc.id}
                  onClick={() => handleNPCSelect(npc)}
                  className="npc-select-btn"
                >
                  <span className="npc-name">{npc.name}</span>
                  <span className="npc-occupation">{npc.occupation}</span>
                </button>
              ))
            ) : (
              <p className="no-npcs">No NPCs available. Generate some first!</p>
            )}
          </div>
        </div>
      ) : (
        <div className="chat-container">
          <div className="chat-header">
            <span>Chatting with: <strong>{selectedNPC.name}</strong> ({selectedNPC.occupation})</span>
            <button onClick={() => setSelectedNPC(null)} className="back-btn">← Back</button>
          </div>
          
          <div className="chat-messages">
            {chatHistory.length === 0 ? (
              <div className="chat-welcome">
                <p>Start a conversation with {selectedNPC.name}!</p>
                <p className="npc-personality">Personality: {selectedNPC.personality}</p>
              </div>
            ) : (
              chatHistory.map((msg, idx) => (
                <div key={idx} className={`chat-message ${msg.role}`}>
                  <div className="message-content">
                    {msg.role === 'npc' && (
                      <span className="message-author">{msg.npc?.name || selectedNPC.name}:</span>
                    )}
                    {msg.text}
                  </div>
                </div>
              ))
            )}
            {sending && (
              <div className="chat-message npc">
                <div className="message-content">
                  <span className="typing">Typing...</span>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSend} className="chat-input-form">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              disabled={sending}
              className="chat-input"
            />
            <button type="submit" disabled={sending || !message.trim()} className="send-btn">
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default AIChatPanel;

