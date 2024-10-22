'use client';

import React, { useEffect, useState } from 'react';
import { getCategories, getCategoryCounts } from '../services/categoryService';

const Categorysection: React.FC = () => {
  const [categories, setCategories] = useState([]);
  const [categoryCounts, setCategoryCounts] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await getCategories();
        const countsData = await getCategoryCounts();
        setCategories(categoriesData);
        setCategoryCounts(countsData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);

  const categoryIcons: { [key: string]: string } = {
    'Furniture': 'fa fa-bed',
    'Jobs': 'fa fa-briefcase',
    'Sports': 'fa fa-futbol-o',
    'Electronics': 'fa fa-laptop',
    'Automotives': 'fa fa-car',
    'Others': 'fa fa-house',
  };

  const getAdsPostedText = (categoryName: string) => {
    const count = categoryCounts[categoryName.toLowerCase().replace(/ & /g, '_').replace(/ /g, '_')] || 0;
    return `${count} Ads Posted`;
  };

  return (
    <section className="w3l-category-main">
      <div className="categories-sec">
        <div className="wrapper">
          <h3 className="title-main">Popular Categories</h3>
          <div className="right-models text-center">
            <div className="d-grid grid-sec">
              {categories.map((category: any) => (
                <a
                  href={`/category/${category.name
                    .toLowerCase()
                    .replace(/[^a-zA-Z]/g, "")}`}
                  key={category.id}
                >
                  <div className="card">
                    <div className="card-body">
                      <span
                        className={categoryIcons[category.name] || "fa fa-bed"}
                      ></span>
                      <h5 className="card-title mt-4">{category.name}</h5>
                      <p className="para-design">
                        {getAdsPostedText(category.name)}
                      </p>
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
