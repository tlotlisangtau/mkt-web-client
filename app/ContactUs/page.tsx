"use client"
import Nav from '@/components/Nav'
import Footer from '@/components/footer';
import React, { useEffect, useState, Suspense, useRef } from "react";

function ContactUs() {
      const latestAdsRef = useRef<HTMLDivElement>(null);
      const whyChooseUsRef = useRef<HTMLDivElement>(null);
      const categoriesRef = useRef<HTMLDivElement>(null);
  return (
    <div>
      <Nav
        latestAdsRef={latestAdsRef}
        whyChooseUsRef={whyChooseUsRef}
        categoriesRef={categoriesRef}
      />
      <section className="w3l-inner-banner-main">
        <div className="about-inner inner2">
          <div className="wrapper seen-w3">
            <ul className="breadcrumbs-custom-path">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <span className="fa fa-angle-right" aria-hidden="true"></span>
              </li>
              <li className="active">Contact Us</li>
            </ul>
          </div>
        </div>
      </section>
      <div className="w3l-contact-main">
        <div className="contact sec-padding">
          <div className="wrapper">
            <h3 className="title-main">Contact Us</h3>
            <div className="contact-form mx-auto pt-sm-4">
              <form
                method="post"
                action="https://sendmail.w3layouts.com/submitForm"
              >
                <div className="d-grid content-grids-cont">
                  <div className="form-group">
                    <label htmlFor="w3lName">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="w3lName"
                      id="w3lName"
                      placeholder=""
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="w3lSender">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="w3lSender"
                      id="w3lSender"
                      placeholder=""
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="w3lSubject">Subject</label>
                  <input
                    type="text"
                    className="form-control"
                    name="w3lSubject"
                    id="w3lSubject"
                    placeholder=""
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="w3lSubject">How can we help?</label>
                  <textarea
                    name="w3lMessage"
                    id="w3lMessage"
                    className="form-control"
                    placeholder=""
                  ></textarea>
                </div>
                <button type="submit" className="btn button-eff button-eff-2">
                  Submit
                </button>
              </form>
            </div>
            <div className="d-grid temp-cont-grid">
              <div className="d-grid adress-info">
                <div className="adress-icon">
                  <span className="fa fa-map-marker"></span>
                </div>
                <div className="text-left">
                  <h6>Location</h6>
                  <p>
                    Maseru,
                    <br />
                    Lesotho.{" "}
                  </p>
                </div>
              </div>
              <div className="d-grid adress-info">
                <div className="adress-icon">
                  <span className="fa fa-envelope-o"></span>
                </div>
                <div className="text-left">
                  <h6>Email</h6>
                  <a href="mailto:info@example.com">mail@example.com</a>
                  <br />
                  <a href="mailto:info@example.com">mail2@example.com</a>
                </div>
              </div>
              <div className="d-grid adress-info">
                <div className="adress-icon">
                  <span className="fa fa-phone"></span>
                </div>
                <div className="text-left">
                  <h6>Phone Number</h6>
                  <p>
                    <a href="tel:+1-234-567-0890">+1-234-567-0890</a>
                  </p>
                  <p>
                    <a href="tel:+44-000-888-999">+44-000-888-999</a>
                  </p>
                </div>
              </div>
            </div>
        
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ContactUs
