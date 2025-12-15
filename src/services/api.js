import axios from 'axios';
import { getAuth } from 'firebase/auth';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add Firebase token to authenticated requests
api.interceptors.request.use(
  async (config) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      
      if (user) {
        // Get fresh Firebase ID token
        const token = await user.getIdToken(true);
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error getting auth token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Handle 401 Unauthorized - token might be expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        
        if (user) {
          // Force refresh the token
          const newToken = await user.getIdToken(true);
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        // Optionally redirect to login
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

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
