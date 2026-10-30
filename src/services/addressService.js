// src/services/addressService.js
import api from './api';

// ពិនិត្យមើលថាតើបើកដំណើរការ Mock Mode ដែរឬទេ
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

export const addressService = {
  // យកបញ្ជីអាសយដ្ឋានទាំងអស់របស់ User
  getAddresses: async () => {
    if (USE_MOCK) {
      const saved = localStorage.getItem('mock_addresses');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { return []; }
      }
      return [
        { id: 1, name: 'ម៉ា នី', phone: '012345678', street: 'ផ្ទះលេខ ១២៣, ផ្លូវ ២០០១', city: 'ភ្នំពេញ', is_default: true }
      ];
    } else {
      const response = await api.get('/addresses');
      return response.data;
    }
  },

  // បន្ថែមអាសយដ្ឋានថ្មី
  createAddress: async (addressData) => {
    if (USE_MOCK) {
      const saved = localStorage.getItem('mock_addresses');
      let addresses = saved ? JSON.parse(saved) : [];
      
      const newAddress = { 
        id: Date.now(), 
        ...addressData, 
        is_default: addressData.is_default || addresses.length === 0 
      };

      if (newAddress.is_default) {
        addresses.forEach(item => item.is_default = false);
      }

      addresses.push(newAddress);
      localStorage.setItem('mock_addresses', JSON.stringify(addresses));
      return { data: newAddress };
    } else {
      const response = await api.post('/addresses', addressData);
      return response.data;
    }
  },

  // កែប្រែអាសយដ្ឋាន
  updateAddress: async (addressId, addressData) => {
    if (USE_MOCK) {
      const saved = localStorage.getItem('mock_addresses');
      let addresses = saved ? JSON.parse(saved) : [];

      if (addressData.is_default) {
        addresses.forEach(item => item.is_default = false);
      }

      const index = addresses.findIndex(item => item.id === addressId || item.address_id === addressId);
      if (index !== -1) {
        addresses[index] = { ...addresses[index], ...addressData };
        localStorage.setItem('mock_addresses', JSON.stringify(addresses));
        return { data: addresses[index] };
      }
      throw new Error('Address not found');
    } else {
      const response = await api.put(`/addresses/${addressId}`, addressData);
      return response.data;
    }
  },

  // លុបអាសយដ្ឋាន
  deleteAddress: async (addressId) => {
    if (USE_MOCK) {
      const saved = localStorage.getItem('mock_addresses');
      let addresses = saved ? JSON.parse(saved) : [];
      
      addresses = addresses.filter(item => item.id !== addressId && item.address_id !== addressId);
      localStorage.setItem('mock_addresses', JSON.stringify(addresses));
      return { success: true };
    } else {
      const response = await api.delete(`/addresses/${addressId}`);
      return response.data;
    }
  },
};