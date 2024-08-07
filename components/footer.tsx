'use client';

import React, { useState, useEffect } from 'react';
import '../styles/globals.css';

const Footer: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setShowTopButton(true);
      } else {
        setShowTopButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w3l-footer-22">
      <section className="fotter-sub">
        <div className="footer">
          <div className="wrapper">
            <div className="text-txt">
              <div className="right-side">
                <h4>Create Your Classified Website Today!</h4>
                <p className="para-sep">The Best Classified Ads Theme in the World <a href="#download">Download Now</a></p>
                <div className="sub-columns">
                  <div className="sub-one-left">
                    <h6>About</h6>
                    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab.</p>
                    <div className="columns-2">
                      <ul className="social">
                        <li><a href="#facebook"><span className="fa fa-facebook" aria-hidden="true"></span></a></li>
                        <li><a href="#linkedin"><span className="fa fa-linkedin" aria-hidden="true"></span></a></li>
                        <li><a href="#twitter"><span className="fa fa-twitter" aria-hidden="true"></span></a></li>
                        <li><a href="#google"><span className="fa fa-google-plus" aria-hidden="true"></span></a></li>
                        <li><a href="#github"><span className="fa fa-github" aria-hidden="true"></span></a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="sub-two-right">
                    <h6>Quick links</h6>
                    <ul>
                      <li><a href="index.html"><span className="fa fa-angle-double-right mr-2"></span>Home</a></li>
                      <li><a href="about.html"><span className="fa fa-angle-double-right mr-2"></span>About</a></li>
                      <li><a href="services.html"><span className="fa fa-angle-double-right mr-2"></span>Services</a></li>
                      <li><a href="contact.html"><span className="fa fa-angle-double-right mr-2"></span>Contact</a></li>
                    </ul>
                  </div>
                  <div className="sub-two-right">
                    <h6>Help & Support</h6>
                    <ul>
                      <li><a href="index.html"><span className="fa fa-angle-double-right mr-2"></span>Live Chart</a></li>
                      <li><a href="faq.html"><span className="fa fa-angle-double-right mr-2"></span>Faq</a></li>
                      <li><a href="#support"><span className="fa fa-angle-double-right mr-2"></span>Support</a></li>
                      <li><a href="#terms"><span className="fa fa-angle-double-right mr-2"></span>Terms of Services</a></li>
                    </ul>
                  </div>
                  <div className="sub-one-left">
                    <h6>Contact</h6>
                    <div className="column2">
                      <div className="href1"><span className="fa fa-envelope-o" aria-hidden="true"></span><a href="mailto:info@example.com">info@example.com</a></div>
                      <div className="href2"><span className="fa fa-phone" aria-hidden="true"></span><a href="tel:+44-000-888-999">+44-000-888-999</a></div>
                      <div>
                        <p className="contact-para"><span className="fa fa-map-marker" aria-hidden="true"></span>London, 235 Terry, 10001</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="below-section">
          <div className="wrapper">
            <div className="copyright-footer">
              <div className="columns text-left">
                <p>@2019 Classify. All rights reserved.</p>
              </div>
              <ul className="text-right">
                <li><a href="#payment"><img src="../public/Images/payment1.jpg" alt="" className="img-responsive"></img></a></li>
                <li><a href="#payment"><img src="../public/Images/payment2.jpg" alt="" className="img-responsive"></img></a></li>
                <li><a href="#payment"><img src="../public/Images/payment3.jpg" alt="" className="img-responsive"></img></a></li>
                <li><a href="#payment"><img src="../public/Images/payment4.jpg" alt="" className="img-responsive"></img></a></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
