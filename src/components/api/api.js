import axios from 'axios';

const API_BASE_URL = 'http://localhost:11215/api';

export const fetchCustodyServices = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/custodyServices`);
    return response.data;
  } catch (error) {
    console.error("Error fetching custody services data:", error);
    throw error;
  }
};

export const fetchProductPrices = async (productIds) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/products/prices`, { productIds });
    return response.data;
  } catch (error) {
    console.error("Error fetching product prices:", error);
    throw error;
  }
};

export const createOrders = async (orders) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/orders`, orders, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating orders:', error);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    }
    throw error;
  }
};