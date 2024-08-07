'use client';

import React, { useEffect, useState } from 'react';
import { getCategories } from '../services/categoryService';

const Categorysection: React.FC = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const categoryIcons: { [key: string]: string } = {
    'Furniture': 'fa fa-bed',
    'Jobs': 'fa fa-briefcase',
    'Sports': 'fa fa-futbol-o',
    'Electronics': 'fa fa-laptop',
    'Health & Beauty': 'fa fa-heart',
    'Real Estate': 'fa fa-house',
  };

  return (
    <section className="w3l-category-main">
      <div className="categories-sec">
        <div className="wrapper">
          <h3 className="title-main">Popular Categories</h3>
          <div className="right-models text-center">
            <div className="d-grid grid-sec">
              {categories.map((category: any) => (
                <a href={`product_${category.id}`} key={category.id}>
                  <div className="card">
                    <div className="card-body">
                      <span className={categoryIcons[category.name] || 'fa fa-bed'}></span>
                      <h5 className="card-title mt-4">{category.name}</h5>
                      <p className="para-design">{category.ads_posted} Ads Posted</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categorysection;
