"use client";

import React, { useState, useEffect } from "react";
import "../styles/globals.css";

const Footer: React.FC = () => {
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <section className="footer-top">
        <div className="wrapper">
          <div className="footer-content">
            <h4>Join the Marketplace Revolution!</h4>
            <div className="footer-columns">
              <div className="footer-column">
                <p>
                  We’re on a mission to connect buyers and sellers in a seamless
                  experience. Join our community today!
                </p>
                <div className="social-icons">
                  <a href="#facebook" className="fa fa-facebook"></a>
                  <a href="#linkedin" className="fa fa-linkedin"></a>
                  <a href="#twitter" className="fa fa-twitter"></a>
                  <a href="#google" className="fa fa-google-plus"></a>
                  <a href="#github" className="fa fa-github"></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="footer-bottom">
        <div className="wrapper">
          <div className="copyright">
            <p>@2024 Marketplace. All rights reserved.</p>
          </div>
        </div>
      </div>
      {showTopButton && (
        <button className="scroll-top" onClick={scrollToTop}>
          ↑
        </button>
      )}
    </footer>
  );
};

export default Footer;
