"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import "../styles/globals.css";

interface NavProps {
  latestAdsRef: React.RefObject<HTMLDivElement>;
  whyChooseUsRef: React.RefObject<HTMLDivElement>; // Add ref for Why Choose Us
  categoriesRef: React.RefObject<HTMLDivElement>; // Add ref for Categories
}

const Nav: React.FC<NavProps> = ({
  latestAdsRef,
  whyChooseUsRef,
  categoriesRef,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State to control mobile menu visibility

  useEffect(() => {
    const userToken = localStorage.getItem("accessToken");
    setIsLoggedIn(!!userToken);
  }, []);

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      window.location.href = "/dashboard";
    } else {
      window.location.href = "/api/auth/login";
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const scrollToLatestAds = (event: React.MouseEvent) => {
    event.preventDefault();
    latestAdsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToWhyChooseUs = (event: React.MouseEvent) => {
    event.preventDefault();
    whyChooseUsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToCategories = (event: React.MouseEvent) => {
    event.preventDefault();
    categoriesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold">
              <Link
                href="/"
                className="flex items-center text-gray-800 hover:text-gray-600"
              >
                <span
                  className="fa fa-bullhorn text-2xl mr-2"
                  aria-hidden="true"
                ></span>
                Classify
              </Link>
            </h1>
          </div>
          {/* Desktop Menu */}
          <nav className="hidden lg:flex space-x-4 p-3">
            <Link
              href="#"
              onClick={scrollToCategories}
              className="text-lg font-semibold text-gray-800 hover:text-gray-600"
            >
              Categories
            </Link>
            <Link
              href="#"
              onClick={scrollToLatestAds}
              className="text-lg font-semibold text-gray-800 hover:text-gray-600"
            >
              Latest Ads
            </Link>
            <Link
              href="#"
              onClick={scrollToWhyChooseUs}
              className="text-lg font-semibold text-gray-800 hover:text-gray-600"
            >
              Why Choose Us
            </Link>
            <Link
              href="/ChooseCategory"
              className="bg-blue-500 text-white py-2 px-2 mb-3 rounded hover:bg-blue-600"
            >
              <span
                className="fa fa-paper-plane-o mr-2"
                aria-hidden="true"
              ></span>
              Post your Ad
            </Link>
            <button
              onClick={handleLoginLogout}
              className="bg-blue-500 text-white py-2 px-2 mb-3 rounded hover:bg-blue-600"
            >
              <span
                className="fa fa-paper-plane-o mr-2"
                aria-hidden="true"
              ></span>
              {isLoggedIn ? "Dashboard" : "Login"}
            </button>

            {isLoggedIn &&
            <Link
              href="/favorite"
              className="text-gray-800 hover:text-gray-600 flex items-center justify-center"
            >
              <div className="w-20 h-9 flex items-center -mt-3 justify-center bg-blue-600 border-1 text-white border-blue-600 rounded-md">
               <span className="fa fa-heart text-lg" aria-hidden="true"></span>
              </div>
            </Link>
            }
          </nav>

          {/* Hamburger button for mobile */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden text-gray-800 hover:text-gray-600"
          >
            <span className="fa fa-bars text-2xl"></span>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="lg:hidden mt-4 flex flex-col space-y-2">
            <Link href="/" className="text-gray-800 hover:text-gray-600">
              Home
            </Link>
            <Link
              href="#"
              onClick={scrollToCategories}
              className="text-gray-800 hover:text-gray-600"
            >
              Categories
            </Link>
            <Link
              href="#"
              onClick={scrollToLatestAds}
              className="text-gray-800 hover:text-gray-600"
            >
              Latest Ads
            </Link>
            <Link
              href="#"
              onClick={scrollToWhyChooseUs}
              className="text-lg text-gray-800 hover:text-gray-600"
            >
              Why Choose Us
            </Link>
            <Link
              href="/ChooseCategory"
              className="bg-blue-500 text-white py-2 px-2 rounded hover:bg-blue-600"
            >
              <span
                className="fa fa-paper-plane-o mr-2"
                aria-hidden="true"
              ></span>
              Post your Ad
            </Link>
            <button
              onClick={handleLoginLogout}
              className="bg-blue-500 text-white py-2 px-2 rounded hover:bg-blue-600"
            >
              <span
                className="fa fa-paper-plane-o mr-2"
                aria-hidden="true"
              ></span>
              {isLoggedIn ? "Dashboard" : "Login"}
            </button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Nav;
