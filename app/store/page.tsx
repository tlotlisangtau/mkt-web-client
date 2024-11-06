"use client"
import Nav from "@/components/Nav";
import React, { useEffect, useState, Suspense, useRef } from "react";

function Store() {

// Dummy refs
  const latestAdsRef = useRef<HTMLDivElement>(null);
  const whyChooseUsRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);

  return (
    <>
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
              <li className="active">
                Store
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}

export default Store