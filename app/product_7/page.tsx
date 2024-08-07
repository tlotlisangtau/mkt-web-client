"use client";

import React, { useEffect, useState } from 'react';
import '../../styles/globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/footer';

// Define the Product type
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

const product_7: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/categories/7/products/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched data:', data); // Log the fetched data

        // Ensure that data is an array before setting it in state
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
          <h3 className="title-main">Health & Beauty Products</h3>
            <div className="d-grid grid-colunm-2 grid-colunm">
              {/* right side bar */}
              <div className="right-side-bar">
                <aside>
                  <h3 className="aside-title mb-3">Filter Ads</h3>
                  <form className="form-inline search-form" action="#" method="post">
                    <input className="form-control" type="search" placeholder="Search here..." aria-label="email" required />
                    <button className="btn search" type="submit"><span className="fa fa-search"></span></button>
                    <button className="btn reset" type="reset" title="Reset Search"><span className="fa fa-repeat"></span></button>
                  </form>
                </aside>
                <aside className="posts p-4 border">
                  <h3 className="aside-title">All Categories</h3>
                  <ul className="category">
                    <li><a href="product-1.html"><span className="fa fa-laptop"></span>Electronics <label>(11)</label></a></li>
                    <li><a href="product-2.html"><span className="fa fa-bed"></span>Furniture <label>(24)</label></a></li>
                    <li><a href="product-3.html"><span className="fa fa-briefcase"></span>Jobs <label>(18)</label></a></li>
                    <li><a href="product-4.html"><span className="fa fa-home"></span>Real Estate <label>(08)</label></a></li>
                    <li><a href="product-5.html"><span className="fa fa-futbol-o"></span>Sports <label>(38)</label></a></li>
                    <li><a href="product-6.html"><span className="fa fa-heart"></span>Health & Beauty <label>(26)</label></a></li>
                  </ul>
                </aside>
                <aside className="posts p-4 border">
                  <h3 className="aside-title">Premium Ads</h3>
                  <div className="posts-grid">
                    <a href="blog-single.html">
                      <img src="assets/images/b1.jpg" alt=" " className="img-responsive img-thumbnail" />
                    </a>
                    <a href="blog-single.html">
                      <img src="assets/images/b2.jpg" alt=" " className="img-responsive img-thumbnail" />
                    </a>
                    <a href="blog-single.html">
                      <img src="assets/images/b3.jpg" alt=" " className="img-responsive img-thumbnail" />
                    </a>
                  </div>
                </aside>
                <aside className="posts p-4 border single-left-inner">
                  <h3 className="aside-title">Type</h3>
                  <div className="brand-equal">
                    <input type="radio" name="radio" className="radio-input" checked />
                    <label className="brand-name">All</label>
                  </div>
                  <div className="brand-equal">
                    <input type="radio" name="radio" className="radio-input" />
                    <label className="brand-name">Sell</label>
                  </div>
                  <div className="brand-equal">
                    <input type="radio" name="radio" className="radio-input" />
                    <label className="brand-name">Auction</label>
                  </div>
                  <div className="brand-equal">
                    <input type="radio" name="radio" className="radio-input" />
                    <label className="brand-name">Buy</label>
                  </div>
                  <div className="brand-equal">
                    <input type="radio" name="radio" className="radio-input" />
                    <label className="brand-name">Exchange</label>
                  </div>
                  <div className="brand-equal">
                    <input type="radio" name="radio" className="radio-input" />
                    <label className="brand-name">Gift</label>
                  </div>
                  <div className="brand-equal">
                    <input type="radio" name="radio" className="radio-input" />
                    <label className="brand-name">Rent</label>
                  </div>
                  <div className="brand-equal">
                    <input type="radio" name="radio" className="radio-input" />
                    <label className="brand-name">Job - Offer</label>
                  </div>
                  <div className="brand-equal">
                    <input type="radio" name="radio" className="radio-input" />
                    <label className="brand-name">Job - Wanted</label>
                  </div>
                </aside>
                <aside>
                  <h3 className="aside-title mb-3">Advertisement</h3>
                  <img src="assets/images/screen.jpg" alt="" className="img-fluid img-responsive" />
                </aside>
              </div>
              {/* //right side bar */}
              {/* left side blog post content */}
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
              <h1>Content</h1>
              <h1>Test</h1>
            {loading && <p>Loading...</p>}
              {error && <p>Error: {error}</p>}
              {!loading && !error && (
              <div className="d-grid grid-col-2">
                {products.map(product => (
                  <div className="product" key={product.id}>
                    <a href={`/product/${product.id}`}>
                      <img src={product.image} className="img-responsive" alt={product.name} />
                    </a>
                    <div className="info-bg">
                      <h5><a href={`/product/${product.id}`}>{product.name}</a></h5>
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
              {/* //left side blog post content */}
            </div>
            {/* pagination */}
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

export default product_7;
