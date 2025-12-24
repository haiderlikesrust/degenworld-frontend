import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getGameState = async () => {
  const response = await api.get('/game/state');
  return response.data;
};

export const initializeGame = async (tokenContractAddress) => {
  const response = await api.post('/game/initialize', {
    tokenContractAddress,
  });
  return response.data;
};

export const verifyWallet = async (walletAddress) => {
  const response = await api.get('/wallet/verify', {
    params: { walletAddress },
  });
  return response.data;
};

export const getAvailableJobs = async () => {
  const response = await api.get('/jobs');
  return response.data;
};

export const applyForJob = async (walletAddress, jobId, riddlePassed = false) => {
  const response = await api.post('/jobs/apply', {
    walletAddress,
    jobId,
    riddlePassed
  });
  return response.data;
};

export const workJob = async (walletAddress) => {
  const response = await api.post('/jobs/work', {
    walletAddress,
  });
  return response.data;
};

export const getNPCs = async () => {
  const response = await api.get('/npcs');
  return response.data;
};

export const generateNPCs = async (count = 5) => {
  const response = await api.post('/npcs/generate', { count });
  return response.data;
};

export const getEvolutionStatus = async () => {
  const response = await api.get('/evolution/status');
  return response.data;
};

export const triggerEvolution = async () => {
  const response = await api.post('/evolution/trigger');
  return response.data;
};

export const getEvolutionSuggestions = async () => {
  const response = await api.get('/evolution/suggestions');
  return response.data;
};

// AI Features
export const generateEvent = async () => {
  const response = await api.post('/ai/events/generate');
  return response.data;
};

export const getEvents = async () => {
  const response = await api.get('/ai/events');
  return response.data;
};

export const getActiveEvents = async () => {
  const response = await api.get('/ai/events/active');
  return response.data;
};

export const generateQuest = async (walletAddress) => {
  const response = await api.post('/ai/quests/generate', { walletAddress });
  return response.data;
};

export const getQuests = async (walletAddress) => {
  const response = await api.get('/ai/quests', { params: { walletAddress } });
  return response.data;
};

export const completeQuest = async (questId, walletAddress) => {
  const response = await api.post('/ai/quests/complete', { questId, walletAddress });
  return response.data;
};

export const chatWithNPC = async (npcId, message) => {
  const response = await api.post('/ai/chat', { npcId, message });
  return response.data;
};

export const getPlanningSuggestions = async () => {
  const response = await api.get('/ai/planning/suggestions');
  return response.data;
};

export const getEconomyStatus = async () => {
  const response = await api.get('/ai/economy/status');
  return response.data;
};

export const updateNPCBehaviors = async () => {
  const response = await api.post('/ai/npcs/behaviors/update');
  return response.data;
};

export const getNPCBehavior = async (npcId) => {
  const response = await api.get(`/ai/npcs/${npcId}/behavior`);
  return response.data;
};

// Central Bank & Riddles
export const verifyCentralBank = async () => {
  const response = await api.get('/central-bank/verify');
  return response.data;
};

export const getJobRiddle = async (jobId, walletAddress) => {
  const response = await api.get('/jobs/' + jobId + '/riddle', {
    params: { walletAddress }
  });
  return response.data;
};

export const submitRiddleAnswer = async (jobId, walletAddress, answer) => {
  const response = await api.post('/jobs/riddle/answer', {
    jobId,
    walletAddress,
    answer
  });
  return response.data;
};

