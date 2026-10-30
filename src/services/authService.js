// src/services/authService.js
import api from './api';

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

export const authService = {
  // ការចូលគណនី (Login)
  login: async (credentials) => {
    if (USE_MOCK) {
      // Mock Login
      const mockToken = 'mock-jwt-token-12345';
      localStorage.setItem('token', mockToken);
      return { token: mockToken, user: { name: 'Admin User', email: credentials.email } };
    } else {
      const response = await api.post('/auth/login', credentials);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    }
  },

  // ចុះឈ្មោះ (Register)
  register: async (userData) => {
    if (USE_MOCK) {
      return { message: 'Register successful (Mock)', user: userData };
    } else {
      const response = await api.post('/auth/register', userData);
      return response.data;
    }
  },

  // ចាកចេញ (Logout)
  logout: () => {
    localStorage.removeItem('token');
  },
};