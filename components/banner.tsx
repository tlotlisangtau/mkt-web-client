"use client";

import React, { useState } from 'react';
// import Link from 'next/link';
import '../styles/globals.css'

const Banner: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <section className="w3l-banner-3-main">
    <div className="banner-3">
        <div className="wrapper">
            <div className="cover-top-center-9">
                <div className="w3ls_cover_txt-9">
                    <h3 className="title-cover-9">Buy, Sell, Rent & Exchange in one Click</h3>
                    <p className="para-cover-9">Once aute irure dolor in reprehenderit in voluptate velit
                        esse cillum dolore eu fugiat nulla pariatur consectetur adipiscing elit.</p>
                </div>
            </div>
        </div>
    </div>
</section>
  )
};
export default Banner;