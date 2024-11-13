"use client";
import React, { useEffect, useState } from "react";
import "@/styles/User.css"; // Importing global CSS

// Define the Product type
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  salary: string;
  image_urls: string[];
  category_id: number;
}

// Define the type for products grouped by category
interface ProductsByCategory {
  [categoryName: string]: Product[];
}

// Utility to truncate long descriptions
const truncateDescription = (description: string, maxLength: number) =>
  description.length > maxLength ? description.substring(0, maxLength) + "..." : description;

const User: React.FC = () => {
  const [productsByCategory, setProductsByCategory] = useState<ProductsByCategory>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://127.0.0.1:8000/api/api/user/1/products/");
        if (!response.ok) throw new Error("Network response was not ok");
    
        const data = await response.json();
        console.log("Fetched Data:", data); // The structure is already grouped by category
    
        // Directly set the grouped data to state
        setProductsByCategory(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container">
      {Object.entries(productsByCategory).map(([categoryName, products]) => (
        <div key={categoryName} className="category">
          <h2 className="categoryName">{categoryName}</h2>
          <div className="productList">
            {products.map((product) => (
              <div key={product.id} className="productCard">
                <img
                  src={product.image_urls[0] || "placeholder.jpg"}
                  alt={product.name}
                  className="productImage"
                />
                <h3 className="productName">{product.name}</h3>
                <p className="productDescription">
                  {truncateDescription(product.description, 50)}
                </p>
                <p className="productPrice">R {product.price ||product.salary }</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default User;
