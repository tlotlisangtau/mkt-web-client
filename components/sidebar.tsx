"use client";

import React, { useState } from 'react';
import '../styles/globals.css';

const Sidebar: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div className="d-grid grid-colunm-2 grid-colunm">
      {/* right side bar */}
      <div className="right-side-bar">
        <aside>
          <h3 className="aside-title mb-3">Filter Ads</h3>
          <form className="form-inline search-form" action="#" method="post">
            <input
              className="form-control"
              type="search"
              placeholder="Search here..."
              aria-label="search"
              required
            />
            <button className="btn search" type="submit">
              <span className="fa fa-search"></span>
            </button>
            <button className="btn reset" type="reset" title="Reset Search">
              <span className="fa fa-repeat"></span>
            </button>
          </form>
        </aside>
        <aside className="posts p-4 border">
          <h3 className="aside-title">All Categories</h3>
          <ul className="category">
            <li>
              <a href="product-1.html">
                <span className="fa fa-laptop"></span>Electronics{" "}
                <label>(11)</label>
              </a>
            </li>
            <li>
              <a href="product-2.html">
                <span className="fa fa-bed"></span>Furniture <label>(24)</label>
              </a>
            </li>
            <li>
              <a href="product-3.html">
                <span className="fa fa-briefcase"></span>Jobs{" "}
                <label>(18)</label>
              </a>
            </li>
            <li>
              <a href="product-4.html">
                <span className="fa fa-home"></span>Automotives{" "}
                <label>(08)</label>
              </a>
            </li>
            <li>
              <a href="product-5.html">
                <span className="fa fa-futbol-o"></span>Sports{" "}
                <label>(38)</label>
              </a>
            </li>
            <li>
              <a href="product-6.html">
                <span className="fa fa-heart"></span>Health & Beauty{" "}
                <label>(26)</label>
              </a>
            </li>
          </ul>
        </aside>
        <aside className="posts p-4 border">
          <h3 className="aside-title">Premium Ads</h3>
          <div className="posts-grid">
            <a href="blog-single.html">
              <img
                src="assets/images/b1.jpg"
                alt=" "
                className="img-responsive img-thumbnail"
              />
            </a>
            <a href="blog-single.html">
              <img
                src="assets/images/b2.jpg"
                alt=" "
                className="img-responsive img-thumbnail"
              />
            </a>
            <a href="blog-single.html">
              <img
                src="assets/images/b3.jpg"
                alt=" "
                className="img-responsive img-thumbnail"
              />
            </a>
          </div>
        </aside>
        <aside className="posts p-4 border single-left-inner">
          <h3 className="aside-title">Type</h3>
          <div className="brand-equal">
            <input
              type="radio"
              name="radio"
              className="radio-input"
              id="all"
              defaultChecked
            />
            <label htmlFor="all" className="brand-name">
              All
            </label>
          </div>
          <div className="brand-equal">
            <input
              type="radio"
              name="radio"
              className="radio-input"
              id="sell"
            />
            <label htmlFor="sell" className="brand-name">
              Sell
            </label>
          </div>
          <div className="brand-equal">
            <input
              type="radio"
              name="radio"
              className="radio-input"
              id="auction"
            />
            <label htmlFor="auction" className="brand-name">
              Auction
            </label>
          </div>
          <div className="brand-equal">
            <input type="radio" name="radio" className="radio-input" id="buy" />
            <label htmlFor="buy" className="brand-name">
              Buy
            </label>
          </div>
          <div className="brand-equal">
            <input
              type="radio"
              name="radio"
              className="radio-input"
              id="exchange"
            />
            <label htmlFor="exchange" className="brand-name">
              Exchange
            </label>
          </div>
          <div className="brand-equal">
            <input
              type="radio"
              name="radio"
              className="radio-input"
              id="gift"
            />
            <label htmlFor="gift" className="brand-name">
              Gift
            </label>
          </div>
          <div className="brand-equal">
            <input
              type="radio"
              name="radio"
              className="radio-input"
              id="rent"
            />
            <label htmlFor="rent" className="brand-name">
              Rent
            </label>
          </div>
          <div className="brand-equal">
            <input
              type="radio"
              name="radio"
              className="radio-input"
              id="job-offer"
            />
            <label htmlFor="job-offer" className="brand-name">
              Job - Offer
            </label>
          </div>
          <div className="brand-equal">
            <input
              type="radio"
              name="radio"
              className="radio-input"
              id="job-wanted"
            />
            <label htmlFor="job-wanted" className="brand-name">
              Job - Wanted
            </label>
          </div>
        </aside>
        <aside>
          <h3 className="aside-title mb-3">Advertisement</h3>
          <img
            src="assets/images/screen.jpg"
            alt="Advertisement"
            className="img-fluid img-responsive"
          />
        </aside>
      </div>
      {/* //right side bar */}
      {/* left side blog post content */}
      <div className="tab-content text-left">
        <aside className="top-border d-flex">
          <h3 className="aside-title mb-3">Showing 1–3 of 38 results</h3>
          <div className="input-group-btn">
            <select
              className="btn btn-default"
              name="sort"
              defaultValue="Sort By Date"
            >
              <option value="date">Sort By Date</option>
              <option value="expire">Sort By Expire</option>
              <option value="popularity">Sort By Popularity</option>
              <option value="price-asc">Sort By Price - Ascending</option>
              <option value="price-desc">Sort By Price - Descending</option>
            </select>
          </div>
        </aside>
        <div className="d-grid grid-col-2">
          <div className="product">
            <a href="product-single.html">
              <img
                src="assets/images/ps1.jpg"
                className="img-responsive"
                alt="Product 1"
              />
            </a>
            <div className="info-bg">
              <h5>
                <a href="product-single.html">
                  Sed ut perspiciatis unde omnis iste natus
                </a>
              </h5>
              <p>Nulla ex nunc</p>
              <ul className="d-flex">
                <li>
                  <span className="fa fa-usd"></span> 1200
                </li>
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
          <div className="product">
            <a href="product-single.html">
              <img
                src="assets/images/ps2.jpg"
                className="img-responsive"
                alt="Product 2"
              />
            </a>
            <div className="info-bg">
              <h5>
                <a href="product-single.html">
                  Eaque ipsa quae ab illo inventore veritatis
                </a>
              </h5>
              <p>Nulla ex nunc</p>
              <ul className="d-flex">
                <li>
                  <span className="fa fa-usd"></span> 299
                </li>
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
          <div className="product">
            <a href="product-single.html">
              <img
                src="assets/images/ps3.jpg"
                className="img-responsive"
                alt="Product 3"
              />
            </a>
            <div className="info-bg">
              <h5>
                <a href="product-single.html">
                  Quasi architecto beatae vitae dicta sunt
                </a>
              </h5>
              <p>Nulla ex nunc</p>
              <ul className="d-flex">
                <li>
                  <span className="fa fa-usd"></span> 900
                </li>
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
        </div>
      </div>
      {/* //left side blog post content */}
    </div>
  );
};

export default Sidebar;
