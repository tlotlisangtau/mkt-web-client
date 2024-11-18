// services/categoryService.ts
import axiosInstance from '../utils/axiosInstance';

export const getCategories = async () => {
  try {
    const response = await axiosInstance.get('/categories');
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const getCategoryCounts = async () => {
  try {
    const response = await axiosInstance.get('/counts');
    return response.data;
  } catch (error) {
    console.error('Error fetching category counts:', error);
    throw error;
  }
};
