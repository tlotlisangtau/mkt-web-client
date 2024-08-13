"use client";
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import '../../styles/globals.css';
import '../../styles/style.css';
import Nav from '@/components/Nav';
import Footer from '@/components/footer';

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image_url: string | null;
  job_location: string;
  company: string;
  salary: string;
  valid_until: string;
}

const ProductDetail: React.FC = () => {
  const searchParams = useSearchParams();
  const productId = searchParams.get('productId');
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        setError('Product ID is missing');
        setLoading(false);
        return; 
      }

      try {
        const response = await fetch(`http://127.0.0.1:8000/api/jobs/${productId}/`); 
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Product = await response.json();
        setProduct(data);
      } catch (error: any) {
        console.error('Fetch error:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

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
            <h3 className="title-main">Product Single Ad</h3>
            <div className="grid-colunm-2 d-flex">
              <div className="tab-content text-left single-left-content left-product-sing">
                <h3 className="aside-title single-prt">{product ? product.name : 'Loading...'}</h3>
                <p className="para-single">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>

                <p>Image here</p>
                {product?.image_url ? (
                  <img src={product.image_url} alt={product.name} />
                ) : (
                  <p>Loading image...</p>
                )}
                <div className="top-sing-sec">
                  <h3 className="aside-title">Ad Details</h3>
                  {product && (
                    <div>
                      <p>{product.description}</p>
                      <ul className="d-flex">
                        <li>Price: R{product.price}</li><br />
                      </ul>
                      <ul>
                        <li>Posted: {formatDate(product.valid_until)}</li>
                      </ul>
                    </div>
                  )}

                  <h3 className="aside-title top-sec-space">Features</h3>
                  <div className="d-grid list-styles">
                    <ul className="ad-lists">
                      <li><span className="fa fa-check-circle" aria-hidden="true"></span>{product?.job_location}</li>
                      <li><span className="fa fa-check-circle" aria-hidden="true"></span>{product?.company}</li>
                      <li><span className="fa fa-check-circle" aria-hidden="true"></span>{product?.salary}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ProductDetail;
