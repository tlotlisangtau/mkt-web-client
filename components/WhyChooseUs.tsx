"use client";

import React, { useState } from 'react';
// import Link from 'next/link';
import '../styles/globals.css'

const WhyChooseUs: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <section id='why' className="w3l-content-11-main">
    <div className="content-design-11">
        <div className="wrapper">
            <h3 className="title-main">Why Choose Us?</h3>
            <div className="content-sec-11 column content-text">
                <div className="columns">
                    <div className="icon-eff">
                        <span className="fa fa-book" aria-hidden="true"></span>
                    </div>
                    <div className="right-side">
                        <h4>Full Documented</h4>
                        <p> Fusce faucibus ante vitae justo efficitur elementum. Donec ipsum faucibus.</p>
                    </div>
                </div>
                <div className="columns">
                    <div className="icon-eff">
                        <span className="fa fa-newspaper-o" aria-hidden="true"></span>
                    </div>
                    <div className="right-side">
                        <h4>Awesome Layout</h4>
                        <p> Fusce faucibus ante vitae justo efficitur elementum. Donec sed faucibus.</p>
                    </div>
                </div>
                <div className="columns">
                    <div className="icon-eff">
                        <span className="fa fa-paper-plane" aria-hidden="true"></span>
                    </div>
                    <div className="right-side">
                        <h4>Clean & Modern Design</h4>
                        <p> Suspendisse condimentum eget ligula a posuere. Duis ipsum et gravida.</p>
                    </div>
                </div>
                <div className="columns">
                    <div className="icon-eff">
                        <span className="fa fa-thumbs-up" aria-hidden="true"></span>
                    </div>
                    <div className="right-side">
                        <h4>Super Support</h4>
                        <p> Suspendisse condimentum eget ligula a posuere. Duis ipsum etarcu dffdut.
                        </p>
                    </div>
                </div>
                <div className="columns">
                    <div className="icon-eff">
                        <span className="fa fa-magic" aria-hidden="true"></span>
                    </div>
                    <div className="right-side">
                        <h4>Great Features</h4>
                        <p> Suspendisse condimentum eget ligula a posuere. Duis ipsum et rcu fdsut.</p>
                    </div>
                </div>
                <div className="columns">
                    <div className="icon-eff">
                        <span className="fa fa-handshake-o" aria-hidden="true"></span>
                    </div>
                    <div className="right-side">
                        <h4>User Friendly</h4>
                        <p> Fusce faucibus ante vitae justo efficitur elementum. Donec sed faucibus.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
    )
};
export default WhyChooseUs;