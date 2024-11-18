"use client";

import React, { useState } from 'react';
// import Link from 'next/link';
import '../styles/globals.css'

const NotFound: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div className="w3l-error-main">
        <div className="error">
            <div className="wrapper">
                <h1>
                    <a href="index.html" className="logo-2"><span className="fa fa-bullhorn"
                            aria-hidden="true"></span>Classify</a>
                    {/* <!-- if logo is image enable this   
                                <a className="logo" href="index.html">
                                    <img src="image-path" alt="Your logo" title="Your logo" style="height:35px;" />
                                </a> --> */}
                </h1>
                <div className="sub-wthreess">
                    <h3 className="text-err-wthree">Oops!</h3>
                    <h4>404 - Page not found</h4>
                    <p>This page you are looking for might have been removedhad its name changed or temporarly
                        unavailable.
                    </p>
                    <a href="index.html" className="btn button-eff">Go to Home</a>
                </div>
            </div>
        </div>
      </div>
   
  );
};
export default NotFound;
