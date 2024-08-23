'use client';

import React from 'react';
import CategoryForm from '@/components/CategoryList';
import withAuth from '@/components/withAuth';

const CategoriesPage: React.FC = () => {
  return (
    <div className="categories-page">
      <CategoryForm />
    </div>
  );
};

export default withAuth(CategoriesPage);
