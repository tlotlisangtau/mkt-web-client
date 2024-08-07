// components/Product.tsx
'use client';

import React from 'react';

interface ProductProps {
  id: number;
  name: string;
  price: number;
}

const Product: React.FC<ProductProps> = ({ id, name, price, }) => {
  return (
    <div className="border rounded-lg shadow-lg p-4 m-4">
      <h2 className="text-lg font-semibold mt-4">{name}</h2>
      <p className="text-gray-700">${price.toFixed(2)}</p>
      <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">Add to Cart</button>
    </div>
  );
};

export default Product;
