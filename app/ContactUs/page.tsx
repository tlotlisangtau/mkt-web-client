"use client";

import Nav from "@/components/Nav";
import Footer from "@/components/footer";
import React, { useState, useRef } from "react";
import { toast, Toaster } from "react-hot-toast";

function ContactUs() {
  const latestAdsRef = useRef<HTMLDivElement>(null);
  const whyChooseUsRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);

  // State for form inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8000/reports/submitReport/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        toast.success("Your message has been submitted successfully!"); 
        setFormData({ name: "", email: "", subject: "", message: "" }); 
      } else {
        toast.error("Failed to submit your message. Please try again."); 
      }
    } catch (error) {
      toast.error(
        "Error occurred while submitting the message. Please try again later."
      ); // Show error message
    }
  };

  return (
    <div>
      <Toaster />
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
              <form onSubmit={handleSubmit}>
                <div className="d-grid content-grids-cont">
                  <div className="form-group">
                    <label htmlFor="w3lName">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      id="w3lName"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="w3lSender">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      id="w3lSender"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="w3lSubject">Subject</label>
                  <input
                    type="text"
                    className="form-control"
                    name="subject"
                    id="w3lSubject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="w3lMessage">How can we help?</label>
                  <textarea
                    name="message"
                    id="w3lMessage"
                    className="form-control"
                    value={formData.message}
                    onChange={handleChange}
                    required
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
                    Lesotho.
                  </p>
                </div>
              </div>
              <div className="d-grid adress-info">
                <div className="adress-icon">
                  <span className="fa fa-envelope-o"></span>
                </div>
                <div className="text-left">
                  <h6>Email</h6>
                  <a href="mailto:info@example.com">support@ikahe.com</a>
                  <br />
                  <a href="mailto:info@example.com">info@ikahe.com</a>
                </div>
              </div>
              <div className="d-grid adress-info">
                <div className="adress-icon">
                  <span className="fa fa-phone"></span>
                </div>
                <div className="text-left">
                  <h6>Phone Number</h6>
                  <p>
                    <a href="tel:+1-234-567-0890">+266-5897-4305</a>
                  </p>
                  <p>
                    <a href="tel:+44-000-888-999">+266-5897-4305</a>
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

export default ContactUs;
