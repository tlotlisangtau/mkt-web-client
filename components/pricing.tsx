"use client";

import React, { useState } from 'react';
// import Link from 'next/link';
import '../styles/globals.css'

const Pricing: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <section className="w3l-pricing-7-main" id="bottom">
        <div className="pricing-7-sec">
            <div className="wrapper">
                <h3 className="title-main">Pricing Packages</h3>
                <div className="pricing-sec-7">
                    <div className="pricing-gd-left pric-7-1">
                        <div className="w3l-pricing-7">
                            <div className="w3l-pricing-7-top">
                                <h6 className="one-light">Basic Plan</h6>
                                <h4><label>$</label>19<span>/month</span></h4>
                            </div>
                            <div className="w3l-pricing-7-bottom">
                                <div className="w3l-pricing-7-bottom-bottom">
                                    <ul className="links">
                                        <li>
                                            <div className="tick-mark"><span className="fa fa-check" aria-hidden="true"></span>
                                            </div>
                                            <p className="tick-info">3 Regular Ads</p>

                                        </li>
                                        <li>
                                            <div className="tick-mark"><span className="fa fa-check" aria-hidden="true"></span>
                                            </div>
                                            <p className="tick-info">1 Top Ad</p>

                                        </li>
                                        <li>
                                            <div className="tick-mark"><span className="fa fa-check" aria-hidden="true"></span>
                                            </div>
                                            <p className="tick-info">1 Featured Ad</p>

                                        </li>
                                        <li>
                                            <div className="tick-mark"><span className="fa fa-check" aria-hidden="true"></span>
                                            </div>
                                            <p className="tick-info">Basic Support</p>

                                        </li>

                                    </ul>
                                </div>
                                <div className="buy-button">
                                    <a className="popup btn button-eff" href="login.html">Purchase Now</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pricing-gd-left pric-7 active">
                        <div className="w3l-pricing-7">
                            <div className="w3l-pricing-7-top">
                                <h5>Popular</h5>
                                <h6>Silver Plan</h6>
                                <h4><label>$</label>39<span>/month</span></h4>
                            </div>
                            <div className="w3l-pricing-7-bottom">
                                <div className="w3l-pricing-7-bottom-bottom">
                                    <ul className="links">
                                        <li>
                                            <div className="tick-mark"><span className="fa fa-check" aria-hidden="true"></span>
                                            </div>
                                            <p className="tick-info">5 Regular Ads</p>

                                        </li>
                                        <li>
                                            <div className="tick-mark"><span className="fa fa-check" aria-hidden="true"></span>
                                            </div>
                                            <p className="tick-info">3 Top Ads</p>

                                        </li>
                                        <li>
                                            <div className="tick-mark"><span className="fa fa-check" aria-hidden="true"></span>
                                            </div>
                                            <p className="tick-info">2 Featured Ads</p>

                                        </li>
                                        <li>
                                            <div className="tick-mark"><span className="fa fa-check" aria-hidden="true"></span>
                                            </div>
                                            <p className="tick-info">Basic Support</p>

                                        </li>
                                    </ul>
                                </div>
                                <div className="buy-button">
                                    <a className="popup btn button-eff" href="login.html">Purchase Now</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pricing-gd-left pric-7-2">
                        <div className="w3l-pricing-7">
                            <div className="w3l-pricing-7-top">
                                <h6 className="one-light">Gold Plan</h6>
                                <h4><label>$</label>59<span>/month</span></h4>
                            </div>
                            <div className="w3l-pricing-7-bottom">
                                <div className="w3l-pricing-7-bottom-bottom">
                                    <ul className="links">
                                        <li>
                                            <div className="tick-mark"><span className="fa fa-check" aria-hidden="true"></span>
                                            </div>
                                            <p className="tick-info">Unlimited Regular Ads</p>

                                        </li>
                                        <li>
                                            <div className="tick-mark"><span className="fa fa-check" aria-hidden="true"></span>
                                            </div>
                                            <p className="tick-info">10 Top Ads</p>

                                        </li>
                                        <li>
                                            <div className="tick-mark"><span className="fa fa-check" aria-hidden="true"></span>
                                            </div>
                                            <p className="tick-info">5 Featured Ads</p>

                                        </li>
                                        <li>
                                            <div className="tick-mark"><span className="fa fa-check" aria-hidden="true"></span>
                                            </div>
                                            <p className="tick-info">Priority Support</p>

                                        </li>
                                    </ul>
                                </div>
                                <div className="buy-button">
                                    <a className="popup btn button-eff" href="login.html">Purchase Now</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    )
};
export default Pricing;