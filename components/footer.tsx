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
     <footer className="w3l-footer-22">
       <section className="fotter-sub">
         <div className="footer">
           <div className="wrapper">
             <div className="text-txt">
               <div className="right-side">
                 <h4>Join the Marketplace Revolution!</h4>
                 <p className="para-sep">
                   We’re on a mission to connect buyers and sellers in a
                   seamless experience. Join our community today!
                 </p>
                 <div className="sub-columns">
                   <div className="sub-one-left">
                     <h6>About</h6>
                     <p className="para">
                       At our marketplace, we strive to provide an exceptional
                       and seamless experience for both buyers and sellers. Our
                       platform is designed with user-friendliness in mind,
                       making it easy for anyone to navigate and find what they
                       need.
                     </p>
                     <div className="columns-2">
                       <ul className="social">
                         <li>
                           <a href="#facebook">
                             <span
                               className="fa fa-facebook"
                               aria-hidden="true"
                             ></span>
                           </a>
                         </li>
                         <li>
                           <a href="#linkedin">
                             <span
                               className="fa fa-linkedin"
                               aria-hidden="true"
                             ></span>
                           </a>
                         </li>
                         <li>
                           <a href="#twitter">
                             <span
                               className="fa fa-twitter"
                               aria-hidden="true"
                             ></span>
                           </a>
                         </li>
                         <li>
                           <a href="#google">
                             <span
                               className="fa fa-google-plus"
                               aria-hidden="true"
                             ></span>
                           </a>
                         </li>
                         <li>
                           <a href="#github">
                             <span
                               className="fa fa-github"
                               aria-hidden="true"
                             ></span>
                           </a>
                         </li>
                       </ul>
                     </div>
                   </div>

                   <div className="sub-two-right">
                     <h6>Quick links</h6>
                     <ul>
                       <li>
                         <a href="/">
                           <span className="fa fa-angle-double-right mr-2"></span>
                           Home
                         </a>
                       </li>
                       <li>
                         <a href="about.html">
                           <span className="fa fa-angle-double-right mr-2"></span>
                           About
                         </a>
                       </li>
                       <li>
                         <a href="services.html">
                           <span className="fa fa-angle-double-right mr-2"></span>
                           Services
                         </a>
                       </li>
                       <li>
                         <a href="/ContactUs">
                           <span className="fa fa-angle-double-right mr-2"></span>
                           Contact
                         </a>
                       </li>
                     </ul>
                   </div>
                   <div className="sub-two-right">
                     <h6>Contact</h6>
                     <div className="column2">
                       <div className="href1">
                         <span
                           className="fa fa-envelope-o"
                           aria-hidden="true"
                         ></span>
                         <a href="mailto:info@example.com">ikahe@gmail.com</a>
                       </div>
                       <div className="href2">
                         <span
                           className="fa fa-phone"
                           aria-hidden="true"
                         ></span>
                         <a href="tel:+44-000-888-999">+266-6868-8598</a>
                       </div>
                       <div>
                         <p className="contact-para">
                           <span
                             className="fa fa-map-marker"
                             aria-hidden="true"
                           ></span>
                           Maseru Lesotho
                         </p>
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
             </div>
           </div>
         </div>
       </section>
     </footer>
   );
};

export default Footer;

