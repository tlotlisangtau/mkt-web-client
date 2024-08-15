"use client";

import React, { useState } from 'react';
import '../styles/globals.css'

const RightSideBar: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
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
    
    <aside>
      <h3 className="aside-title mb-3">Advertisement</h3>
      <img src="assets/images/screen.jpg" alt="" className="img-fluid img-responsive" />
    </aside>
  </div>
    )
};
export default RightSideBar;