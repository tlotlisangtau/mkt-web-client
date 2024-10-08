"use client";

import React, { useState, useEffect } from 'react';
import '../styles/globals.css';
import '../styles/modal.css';
import { jwtDecode } from 'jwt-decode';

const BuyerInformation: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [buyerId, setBuyerId] = useState<number | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [productId, setProductId] = useState<number | null>(null);
  const [sellerId, setSellerId] = useState<number | null>(null);
  const [sellerName, setSellerName] = useState<string | null>(null);
  const [sellerLocation, setSellerLocation] = useState<string | null>(null);
  const [sellerPhone, setSellerPhone] = useState<string | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  interface DecodedToken {
    user_id: number;
  }

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const decodedToken = jwtDecode<DecodedToken>(token);
      setBuyerId(decodedToken.user_id);
    }

    const params = new URLSearchParams(window.location.search);
    const id = params.get('productId');
    const cat = params.get('category');
    setProductId(id ? parseInt(id) : null);
    setCategory(cat);
  }, []);

  const fetchProductDetails = async (id: number) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/${category}/${id}/`);
      if (response.ok) {
        const productData = await response.json();
        setSellerId(productData.user_id);
        // Fetch additional seller details using seller's ID
        fetchSellerDetails(productData.user_id);
      } else {
        console.error('Failed to fetch product details');
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  const fetchSellerDetails = async (id: number) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/accounts/${id}/`);
      if (response.ok) {
        const sellerData = await response.json();
        setSellerName(sellerData.first_name);
        setSellerLocation(sellerData.location);
        setSellerPhone(sellerData.phone_number);
      } else {
        console.error('Failed to fetch seller details');
      }
    } catch (error) {
      console.error('Error fetching seller details:', error);
    }
  };

  useEffect(() => {
    if (productId) {
      fetchProductDetails(productId);
    }
  }, [productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!buyerId) {
      // If user is not logged in, show the login modal
      setShowLoginModal(true);
      return;
    }
    setIsSubmitting(true);

    const messageData = {
      buyer: buyerId,
      seller: sellerId,
      job: category === 'jobs' ? productId : null,
      sport: category === 'sports' ? productId : null,
      furniture: category === 'furniture' ? productId : null,
      real_estate: category === 'realestate' ? productId : null,
      health_beauty: category === 'healthbeauty' ? productId : null,
      message_content: message,
    };
    console.log("Payload being sent:", messageData); // Log the payload
    try {
      const response = await fetch("http://127.0.0.1:8000/api/messages/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messageData),
      });

      if (response.ok) {
        setStatusMessage('Message sent successfully!');
        setEmail('');
        setName('');
        setMessage('');
      } else {
        setStatusMessage('Failed to send message.');
      }
    } catch (error) {
      setStatusMessage('Error occurred. Please try again later.');
    }

    setIsSubmitting(false);
  };

  return (
    <div className="right-side-bar single-right-content product-right-sin">
      <aside className="bg-effe">
        <h3 className="aside-title margin-b-3">Buying</h3>
        <span className="pos-icon">
          <span className="fa fa-laptop"></span>
        </span>
      </aside>
      <aside className="posts p-4 border">
        <h3 className="aside-title">Seller Information</h3>
        <ul className="category product-page">
          <li className="user-text">
            <span className="fa fa-user yelp"></span>{sellerName}
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
          <a href={`tel:${sellerPhone}`}>{sellerPhone}</a>
        </h3>
        <p className="para-calls">Contact the seller for more information</p>
        <span className="pos-icon pos-icon-2">
          <span className="fa fa-phone"></span>
        </span>
      </aside>
      {/* Contact Buyer Form */}
      <aside className="posts p-4 border">
        <h3 className="aside-title">Contact Seller</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="Name"
              className="form-control"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <textarea
              name="Message"
              className="form-control"
              placeholder="Your reply..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="submit">
            <button type="submit" className="btn button-eff" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send'}
            </button>
          </div>
          {statusMessage && <p>{statusMessage}</p>}
        </form>
      </aside>
      {/* Ad Action */}
      <aside className="posts p-4 border actions">
        <h3 className="aside-title">Ad Action</h3>
        <ul className="links-single">
          <li><a href="#share"><span className="fa fa-share-alt"></span>Share</a></li>
          <li><a href="#print"><span className="fa fa-print"></span>Print</a></li>
          <li><a href="#favorite"><span className="fa fa-heart-o"></span>Favorite</a></li>
          <li><a href="#report"><span className="fa fa-flag-o"></span>Report</a></li>
        </ul>
      </aside>

      {showLoginModal && (
        <div className="modal-overlayyy">
          <div className="modalll">
            <h3>You need to be logged in to send a message</h3>
            <button onClick={() => window.location.href = `/api/auth/login?redirect=${encodeURIComponent(window.location.href)}`}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyerInformation;
