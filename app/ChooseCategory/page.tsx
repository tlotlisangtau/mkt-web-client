// pages/categories.tsx
import React from 'react';
import CategorySelection from '../../components/CategoryList';
import CategoryForm from '../../components/CategoryList';

const CategoriesPage: React.FC = () => {
  return (
    <div className="categories-page">
      <CategoryForm />
    </div>
  );
};


export default CategoriesPage;
