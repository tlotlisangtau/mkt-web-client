"use client";

import React, { useState } from 'react';
import '../styles/globals.css';

const BuyerInformation: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div className="right-side-bar single-right-content product-right-sin">
      <aside className="bg-effe">
        <h3 className="aside-title margin-b-3">Buying</h3>
        <span className="pos-icon">
          <span className="fa fa-laptop"></span>
        </span>
      </aside>
      <aside className="posts p-4 border">
        <h3 className="aside-title">Buyer Information</h3>
        <ul className="category product-page">
          <li className="user-text"><span className="fa fa-user yelp"></span>Maria Zoe</li>
          <li>
            <span className="fa fa-map-marker"></span>
            London, 235 Terry, 10001<br />
            House#18, Road#07
          </li>
          <li>
            <a href="product-1.html" className="colors">
              <span className="fa fa-shopping-basket"></span>
              View Store
            </a>
          </li>
        </ul>
      </aside>
      <aside className="bg-effe bg-effe-2">
        <h3 className="aside-title margin-b-3">
          <a href="tel:+44-000-888-999">+44-000-888-999</a>
        </h3>
        <p className="para-calls">Conse ctetur adip iscing elit</p>
        <span className="pos-icon pos-icon-2">
          <span className="fa fa-phone"></span>
        </span>
      </aside>
      <aside className="posts p-4 border">
        <h3 className="aside-title">Contact Buyer</h3>
        <form action="#" method="post">
          <div className="form-group">
            <input type="email" name="Email" className="form-control" placeholder="Your Email" required />
          </div>
          <div className="form-group">
            <input type="text" name="Name" className="form-control" placeholder="Your Name" required />
          </div>
          <div className="form-group">
            <textarea name="Message" className="form-control" placeholder="Your reply..." required></textarea>
          </div>
          <div className="submit">
            <button type="submit" className="btn button-eff">Send</button>
          </div>
        </form>
      </aside>
      <aside className="posts p-4 border actions">
        <h3 className="aside-title">Ad Action</h3>
        <ul className="links-single">
          <li><a href="#share"><span className="fa fa-share-alt"></span>Share</a></li>
          <li><a href="#print"><span className="fa fa-print"></span>Print</a></li>
          <li><a href="#favorite"><span className="fa fa-heart-o"></span>Favorite</a></li>
          <li><a href="#report"><span className="fa fa-flag-o"></span>Report</a></li>
        </ul>
      </aside>
    </div>
  );
};

export default BuyerInformation;
