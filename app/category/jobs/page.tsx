'use client';

import React, { useEffect, useState } from 'react';
import '../../../styles/globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/footer';
import { Carousel } from 'react-responsive-carousel'; // Correct import
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import Carousel styles

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_urls: string[];
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/jobs');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched data:', data);

        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          setError('Data format is incorrect');
        }
      } catch (error: any) {
        console.error('Fetch error:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Nav />
      <section className="w3l-inner-banner-main">
        <div className="about-inner inner2">
          <div className="wrapper seen-w3">
            <ul className="breadcrumbs-custom-path">
              <li><a href="/">Home</a></li>
              <li><span className="fa fa-angle-right" aria-hidden="true"></span></li>
              <li className="active">All Ads</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="w3l-products-page w3l-blog-single w3l-products-4">
        <div className="single blog">
          <div className="wrapper">
            <h3 className="title-main">Jobs Category</h3>
            <div className="d-grid grid-colunm-2 grid-colunm">
              <div className="right-side-bar">
                {/* Sidebar Content */}
              </div>
              <div className="tab-content text-left">
                <aside className="top-border d-flex">
                  <h3 className="aside-title mb-3">Showing 1–3 of 38 results</h3>
                  <div className="input-group-btn">
                    <select className="btn btn-default" name="ext" required>
                      <option selected>Sort By Date</option>
                      <option>Sort By Expire</option>
                      <option>Sort By Popularity</option>
                      <option>Sort By Price - Ascending</option>
                      <option>Sort By Price - Descending</option>
                    </select>
                  </div>
                </aside>
                <div className="d-grid grid-col-4">
                  {loading && <p>Loading...</p>}
                  {error && <p>Error: {error}</p>}
                  {!loading && !error && (
                    <div className="d-grid grid-col-2">
                      {products.map(product => (
                        <div className="product" key={product.id}>
                         
                            <Carousel showThumbs={false} infiniteLoop>
                              {product.image_urls.map((imageUrl, index) => (
                                <div key={index}>
                                  <img src={imageUrl} className="img-responsive" alt={`Image ${index + 1}`} />
                                </div>
                              ))}
                            </Carousel>
                          <div className="info-bg">
                            <h5><a href={`/Productdetail?productId=${product.id}`}>{product.name}</a></h5>
                            <p>{product.description}</p>
                            <ul className="d-flex">
                              <li><span className="fa fa-usd"></span> {product.price}</li>
                              <li className="margin-effe">
                                <a href="#fav" title="Add this to Favorite">
                                  <span className="fa fa-heart-o"></span>
                                </a>
                              </li>
                              <li>
                                <a href="#share" title="Share">
                                  <span className="fa fa-share"></span>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="pagination">
              <ul className="pagination-list">
                <li><a href="#">&laquo; Prev</a></li>
                <li className="active"><a href="#">1</a></li>
                <li><a href="#">2</a></li>
                <li><a href="#">3</a></li>
                <li><a href="#">4</a></li>
                <li><a href="#">5</a></li>
                <li><a href="#">Next &raquo;</a></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default ProductList;
