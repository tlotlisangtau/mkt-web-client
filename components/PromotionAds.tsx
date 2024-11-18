// components/PromotionAds.tsx

'use client';

import React, { useEffect, useState } from 'react';
import { getPromotions } from '../services/promotionService';

const PromotionAds: React.FC = () => {
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const data = await getPromotions();
        setPromotions(data);
      } catch (error) {
        console.error('Failed to fetch promotions:', error);
      }
    };

    fetchPromotions();
  }, []);

  return (
    <section className="promotions-section">
      <div className="wrapper">
        <h3 className="title-main">Promotional Ads</h3>
        <div className="promotions-grid">
          {promotions.map((promotion: any) => (
            <div className="promotion-card" key={promotion.id}>
              <div className="promotion-card-body">
                <h5 className="promotion-title mt-4">Promotion {promotion.id}</h5>
                <p className="promotion-description">Price: {promotion.price}</p>
                <p className="promotion-description">Listing: {promotion.listing}</p>
                <p className="promotion-description">User: {promotion.user}</p>
                <p className="promotion-description">Start Date: {new Date(promotion.start_date).toLocaleString()}</p>
                <p className="promotion-description">End Date: {new Date(promotion.end_date).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromotionAds;
