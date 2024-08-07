"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/globals.css';
import '../styles/style.css';
import Nav from '@/components/Nav';
import Footer from '@/components/footer';

// Define the Product type
interface Product {
  id: number;
  web_id: string;
  name: string;
  slug: string;
  description: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  category: number;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setError('Product ID is undefined');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://127.0.0.1:8000/api/products/1/`);
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Fetch error:', response.status, errorText);
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Fetched product data:', data);

        setProduct(data);
      } catch (error: any) {
        console.error('Fetch error:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <>
      <Nav />
      <section className="w3l-inner-banner-main">
        <div className="about-inner inner2">
          <div className="wrapper seen-w3">
            <ul className="breadcrumbs-custom-path">
              <li><a href="/">Home</a></li>
              <li><span className="fa fa-angle-right" aria-hidden="true"></span></li>
              <li className="active">{product ? product.name : 'Loading...'}</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="w3l-products-page w3l-blog-single w3l-products-4">
        <div className="single blog">
          <div className="wrapper">
            <h3 className="title-main">{product ? product.name : 'Loading...'}</h3>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {product && (
              <div className="product-detail">
                <div className="info-bg">
                  <h5>{product.name}</h5>
                  <p>{product.description}</p>
                  <ul className="d-flex">
                    <li><span className="fa fa-usd"></span> R24</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default ProductDetail;
