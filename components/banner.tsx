"use client";

import React, { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode'; // Make sure jwt-decode is imported correctly
import '../styles/globals.css';

interface DecodedToken {
  user_id: number;
  exp: number;
  iat: number;
}

interface User {
  username: string;
}

const Banner: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  // Function to fetch user data using user_id from the token
  const fetchUsername = async (userId: number) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/accounts/${userId}/`);
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const data: User = await response.json();
      return data.username;
    } catch (error) {
      console.error("Error fetching username:", error);
      return null;
    }
  };

  // Function to extract user's ID from the JWT token and fetch the username
  const getUserNameFromToken = async () => {
    const token = localStorage.getItem('accessToken'); // Assuming the token is stored in localStorage

    // Debugging log to check if token exists
    console.log("Token in localStorage:", token);

    if (token) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(token); // Decode token to extract user_id
        console.log("Decoded Token:", decodedToken); // Log the decoded token

        const userId = decodedToken.user_id;
        const fetchedUsername = await fetchUsername(userId);
        return fetchedUsername || null; // Assuming the API returns 'username'
      } catch (error) {
        console.error("Error decoding token:", error); // Log any decoding errors
      }
    }
    return null;
  };

  // Use effect to get the username when the component mounts
  useEffect(() => {
    getUserNameFromToken().then((name) => {
      if (name) {
        setUsername(name);
      } else {
        console.log("Username not found or failed to fetch.");
      }
    });
  }, []);

  return (
    <section className="w3l-banner-3-main">
      <div className="banner-3">
        <div className="wrapper">
          <div className="cover-top-center-9">
            <div className="w3ls_cover_txt-9">
              <h3 className="title-cover-9">Buy, Sell, Rent & Exchange in one Click</h3>
              <p className="para-cover-9">Experience a seamless marketplace for all your needs. Whether buying, selling, renting, or trading, find what you’re looking for with just one click. </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
