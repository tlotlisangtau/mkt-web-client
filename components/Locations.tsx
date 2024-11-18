"use client";

import React, { useState } from 'react';
// import Link from 'next/link';
import '../styles/globals.css'

const Locations: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <section className="w3l-grids-9-main">
    <div className="grid-top-9">
        <div className="wrapper">
            <h3 className="title-main">Popular Locations</h3>
            <div className="d-grid grid-col-3 grid-element-9 margin-bottom">
                <div className="left-grid-ele-9 grid-bg3">
                    <div className="sub-wid-grid-9">
                        <h4 className="text-grid-9"><a href="product-single.html">London</a></h4>
                        <p className="sub-para">Sed ut perspi</p>
                    </div>
                </div>
                <div className="left-grid-ele-9 grid-bg4">
                    <div className="sub-wid-grid-9">
                        <h4 className="text-grid-9"><a href="product-single.html">Japan</a></h4>
                        <p className="sub-para">Sed ut perspi</p>
                    </div>
                </div>
                <div className="left-grid-ele-9 grid-bg5">
                    <div className="sub-wid-grid-9">
                        <h4 className="text-grid-9"><a href="product-single.html">France</a></h4>
                        <p className="sub-para">Sed ut perspi</p>
                    </div>
                </div>
            </div>
            <div className="d-grid grid-col-2 grid-element-9">
                <div className="left-grid-ele-9 grid-bg1">
                    <div className="sub-wid-grid-9">
                        <h4 className="text-grid-9"><a href="product-single.html">New Jersy</a></h4>
                        <p className="sub-para">Sed ut perspi</p>
                    </div>
                </div>
                <div className="left-grid-ele-9 grid-bg2">
                    <div className="sub-wid-grid-9">
                        <h4 className="text-grid-9"><a href="product-single.html">Paris</a></h4>
                        <p className="sub-para">Sed ut perspi</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
    )
};
export default Locations;