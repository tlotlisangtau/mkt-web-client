"use client";

import React, { useState } from "react";
import "../styles/globals.css";

const Searchform: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <section className="w3l-search-form-3-main">
      <div className="search-form-3">
        <div className="wrapper">
          <div className="section-width">
            <form action="#" className="search-3-gd" method="post">
              <div className="d-flex grids-icon">
                <span className="fa fa-text-height" aria-hidden="true"></span>
                <input
                  type="search"
                  name="text"
                  placeholder="Enter Keywords here.."
                  required
                />
              </div>
              <div className="d-flex grids-icon grids-icon-2">
                <span className="fa fa-tags" aria-hidden="true"></span>
                <div className="input-group-btn">
                  <select className="btn btn-default" name="category" required>
                    <option value="" disabled>
                      Select Category
                    </option>
                    <option value="Electronics">Electronics</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Jobs">Jobs</option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="Sports">Sports</option>
                    <option value="Health & Beauty">Health & Beauty</option>
                    <option value="And more">And more</option>
                  </select>
                </div>
              </div>
              <div className="d-flex grids-icon grids-icon-2">
                <span className="fa fa-map-marker" aria-hidden="true"></span>
                <div className="input-group-btn">
                  <select className="btn btn-default" name="country" required>
                    <option value="" disabled>
                      Select Country
                    </option>
                    <option value="Australia">Australia</option>
                    <option value="London">London</option>
                    <option value="India">India</option>
                    <option value="Bangladesh">Bangladesh</option>
                    <option value="Saudi Arabia">Saudi Arabia</option>
                    <option value="America">America</option>
                    <option value="Sri Lanka">Sri Lanka</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="btn button-eff">
                <span className="fa fa-search" aria-hidden="true"></span>Search
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Searchform;
