import axios from 'axios';

export const getProducts = async () => {
  const response = await axios.get('http://localhost:8000/api/products/'); // Update this URL if needed
  return response.data;
};
