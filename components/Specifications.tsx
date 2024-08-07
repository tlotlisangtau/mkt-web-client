"use client";

import React, { useState } from 'react';
// import Link from 'next/link';
import '../styles/globals.css'

const Specifications: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <section className="w3l-specifications-9">
        <div className="main-w3">
            <div className="overlay">
                <div className="wrapper">
                    <div className="d-flex main-cont-wthree-fea text-center">
                        <div className="grids-speci">
                            <div className="stats-icon">
                                <span className="fa fa-bullhorn" aria-hidden="true"></span>
                            </div>
                            <div>
                                <h3 className="title-spe">5000+</h3>
                                <p>Published Ads</p>
                            </div>
                        </div>
                        <div className="grids-speci">
                            <div className="stats-icon">
                                <span className="fa fa-users" aria-hidden="true"></span>
                            </div>
                            <div>
                                <h3 className="title-spe">3266+</h3>
                                <p>Register User</p>
                            </div>
                        </div>
                        <div className="grids-speci">
                            <div className="stats-icon">
                                <span className="fa fa-thumbs-o-up" aria-hidden="true"></span>
                            </div>
                            <div>
                                <h3 className="title-spe">2240+</h3>
                                <p>Verified Users</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    )
};
export default Specifications;