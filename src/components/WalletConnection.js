import React, { useState, useEffect } from 'react';
import { verifyWallet } from '../services/api';
import './WalletConnection.css';

function WalletConnection({ onConnect, walletAddress }) {
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState(null);
  const [walletInstalled, setWalletInstalled] = useState(false);
  const [connectedAddress, setConnectedAddress] = useState(null);

  useEffect(() => {
    // Check if Phantom wallet is installed
    if (typeof window !== 'undefined' && window.solana && window.solana.isPhantom) {
      setWalletInstalled(true);
    }
    
    // Check if already connected (from prop or local state)
    if (walletAddress) {
      setConnectedAddress(walletAddress);
    }
  }, [walletAddress]);

  const connectWallet = async () => {
    setConnecting(true);
    setError(null);

    try {
      if (typeof window !== 'undefined' && window.solana && window.solana.isPhantom) {
        // Request connection to Phantom wallet
        const response = await window.solana.connect();
        const walletAddress = response.publicKey.toString();
        console.log('Connected wallet:', walletAddress);

        // Verify wallet with backend
        try {
          const result = await verifyWallet(walletAddress);
          console.log('Verification result:', result);

          if (result.verified) {
            setConnectedAddress(walletAddress);
            setError(null); // Clear any previous errors
            onConnect(walletAddress, result.player);
          } else {
            const tokenAddress = result.tokenMintAddress || 'unknown';
            const balance = result.balance || '0';
            setError(`Token verification failed. Your balance: ${balance}. Required token: ${tokenAddress.slice(0, 8)}...${tokenAddress.slice(-8)}. Please check that your wallet holds this token.`);
          }
        } catch (verifyErr) {
          console.error('Verification error:', verifyErr);
          const errorMsg = verifyErr.response?.data?.error || verifyErr.message || 'Failed to verify wallet';
          setError(`Verification failed: ${errorMsg}`);
        }
      } else {
        setError('Please install Phantom wallet. Visit https://phantom.app/');
      }
    } catch (err) {
      console.error('Error connecting wallet:', err);
      if (err.code === 4001) {
        setError('User rejected the connection request.');
      } else if (err.message) {
        setError(`Connection failed: ${err.message}`);
      } else {
        setError('Failed to connect wallet. Please check console for details.');
      }
    } finally {
      setConnecting(false);
    }
  };

  const disconnectWallet = async () => {
    try {
      if (window.solana && window.solana.disconnect) {
        await window.solana.disconnect();
      }
      setConnectedAddress(null);
      setError(null);
      onConnect(null, null);
    } catch (err) {
      console.error('Error disconnecting wallet:', err);
    }
  };

  // Show connected state if we have a connected address
  const displayAddress = connectedAddress || walletAddress;
  if (displayAddress) {
    return (
      <div className="wallet-connection">
        <div className="wallet-card">
          <div className="wallet-card-header">
            <div className="wallet-card-icon">👛</div>
            <div className="wallet-card-title">
              <div className="wallet-status-badge">✓ Connected</div>
              <div className="wallet-network">Solana Mainnet</div>
            </div>
          </div>
          <div className="wallet-card-body">
            <div className="wallet-address-full">
              {displayAddress}
            </div>
            <div className="wallet-card-actions">
              <button onClick={disconnectWallet} className="disconnect-btn-card">
                Disconnect
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wallet-connection">
      <button
        onClick={connectWallet}
        disabled={connecting || !walletInstalled}
        className="connect-btn"
      >
        {connecting ? 'Connecting...' : walletInstalled ? 'Connect Phantom' : 'Install Phantom'}
      </button>
      {error && <div className="error-message">{error}</div>}
      {!walletInstalled && (
        <div className="wallet-hint">
          <a href="https://phantom.app/" target="_blank" rel="noopener noreferrer">
            Install Phantom Wallet
          </a>
        </div>
      )}
    </div>
  );
}

export default WalletConnection;
