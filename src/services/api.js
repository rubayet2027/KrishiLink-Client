import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Crops API
export const cropsAPI = {
  // Get all crops with optional filters
  getAll: (params = {}) => api.get('/crops', { params }),
  
  // Get single crop by ID
  getById: (id) => api.get(`/crops/${id}`),
  
  // Create new crop (requires auth)
  create: (data) => api.post('/crops', data),
  
  // Update crop (requires auth)
  update: (id, data) => api.put(`/crops/${id}`, data),
  
  // Delete crop (requires auth)
  delete: (id) => api.delete(`/crops/${id}`),
  
  // Get crops by user email
  getByUser: (email) => api.get(`/crops/user/${email}`),
  
  // Search crops
  search: (query) => api.get('/crops/search', { params: { q: query } }),
};

// Interests API
export const interestsAPI = {
  // Submit interest for a crop
  submit: (data) => api.post('/interests', data),
  
  // Get interests for a specific crop (owner only)
  getByCrop: (cropId) => api.get(`/interests/crop/${cropId}`),
  
  // Get interests submitted by user
  getByUser: (email) => api.get(`/interests/user/${email}`),
  
  // Check if user has already submitted interest
  checkSubmitted: (cropId, email) => api.get(`/interests/check/${cropId}/${email}`),
  
  // Update interest status (owner only)
  updateStatus: (id, status) => api.patch(`/interests/${id}`, { status }),
};

// Users API
export const usersAPI = {
  // Create or update user
  saveUser: (data) => api.post('/users', data),
  
  // Get user by email
  getByEmail: (email) => api.get(`/users/${email}`),
  
  // Update user profile
  update: (email, data) => api.put(`/users/${email}`, data),
};

export default api;
