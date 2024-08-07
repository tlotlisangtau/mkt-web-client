"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Product = {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: string;
    type: string;
    location: string;
    condition: string;
    brand: string;
    color: string;
    size: string;
    other_feature1: string;
    other_feature2: string;
    image_url: string | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    category: number;
};

const Products: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/products/8/');
                // Convert single product object to an array
                setProducts([response.data]);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <h1>Products</h1>
            <div className="product-grid">
                {products.map((product) => (
                    <div key={product.id} className="product-card">
                        <img src={product.image_url ?? ''} alt={product.name} className="product-image" />
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <p>Price: ${product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;
