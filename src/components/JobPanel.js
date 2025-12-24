import React, { useState, useEffect } from 'react';
import { getAvailableJobs, applyForJob, workJob, getJobRiddle, submitRiddleAnswer } from '../services/api';
import './JobPanel.css';

function JobPanel({ walletAddress, player, onUpdate }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [working, setWorking] = useState(false);
  const [message, setMessage] = useState(null);
  const [showRiddle, setShowRiddle] = useState(false);
  const [currentRiddle, setCurrentRiddle] = useState(null);
  const [riddleAnswer, setRiddleAnswer] = useState('');
  const [submittingRiddle, setSubmittingRiddle] = useState(false);
  const [applyingJobId, setApplyingJobId] = useState(null);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const availableJobs = await getAvailableJobs();
      setJobs(availableJobs);
      setLoading(false);
    } catch (error) {
      console.error('Error loading jobs:', error);
      setLoading(false);
    }
  };

  const handleApply = async (jobId) => {
    if (!walletAddress) {
      setMessage({ type: 'error', text: 'Please connect your wallet first' });
      setTimeout(() => setMessage(null), 3000);
      return;
    }

    setApplyingJobId(jobId);
    setShowRiddle(true);
    setRiddleAnswer('');
    
    try {
      const riddleData = await getJobRiddle(jobId, walletAddress);
      setCurrentRiddle({
        ...riddleData,
        jobId
      });
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.error || 'Failed to get riddle' });
      setTimeout(() => setMessage(null), 3000);
      setShowRiddle(false);
      setApplyingJobId(null);
    }
  };

  const handleSubmitRiddle = async (e) => {
    e.preventDefault();
    if (!riddleAnswer.trim() || submittingRiddle) return;

    // Validate that we have the required data
    if (!applyingJobId) {
      setMessage({ type: 'error', text: 'Job ID is missing. Please try applying again.' });
      setShowRiddle(false);
      setCurrentRiddle(null);
      setRiddleAnswer('');
      setApplyingJobId(null);
      return;
    }

    if (!walletAddress) {
      setMessage({ type: 'error', text: 'Wallet address is missing. Please connect your wallet.' });
      return;
    }

    setSubmittingRiddle(true);
    try {
      console.log('Submitting riddle answer:', { jobId: applyingJobId, walletAddress, answer: riddleAnswer });
      const result = await submitRiddleAnswer(applyingJobId, walletAddress, riddleAnswer);
      console.log('Riddle result:', result);
      
      if (result.correct) {
        // Riddle passed, now apply for job
        try {
          console.log('Applying for job:', { walletAddress, jobId: applyingJobId, riddlePassed: true });
          const applyResult = await applyForJob(walletAddress, applyingJobId, true);
          console.log('Apply result:', applyResult);
          setMessage({ type: 'success', text: applyResult.message });
          setShowRiddle(false);
          setCurrentRiddle(null);
          setRiddleAnswer('');
          setApplyingJobId(null);
          onUpdate();
          loadJobs();
        } catch (error) {
          console.error('Error applying for job:', error);
          const errorMsg = error.response?.data?.error || error.message || 'Failed to apply for job';
          setMessage({ type: 'error', text: errorMsg });
          setTimeout(() => setMessage(null), 5000);
        }
      } else {
        setMessage({ type: 'error', text: result.message || 'Incorrect answer. Try again!' });
        // Reset riddle to get a new one
        setCurrentRiddle(null);
        setRiddleAnswer('');
      }
      setTimeout(() => setMessage(null), 5000);
    } catch (error) {
      console.error('Error submitting riddle:', error);
      const errorMsg = error.response?.data?.error || error.message || 'Failed to submit answer';
      setMessage({ type: 'error', text: errorMsg });
      setTimeout(() => setMessage(null), 5000);
    } finally {
      setSubmittingRiddle(false);
    }
  };

  const handleCancelRiddle = () => {
    setShowRiddle(false);
    setCurrentRiddle(null);
    setRiddleAnswer('');
    setApplyingJobId(null);
  };

  const handleWork = async () => {
    setWorking(true);
    try {
      const result = await workJob(walletAddress);
      let messageText = result.message;
      if (result.leveledUp) {
        messageText += ' 🎉 Level up!';
      }
      if (result.transactionSignature) {
        messageText += `\n💰 Tokens sent! TX: ${result.transactionSignature.slice(0, 8)}...${result.transactionSignature.slice(-8)}`;
        messageText += `\nView: https://solscan.io/tx/${result.transactionSignature}`;
      }
      if (result.dailyWorksRemaining !== undefined) {
        messageText += `\n📊 Daily works remaining: ${result.dailyWorksRemaining}/50`;
      }
      setMessage({ 
        type: 'success', 
        text: messageText
      });
      onUpdate();
      setTimeout(() => setMessage(null), 8000);
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.error || 'Failed to work' 
      });
      setTimeout(() => setMessage(null), 5000);
    } finally {
      setWorking(false);
    }
  };

  const currentJob = jobs.find(j => j.id === player?.currentJob);

  return (
    <div className="job-panel">
      <h3>Jobs & Work</h3>
      
      {message && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      {/* Riddle Modal */}
      {showRiddle && currentRiddle && (
        <div className="riddle-modal-overlay">
          <div className="riddle-modal">
            <h4>🧩 Job Application Riddle</h4>
            <p className="riddle-text">{currentRiddle.riddle}</p>
            {currentRiddle.hint && (
              <p className="riddle-hint">💡 Hint: {currentRiddle.hint}</p>
            )}
            <form onSubmit={handleSubmitRiddle}>
              <input
                type="text"
                value={riddleAnswer}
                onChange={(e) => setRiddleAnswer(e.target.value)}
                placeholder="Your answer..."
                className="riddle-input"
                disabled={submittingRiddle}
                autoFocus
              />
              <div className="riddle-buttons">
                <button
                  type="submit"
                  disabled={submittingRiddle || !riddleAnswer.trim()}
                  className="submit-riddle-btn"
                >
                  {submittingRiddle ? 'Checking...' : 'Submit Answer'}
                </button>
                <button
                  type="button"
                  onClick={handleCancelRiddle}
                  className="cancel-riddle-btn"
                  disabled={submittingRiddle}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {player && (
        <div className="player-stats">
          <div className="stat-item">
            <span className="stat-label">Coins:</span>
            <span className="stat-value">{player.coins || 0}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Level:</span>
            <span className="stat-value">{player.level || 1}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Experience:</span>
            <span className="stat-value">{player.experience || 0}</span>
          </div>
        </div>
      )}

      {currentJob && (
        <div className="current-job">
          <h4>Current Job: {currentJob.name}</h4>
          <p>{currentJob.description}</p>
          <p className="job-details">
            Earnings: {currentJob.coinsPerWork * (player?.level || 1)} tokens/work
          </p>
          {player?.workStats && (
            <p className="job-details" style={{ fontSize: '0.85rem', color: '#666' }}>
              Daily works: {player.workStats.dailyWorks || 0}/50
            </p>
          )}
          <button 
            onClick={handleWork} 
            disabled={working}
            className="work-btn"
          >
            {working ? 'Working...' : 'Work Now'}
          </button>
        </div>
      )}

      <div className="available-jobs">
        <h4>Available Jobs</h4>
        {loading ? (
          <div>Loading jobs...</div>
        ) : (
          <div className="jobs-list">
            {jobs.map((job) => (
              <div 
                key={job.id} 
                className={`job-card ${!job.available ? 'unavailable' : ''} ${job.id === player?.currentJob ? 'current' : ''}`}
              >
                <div className="job-header">
                  <h5>{job.name}</h5>
                  {job.id === player?.currentJob && (
                    <span className="badge">Current</span>
                  )}
                </div>
                <p className="job-description">{job.description}</p>
                <div className="job-info">
                  <span>💰 {job.coinsPerWork} coins/work</span>
                  <span>⭐ {job.experience} exp</span>
                  <span>👥 {job.currentWorkers}/{job.maxWorkers}</span>
                </div>
                {job.id !== player?.currentJob && (
                  <button
                    onClick={() => handleApply(job.id)}
                    disabled={!job.available}
                    className="apply-btn"
                  >
                    {job.available ? 'Apply (Riddle Test)' : 'Full'}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default JobPanel;
