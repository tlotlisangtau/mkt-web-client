// components/CategoryList.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { getCategories } from '../services/categoryService';

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {categories.map((category: any) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
