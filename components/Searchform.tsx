"use client";

import React, { useState } from 'react';
// import Link from 'next/link';
import '../styles/globals.css'

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
                        <input type="search" name="text" placeholder="Enter Keywords here.." required></input>
                    </div>
                    <div className="d-flex grids-icon grids-icon-2">
                        <span className="fa fa-tags" aria-hidden="true"></span>
                        <div className="input-group-btn">
                            <select className="btn btn-default" name="ext" required>
                                <option selected="">Select Category</option>
                                <option>Electronics </option>
                                <option>Furniture </option>
                                <option>Jobs</option>
                                <option>Real Estate</option>
                                <option>Sports</option>
                                <option>Health & Beauty</option>
                                <option>And more</option>
                            </select>
                        </div>
                    </div>
                    <div className="d-flex grids-icon grids-icon-2">
                        <span className="fa fa-map-marker" aria-hidden="true"></span>
                        <div className="input-group-btn">
                            <select className="btn btn-default" name="ext" required>
                                <option selected="">Select Country</option>
                                <option>Australia</option>
                                <option>London</option>
                                <option>India</option>
                                <option>Bangladesh</option>
                                <option>Saudi Arabia</option>
                                <option>America</option>
                                <option>Srilanka</option>
                            </select>
                        </div>
                    </div>
                    <button type="submit" className="btn button-eff"><span className="fa fa-search"
                            aria-hidden="true"></span>Search</button>
                </form>
            </div>
        </div>
    </div>
</section>

    )
};
export default Searchform;