"use client";

import React, { useState, useEffect } from 'react';
import '../styles/globals.css';
import {jwtDecode}  from 'jwt-decode';

const BuyerInformation: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [buyerId, setBuyerId] = useState<number | null>(null); // State for buyer ID
  const [category, setCategory] = useState<string | null>(null); // State for category
  const [productId, setProductId] = useState<number | null>(null); // State for product ID
  const [sellerId, setSellerId] = useState<number | null>(null); 

  interface DecodedToken {
    user_id: number;
  }

  useEffect(() => {
    const token = localStorage.getItem('accessToken'); // Replace with your token key
    if (token) {  
      const decodedToken = jwtDecode<DecodedToken>(token);  // Decode the token
      setBuyerId(decodedToken.user_id); // Set the buyer ID (assuming the ID is stored in the 'id' field)
    }

        // Get productId and category from the URL
        const params = new URLSearchParams(window.location.search);
        const id = params.get('productId');
        const cat = params.get('category');
        setProductId(id ? parseInt(id) : null); // Set the product ID
        setCategory(cat); // Set the category 
  }, []);

      // Fetch product details to get the seller's ID
      const fetchProductDetails = async (id: number) => {
        try {
          const response = await fetch(`http://127.0.0.1:8000/api/${category}/${id}/`); // Adjust the URL to match your API
          if (response.ok) {
            const productData = await response.json();
            setSellerId(productData.user_id); // Extract seller's ID from product data
          } else {
            console.error('Failed to fetch product details');
          }
        } catch (error) {
          console.error('Error fetching product details:', error);
        }
      };  
      if (productId) {
        fetchProductDetails(productId);
      }


  //console.log('heyy ',buyerId)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const messageData = {
      buyer: buyerId, // Use the actual buyer's ID from the token
      seller: sellerId, // Replace with the actual seller's ID
      job: category === 'jobs' ? productId : null,
      sport: category === 'sports' ? productId : null,
      furniture: category === 'furniture' ? productId : null,
      real_estate: category === 'realestate' ? productId : null,
      health_beauty: category === 'healthbeauty' ? productId : null,
      message_content: message
    };

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
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              name="Email"
              className="form-control"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
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
