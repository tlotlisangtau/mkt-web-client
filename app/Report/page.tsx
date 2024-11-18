"use client";

import Nav from "@/components/Nav";
import Footer from "@/components/footer";
import React, { useState, useRef } from "react";
import { toast, Toaster } from "react-hot-toast"; // Import toast and Toaster

function Report() {
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
        toast.success("Your report has been submitted successfully!"); // Show success message
        setFormData({ name: "", email: "", subject: "", message: "" }); // Reset form
      } else {
        toast.error("Failed to submit your report. Please try again."); // Show error message
      }
    } catch (error) {
      toast.error(
        "Error occurred while submitting the report. Please try again later."
      ); // Show error message
    }
  };

  return (
    <div>
      <Toaster /> {/* Include Toaster component here */}
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
              <li className="active">Report to us</li>
            </ul>
          </div>
        </div>
      </section>
      <div className="w3l-contact-main">
        <div className="contact sec-padding">
          <div className="wrapper">
            <h3 className="title-main">Report to us</h3>
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

export default Report;
