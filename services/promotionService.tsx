// services/promotionService.ts

import axios from 'axios';

export const getPromotions = async () => {
  try {
    const response = await axios.get('http://localhost:8000/promotions/');
    return response.data;
  } catch (error) {
    throw error;
  }
};
