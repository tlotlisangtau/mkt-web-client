"use client";

import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/productService';
import { getPromotions } from '../services/promotionService';
import '../styles/style.css'

// Utility function to format date as D-M-Y
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

// Utility function to filter promotions ending in less than 3 days
const isEndingSoon = (endDateString: string) => {
  const now = new Date();
  const endDate = new Date(endDateString);
  const timeDiff = endDate.getTime() - now.getTime(); 
  const daysDiff = timeDiff / (1000 * 3600 * 24);
  return daysDiff <= 3;
};

const Products4Block: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [promotions, setPromotions] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    const fetchPromotions = async () => {
      try {
        const data = await getPromotions();
        setPromotions(data);
      } catch (error) {
        console.error('Failed to fetch promotions:', error);
      }
    };

    fetchProducts();
    fetchPromotions();
  }, []);

  const endingSoonPromotions = promotions.filter((promotion) =>
    isEndingSoon(promotion.end_date)
  );

  return (
    <div className="w3l-products-4">
      <div id="products4-block" className="text-center">
        <div className="wrapper">
          <input id="tab1" type="radio" name="tabs" defaultChecked />
          <label className="tabtle" htmlFor="tab1">Latest Ads</label>

          <input id="tab2" type="radio" name="tabs" />
          <label className="tabtle" htmlFor="tab2">Featured Ads</label>

          <input id="tab3" type="radio" name="tabs" />
          <label className="tabtle" htmlFor="tab3">Ending Soon</label>

          <section id="content1" className="tab-content text-left">
            <div className="d-grid grid-col-3">
              {products.map((product) => (
                <div className="product" key={product.id}>
                  <a href={`product-${product.id}.html`}>
                    <img src={product.image_url || '/Images/c1.jpg'} className="img-responsive" alt={product.name} />
                  </a>
                  <div className="info-bg">
                    <h5><a href={`product-${product.id}.html`}>{product.name}</a></h5>
                    <p>{product.description}</p>
                    <ul className="d-flex">
                      <li><span className="fa fa-usd"></span> {product.price}</li>
                      <li className="margin-effe"><a href="#fav" title="Add this to Favorite"><span className="fa fa-heart-o"></span></a></li>
                      <li><a href="#share" title="Share"><span className="fa fa-share"></span></a></li>
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="content2" className="tab-content text-left">
            <div className="d-grid grid-col-3">
              {promotions.map((promotion) => (
                <div className="product" key={promotion.id}>
                  <div className="product-image-wrapper">
                  <a href={`promotion-${promotion.id}.html`}>
                    <img src={promotion.image_url || '/Images/c2.jpg'} className="img-responsive" alt={`Promotion ${promotion.id}`} />
                  </a>
                </div>
                  <div className="info-bg">
                    <h5><a href={`promotion-${promotion.id}.html`}>Promotion {promotion.id}</a></h5>
                    <p>Price: {promotion.price}</p>
                    <p>End Date: {formatDate(promotion.end_date)}</p>
                    <ul className="d-flex">
                      <li><span className="fa fa-usd"></span> {promotion.price}</li>
                      <li className="margin-effe"><a href="#fav" title="Add this to Favorite"><span className="fa fa-heart-o"></span></a></li>
                      <li><a href="#share" title="Share"><span className="fa fa-share"></span></a></li>
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="content3" className="tab-content text-left">
            <div className="d-grid grid-col-3">
              {endingSoonPromotions.map((promotion) => (
                <div className="product" key={promotion.id}>
                  <a href={`promotion-${promotion.id}.html`}>
                    <img src={promotion.image_url || '/Images/c3.jpg'} className="product-image" alt={`Promotion ${promotion.id}`} />
                  </a>
                  <div className="info-bg">
                    <h5><a href={`promotion-${promotion.id}.html`}>Promotion {promotion.id}</a></h5>
                    <p>Price: {promotion.price}</p>
                    <p>End Date: {formatDate(promotion.end_date)}</p>
                    <ul className="d-flex">
                      <li><span className="fa fa-usd"></span> {promotion.price}</li>
                      <li className="margin-effe"><a href="#fav" title="Add this to Favorite"><span className="fa fa-heart-o"></span></a></li>
                      <li><a href="#share" title="Share"><span className="fa fa-share"></span></a></li>
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Products4Block;
