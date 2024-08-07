'use client';

import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/productService';
import '../styles/globals.css';
import '../styles/style.css';

const ProductsList: React.FC = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map((product: any) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsList;
