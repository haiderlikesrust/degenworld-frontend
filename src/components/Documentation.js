import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Documentation.css';

function Documentation() {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', title: 'Overview', icon: '🎮' },
    { id: 'getting-started', title: 'Getting Started', icon: '🚀' },
    { id: 'wallet', title: 'Wallet & Token', icon: '👛' },
    { id: 'jobs', title: 'Jobs & Work', icon: '💼' },
    { id: 'quests', title: 'Quests', icon: '🎯' },
    { id: 'evolution', title: 'Evolution', icon: '⭐' },
    { id: 'npcs', title: 'NPCs & Chat', icon: '👥' },
    { id: 'events', title: 'AI Events', icon: '🎉' },
    { id: 'economy', title: 'Economy', icon: '📊' },
    { id: 'rewards', title: 'Rewards', icon: '💰' },
    { id: 'ai-features', title: 'AI Features', icon: '🤖' },
    { id: 'anti-farming', title: 'Anti-Farming', icon: '🛡️' },
    { id: 'progression', title: 'Progression', icon: '📈' },
    { id: 'map', title: 'Map & City', icon: '🗺️' },
    { id: 'technical', title: 'Technical', icon: '🔧' },
    { id: 'faq', title: 'FAQ', icon: '❓' }
  ];

  return (
    <div className="docs-page">
      <header className="docs-header">
        <div className="docs-header-content">
          <Link to="/" className="docs-back-btn">
            <span>←</span> Back to Game
          </Link>
          <div className="docs-title-section">
            <h1>DegenWorld API</h1>
            <p className="docs-version">v1.0.0</p>
          </div>
        </div>
      </header>

      <div className="docs-layout">
        <aside className="docs-sidebar">
          <nav className="docs-nav">
            {sections.map(section => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={`docs-nav-item ${activeSection === section.id ? 'active' : ''}`}
                onClick={() => setActiveSection(section.id)}
              >
                <span className="nav-icon">{section.icon}</span>
                <span className="nav-text">{section.title}</span>
              </a>
            ))}
          </nav>
        </aside>

        <main className="docs-main">
          <div className="docs-content">
          <section id="overview" className="docs-section">
            <h2>🎮 Game Overview</h2>
            <p>
              <strong>DegenWorld</strong> is a self-evolving, on-chain city simulation game built on Solana. 
              Players hold a specific SPL token to participate, work jobs, complete quests, and watch their 
              city grow autonomously. The game features AI-powered NPCs, events, quests, and a dynamic economy 
              that evolves over time.
            </p>
            <div className="feature-grid">
              <div className="feature-card">
                <h3>🏗️ Self-Evolving City</h3>
                <p>Your city automatically grows with new buildings, roads, and shops every 10 minutes</p>
              </div>
              <div className="feature-card">
                <h3>💼 Job System</h3>
                <p>Apply for jobs, solve AI-generated riddles, and earn real Solana tokens</p>
              </div>
              <div className="feature-card">
                <h3>🤖 AI-Powered</h3>
                <p>NPCs, quests, events, and city planning are all AI-generated for unique experiences</p>
              </div>
              <div className="feature-card">
                <h3>💰 Real Rewards</h3>
                <p>Earn actual SPL tokens sent directly to your Solana wallet</p>
              </div>
            </div>
          </section>

          <section id="getting-started" className="docs-section">
            <h2>Getting Started</h2>
            <h3>Prerequisites</h3>
            <ol>
              <li><strong>Phantom Wallet:</strong> Install the <a href="https://phantom.app/" target="_blank" rel="noopener noreferrer">Phantom wallet</a> browser extension</li>
              <li><strong>Required Token:</strong> Your wallet must hold the game's SPL token to play</li>
              <li><strong>SOL for Gas:</strong> Keep some SOL in your wallet for transaction fees</li>
            </ol>

            <h3>First Steps</h3>
            <ol>
              <li><strong>Connect Wallet:</strong> Click "Connect Phantom" in the header</li>
              <li><strong>Verify Token:</strong> The system checks if you hold the required token</li>
              <li><strong>Start Playing:</strong> Once verified, you can apply for jobs and explore the city</li>
            </ol>
          </section>

          <section id="wallet" className="docs-section">
            <h2>Wallet & Token System</h2>
            <h3>Token Gating</h3>
            <p>
              DegenWorld uses <strong>token gating</strong> - you must hold the game's SPL token in your wallet 
              to participate. This ensures only token holders can play and earn rewards.
            </p>
            <ul>
              <li>Token balance is checked when you connect your wallet</li>
              <li>You must maintain the token in your wallet to continue playing</li>
              <li>The token address is displayed during wallet verification</li>
            </ul>

            <h3>Wallet Connection</h3>
            <p>
              The game uses <strong>Phantom Wallet</strong> for Solana integration. When connected:
            </p>
            <ul>
              <li>Your wallet address is displayed in the header</li>
              <li>Network status shows "Solana Mainnet"</li>
              <li>A green pulsing dot indicates active connection</li>
              <li>You can disconnect at any time</li>
            </ul>
          </section>

          <section id="jobs" className="docs-section">
            <h2>Jobs & Work System</h2>
            <h3>Available Jobs</h3>
            <p>The game starts with 5 default jobs, with more unlocking as the city evolves:</p>
            <ul>
              <li><strong>Farmer:</strong> Grow crops and harvest resources (10 coins/work, 5 XP)</li>
              <li><strong>Builder:</strong> Construct buildings and infrastructure (15 coins/work, 8 XP)</li>
              <li><strong>Merchant:</strong> Trade goods and manage shops (20 coins/work, 10 XP)</li>
              <li><strong>Guard:</strong> Protect the city and maintain order (12 coins/work, 6 XP)</li>
              <li><strong>Researcher:</strong> Develop new technologies (25 coins/work, 15 XP)</li>
            </ul>

            <h3>Job Application Process</h3>
            <ol>
              <li><strong>Select a Job:</strong> Browse available jobs in the Jobs tab</li>
              <li><strong>Solve Riddle:</strong> Each job requires solving an AI-generated riddle</li>
              <li><strong>AI Verification:</strong> Your answer is verified by AI (handles synonyms and variations)</li>
              <li><strong>Get Hired:</strong> Correct answer = job secured!</li>
            </ol>

            <h3>Working & Earning</h3>
            <div className="info-box">
              <h4>Parameters</h4>
              <ul>
                <li><strong>Cooldown:</strong> <code>5 minutes</code> between work sessions</li>
                <li><strong>Daily Limit:</strong> <code>50</code> work sessions per day</li>
                <li><strong>Earnings Formula:</strong> <code>coinsPerWork × playerLevel</code></li>
                <li><strong>Experience:</strong> Earn XP with each work session</li>
                <li><strong>Level Up:</strong> Every <code>100 XP</code> = +1 level</li>
              </ul>
            </div>

            <h3>Rewards</h3>
            <p>
              When you work, <strong>real SPL tokens are sent directly to your Solana wallet</strong>. 
              The transaction signature is displayed so you can verify it on Solscan or Solana Explorer.
            </p>
          </section>

          <section id="quests" className="docs-section">
            <h2>AI-Generated Quests</h2>
            <h3>Quest System</h3>
            <p>
              Quests are <strong>AI-generated</strong> based on your player level, current job, and city state. 
              Each quest is unique and tailored to your progress.
            </p>

            <h3>Quest Types</h3>
            <ul>
              <li><strong>Collect:</strong> Gather resources or items</li>
              <li><strong>Build:</strong> Construct new structures</li>
              <li><strong>Explore:</strong> Discover new areas</li>
              <li><strong>Defend:</strong> Protect the city from threats</li>
              <li><strong>Trade:</strong> Complete commercial transactions</li>
            </ul>

            <h3>Quest Mechanics</h3>
            <div className="info-box">
              <h4>Limits & Cooldowns:</h4>
              <ul>
                <li><strong>Cooldown:</strong> 5 minutes between quest generation</li>
                <li><strong>Daily Limit:</strong> Maximum 10 quests per day</li>
                <li><strong>Difficulty:</strong> Easy, Medium, or Hard (based on your level)</li>
                <li><strong>Rewards:</strong> Coins, XP, and sometimes items</li>
              </ul>
            </div>

            <h3>Completing Quests</h3>
            <p>
              When you complete a quest, rewards are automatically sent to your wallet. Quest rewards 
              scale with difficulty and your level.
            </p>
          </section>

          <section id="evolution" className="docs-section">
            <h2>City Evolution</h2>
            <h3>Automatic Growth</h3>
            <p>
              Your city <strong>evolves automatically</strong> every 10 minutes. Each evolution level unlocks:
            </p>
            <ul>
              <li><strong>New Buildings:</strong> Residential, commercial, industrial, educational, hospitals, parks</li>
              <li><strong>Road Network:</strong> Roads connect buildings automatically</li>
              <li><strong>Shops:</strong> General stores, markets, and specialty shops</li>
              <li><strong>New Jobs:</strong> Advanced jobs unlock at higher levels</li>
              <li><strong>NPCs:</strong> 2-5 new citizens join the city each evolution</li>
            </ul>

            <h3>Evolution Levels</h3>
            <table>
              <thead>
                <tr>
                  <th>Level</th>
                  <th>Unlocks</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>1</code></td>
                  <td>Basic buildings, initial jobs</td>
                </tr>
                <tr>
                  <td><code>2</code></td>
                  <td>Engineer, Chef jobs</td>
                </tr>
                <tr>
                  <td><code>3</code></td>
                  <td>Advanced buildings</td>
                </tr>
                <tr>
                  <td><code>4</code></td>
                  <td>Doctor, Teacher jobs</td>
                </tr>
                <tr>
                  <td><code>5+</code></td>
                  <td>Pilot, Lawyer, special events</td>
                </tr>
              </tbody>
            </table>

            <h3>Evolution Timer</h3>
            <p>
              The evolution timer shows when the next evolution will occur. When ready, you can manually 
              trigger evolution or wait for it to happen automatically.
            </p>
          </section>

          <section id="npcs" className="docs-section">
            <h2>NPCs & Chat System</h2>
            <h3>AI-Generated NPCs</h3>
            <p>
              NPCs (Non-Player Characters) are <strong>automatically generated by AI</strong> during city evolution. 
              Each NPC has:
            </p>
            <ul>
              <li><strong>Name & Personality:</strong> Unique traits generated by GPT</li>
              <li><strong>Job:</strong> Assigned role in the city</li>
              <li><strong>Location:</strong> Workplace and home building</li>
              <li><strong>Mood:</strong> Current emotional state</li>
              <li><strong>Backstory:</strong> AI-generated history</li>
            </ul>

            <h3>Chatting with NPCs</h3>
            <p>
              You can <strong>chat with any NPC</strong> using AI-powered conversations. NPCs remember context 
              and respond based on their personality and the current game state.
            </p>
            <div className="info-box">
              <h4>Chat Features:</h4>
              <ul>
                <li>Natural language conversations</li>
                <li>Context-aware responses</li>
                <li>Personality-driven dialogue</li>
                <li>Game state integration</li>
              </ul>
            </div>

            <h3>NPC Behavior</h3>
            <p>
              NPCs have <strong>AI-powered behaviors</strong> that evolve over time. They make decisions, 
              have routines, and interact with the city dynamically.
            </p>
          </section>

          <section id="events" className="docs-section">
            <h2>AI Events</h2>
            <h3>Event System</h3>
            <p>
              <strong>AI-generated events</strong> occur randomly and affect the entire city. Events can be 
              positive, negative, or neutral.
            </p>

            <h3>Event Types</h3>
            <ul>
              <li><strong>Festival:</strong> City-wide celebration (positive effects)</li>
              <li><strong>Disaster:</strong> Natural or man-made crisis (negative effects)</li>
              <li><strong>Challenge:</strong> City-wide task to complete</li>
              <li><strong>Positive Event:</strong> Boosts to economy or growth</li>
            </ul>

            <h3>Event Effects</h3>
            <p>Events can modify:</p>
            <ul>
              <li>Coin generation rates</li>
              <li>Building construction speed</li>
              <li>NPC happiness</li>
              <li>Quest availability</li>
              <li>Job opportunities</li>
            </ul>

            <h3>Generating Events</h3>
            <p>
              You can manually generate events using the "Generate Event" button. Events are AI-created 
              based on current city state and evolution level.
            </p>
          </section>

          <section id="economy" className="docs-section">
            <h2>Economy System</h2>
            <h3>Central Bank</h3>
            <p>
              The game uses a <strong>central bank wallet</strong> that holds all reward tokens. This wallet:
            </p>
            <ul>
              <li>Distributes tokens to players as rewards</li>
              <li>Is configured via the server's `.env` file</li>
              <li>Must hold the game's SPL token to function</li>
              <li>All transactions are on-chain and verifiable</li>
            </ul>

            <h3>Token Distribution</h3>
            <div className="info-box">
              <h4>Reward Sources:</h4>
              <ul>
                <li><strong>Jobs:</strong> Working earns tokens based on job type and level</li>
                <li><strong>Quests:</strong> Completing quests rewards tokens</li>
                <li><strong>Events:</strong> Some events provide bonus tokens</li>
              </ul>
            </div>

            <h3>Economy Status</h3>
            <p>
              The AI Economy panel shows:
            </p>
            <ul>
              <li>Total coins in the system</li>
              <li>Distributed coins (sent to players)</li>
              <li>Remaining coins (in central bank)</li>
              <li>Economic trends and predictions</li>
            </ul>
          </section>

          <section id="rewards" className="docs-section">
            <h2>Rewards System</h2>
            <h3>How Rewards Work</h3>
            <p>
              <strong>All rewards are real Solana SPL tokens</strong> sent directly to your connected wallet. 
              No fake currency or points - everything is on-chain and verifiable.
            </p>

            <h3>Reward Sources</h3>
            <div className="rewards-grid">
              <div className="reward-card">
                <h4>💼 Jobs</h4>
                <p><strong>Formula:</strong> <code>coinsPerWork × playerLevel</code></p>
                <p><strong>Example:</strong> Merchant (20 coins) at Level 3 = 60 tokens per work</p>
                <p><strong>Cooldown:</strong> 5 minutes</p>
                <p><strong>Daily Limit:</strong> 50 works</p>
              </div>
              <div className="reward-card">
                <h4>🎯 Quests</h4>
                <p><strong>Range:</strong> 50-200+ tokens per quest</p>
                <p><strong>Scales with:</strong> Quest difficulty and player level</p>
                <p><strong>Cooldown:</strong> 5 minutes</p>
                <p><strong>Daily Limit:</strong> 10 quests</p>
              </div>
              <div className="reward-card">
                <h4>🎉 Events</h4>
                <p><strong>Type:</strong> Bonus rewards during special events</p>
                <p><strong>Amount:</strong> Varies by event type</p>
                <p><strong>Frequency:</strong> Random or manually generated</p>
              </div>
            </div>

            <h3>Transaction Verification</h3>
            <p>
              Every reward transaction includes:
            </p>
            <ul>
              <li><strong>Transaction Signature:</strong> Unique Solana transaction ID</li>
              <li><strong>Verification Links:</strong> View on Solscan and Solana Explorer</li>
              <li><strong>Amount:</strong> Exact token amount sent</li>
              <li><strong>Timestamp:</strong> When the transaction occurred</li>
            </ul>

            <h3>Token Account Creation</h3>
            <p>
              If your wallet doesn't have a token account for the game token yet, it will be 
              <strong>automatically created</strong> when you receive your first reward. The central bank 
              pays for account creation, so you don't need SOL upfront.
            </p>
          </section>

          <section id="ai-features" className="docs-section">
            <h2>AI Features</h2>
            <h3>AI-Powered Systems</h3>
            <p>DegenWorld uses OpenAI's GPT-3.5-turbo for multiple game systems:</p>

            <h3>1. AI Riddles</h3>
            <ul>
              <li>Generated for each job application</li>
              <li>Related to the specific job type</li>
              <li>Medium difficulty, solvable but challenging</li>
              <li>AI verifies answers (handles synonyms and variations)</li>
            </ul>

            <h3>2. AI Quests</h3>
            <ul>
              <li>Personalized based on your level and progress</li>
              <li>Dynamic objectives and rewards</li>
              <li>Context-aware quest generation</li>
            </ul>

            <h3>3. AI NPCs</h3>
            <ul>
              <li>Unique personalities and backstories</li>
              <li>Natural language conversations</li>
              <li>Context-aware responses</li>
              <li>Behavioral patterns and routines</li>
            </ul>

            <h3>4. AI Events</h3>
            <ul>
              <li>Random city-wide events</li>
              <li>Dynamic effects on gameplay</li>
              <li>Narrative-driven event descriptions</li>
            </ul>

            <h3>5. AI City Planning</h3>
            <ul>
              <li>Suggestions for city improvements</li>
              <li>Optimization recommendations</li>
              <li>Strategic building placement ideas</li>
            </ul>

            <h3>6. AI Economy Analysis</h3>
            <ul>
              <li>Economic trend predictions</li>
              <li>Market analysis</li>
              <li>Investment recommendations</li>
            </ul>
          </section>

          <section id="anti-farming" className="docs-section">
            <h2>Anti-Farming Measures</h2>
            <h3>Protection Systems</h3>
            <p>
              To ensure fair gameplay and prevent abuse, DegenWorld implements several anti-farming measures:
            </p>

            <h3>Job System Limits</h3>
            <div className="info-box">
              <ul>
                <li><strong>Cooldown:</strong> 5 minutes between work sessions</li>
                <li><strong>Daily Limit:</strong> Maximum 50 work sessions per 24 hours</li>
                <li><strong>Reset:</strong> Daily limit resets at midnight (your timezone)</li>
              </ul>
            </div>

            <h3>Quest System Limits</h3>
            <div className="info-box">
              <ul>
                <li><strong>Cooldown:</strong> 5 minutes between quest generation</li>
                <li><strong>Daily Limit:</strong> Maximum 10 quests per 24 hours</li>
                <li><strong>Reset:</strong> Daily limit resets at midnight (your timezone)</li>
              </ul>
            </div>

            <h3>Riddle System</h3>
            <ul>
              <li>Each job application requires solving a unique riddle</li>
              <li>Riddles expire after 10 minutes</li>
              <li>AI verification prevents automated solving</li>
            </ul>

            <h3>Why These Limits?</h3>
            <p>
              These measures ensure:
            </p>
            <ul>
              <li>Fair distribution of rewards</li>
              <li>Prevention of bot farming</li>
              <li>Sustainable token economy</li>
              <li>Better gameplay experience for all players</li>
            </ul>
          </section>

          <section id="progression" className="docs-section">
            <h2>Player Progression</h2>
            <h3>Leveling System</h3>
            <p>
              Players level up by earning <strong>Experience Points (XP)</strong>:
            </p>
            <ul>
              <li><strong>XP per Work:</strong> Varies by job (5-30 XP)</li>
              <li><strong>XP per Quest:</strong> 25-100+ XP based on difficulty</li>
              <li><strong>Level Up:</strong> Every 100 XP = +1 level</li>
              <li><strong>Level Benefits:</strong> Higher levels = more coins per work</li>
            </ul>

            <h3>Stats Tracking</h3>
            <p>Your player stats include:</p>
            <ul>
              <li><strong>Coins:</strong> Total tokens earned</li>
              <li><strong>Level:</strong> Current player level</li>
              <li><strong>Experience:</strong> Total XP accumulated</li>
              <li><strong>Current Job:</strong> Your assigned job</li>
              <li><strong>Daily Works:</strong> Work sessions completed today</li>
              <li><strong>Daily Quests:</strong> Quests completed today</li>
            </ul>
          </section>

          <section id="map" className="docs-section">
            <h2>Map & City View</h2>
            <h3>3D City Map</h3>
            <p>
              The game features a <strong>3D interactive map</strong> showing your evolving city:
            </p>
            <ul>
              <li><strong>Buildings:</strong> Color-coded by type (purple=residential, green=education, red=industry)</li>
              <li><strong>Roads:</strong> Connect buildings automatically</li>
              <li><strong>Shops:</strong> Commercial establishments</li>
              <li><strong>Interactive:</strong> Click buildings to see details</li>
            </ul>

            <h3>Map Controls</h3>
            <ul>
              <li><strong>Rotate:</strong> Click and drag</li>
              <li><strong>Zoom:</strong> Mouse wheel or zoom buttons</li>
              <li><strong>Pan:</strong> Right-click and drag</li>
              <li><strong>Reset:</strong> Use the reset camera button</li>
            </ul>

            <h3>Building Information</h3>
            <p>
              Click any building to see:
            </p>
            <ul>
              <li>Building type and level</li>
              <li>Construction date</li>
              <li>Assigned NPCs (if any)</li>
              <li>Upgrade options (future feature)</li>
            </ul>
          </section>

          <section id="technical" className="docs-section">
            <h2>Technical Details</h2>
            <h3>Blockchain</h3>
            <ul>
              <li><strong>Network:</strong> Solana Mainnet</li>
              <li><strong>Token Standard:</strong> SPL Token</li>
              <li><strong>Transactions:</strong> All rewards are on-chain</li>
              <li><strong>RPC:</strong> Configurable (default: Helius)</li>
            </ul>

            <h3>Game State</h3>
            <p>
              Game state is stored locally on the server in JSON format. This includes:
            </p>
            <ul>
              <li>All buildings, roads, and shops</li>
              <li>Player data and stats</li>
              <li>NPCs and their properties</li>
              <li>Active events and quests</li>
              <li>Evolution level and timestamps</li>
            </ul>

            <h3>API Endpoints</h3>
            <div className="code-block">
              <div style={{ marginBottom: '12px' }}>
                <code style={{ color: '#50fa7b' }}>GET</code> <code>/api/game/state</code>
                <p style={{ margin: '4px 0 0 0', color: '#888', fontSize: '0.85rem' }}>Get current game state</p>
              </div>
              <div style={{ marginBottom: '12px' }}>
                <code style={{ color: '#50fa7b' }}>GET</code> <code>/api/wallet/verify</code>
                <p style={{ margin: '4px 0 0 0', color: '#888', fontSize: '0.85rem' }}>Verify wallet and token</p>
              </div>
              <div style={{ marginBottom: '12px' }}>
                <code style={{ color: '#ffb86c' }}>POST</code> <code>/api/jobs/apply</code>
                <p style={{ margin: '4px 0 0 0', color: '#888', fontSize: '0.85rem' }}>Apply for a job</p>
              </div>
              <div style={{ marginBottom: '12px' }}>
                <code style={{ color: '#ffb86c' }}>POST</code> <code>/api/jobs/work</code>
                <p style={{ margin: '4px 0 0 0', color: '#888', fontSize: '0.85rem' }}>Work your job</p>
              </div>
              <div style={{ marginBottom: '12px' }}>
                <code style={{ color: '#ffb86c' }}>POST</code> <code>/api/ai/quests/generate</code>
                <p style={{ margin: '4px 0 0 0', color: '#888', fontSize: '0.85rem' }}>Generate a quest</p>
              </div>
              <div style={{ marginBottom: '12px' }}>
                <code style={{ color: '#ffb86c' }}>POST</code> <code>/api/ai/quests/complete</code>
                <p style={{ margin: '4px 0 0 0', color: '#888', fontSize: '0.85rem' }}>Complete a quest</p>
              </div>
              <div>
                <code style={{ color: '#ffb86c' }}>POST</code> <code>/api/evolution/trigger</code>
                <p style={{ margin: '4px 0 0 0', color: '#888', fontSize: '0.85rem' }}>Trigger evolution</p>
              </div>
            </div>
          </section>

          <section id="faq" className="docs-section">
            <h2>Frequently Asked Questions</h2>
            
            <div className="faq-item">
              <h3>Q: Do I need SOL to play?</h3>
              <p>
                <strong>A:</strong> You need a small amount of SOL for transaction fees, but the central bank 
                pays for token account creation. Most actions don't require SOL from you.
              </p>
            </div>

            <div className="faq-item">
              <h3>Q: How do I get the required token?</h3>
              <p>
                <strong>A:</strong> The token address is shown during wallet verification. You need to acquire 
                the token from a DEX (like Raydium or Jupiter) or receive it from another player.
              </p>
            </div>

            <div className="faq-item">
              <h3>Q: Why can't I work more than 50 times per day?</h3>
              <p>
                <strong>A:</strong> This is an anti-farming measure to ensure fair gameplay and prevent abuse. 
                The limit resets daily at midnight.
              </p>
            </div>

            <div className="faq-item">
              <h3>Q: Are rewards real tokens?</h3>
              <p>
                <strong>A:</strong> Yes! All rewards are real SPL tokens sent directly to your Solana wallet. 
                You can verify every transaction on Solscan or Solana Explorer.
              </p>
            </div>

            <div className="faq-item">
              <h3>Q: What happens if I disconnect my wallet?</h3>
              <p>
                <strong>A:</strong> Your progress is saved. Just reconnect with the same wallet to continue 
                where you left off.
              </p>
            </div>

            <div className="faq-item">
              <h3>Q: How often does the city evolve?</h3>
              <p>
                <strong>A:</strong> Every 10 minutes automatically, or you can trigger it manually when the 
                timer reaches zero.
              </p>
            </div>

            <div className="faq-item">
              <h3>Q: Can I have multiple jobs?</h3>
              <p>
                <strong>A:</strong> No, you can only have one job at a time. You can switch jobs by applying 
                for a new one (requires solving a new riddle).
              </p>
            </div>

            <div className="faq-item">
              <h3>Q: What if I fail a riddle?</h3>
              <p>
                <strong>A:</strong> You can request a new riddle and try again. There's no limit on attempts, 
                but each attempt requires solving a new riddle.
              </p>
            </div>
          </section>

          <section id="support" className="docs-section">
            <h2>Support & Resources</h2>
            <p>
              For issues, questions, or feedback:
            </p>
            <ul>
              <li>Check the console for detailed transaction logs</li>
              <li>Verify your wallet has the required token</li>
              <li>Ensure you have a stable internet connection</li>
              <li>Check that Phantom wallet is properly installed</li>
            </ul>

            <h3>Transaction Verification</h3>
            <p>
              All reward transactions can be verified on:
            </p>
            <ul>
              <li><a href="https://solscan.io" target="_blank" rel="noopener noreferrer">Solscan</a></li>
              <li><a href="https://explorer.solana.com" target="_blank" rel="noopener noreferrer">Solana Explorer</a></li>
            </ul>
          </section>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Documentation;

