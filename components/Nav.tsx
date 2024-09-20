"use client";

import React from 'react';
import Link from 'next/link';
import '../styles/globals.css';

const Nav: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold">
              <Link href="/" className="flex items-center text-gray-800 hover:text-gray-600">
                <span className="fa fa-bullhorn text-2xl mr-2" aria-hidden="true"></span>
                Classify
              </Link>
            </h1>
          </div>
          <nav className="hidden lg:flex space-x-4 p-3">
            <Link href="/" className="text-gray-800 hover:text-gray-600">Home</Link>
            <div className="relative group">
              <Link href="#" className="text-gray-800 hover:text-gray-600 flex items-center">
                All Ads <span className="fa fa-angle-down ml-2" aria-hidden="true"></span>
              </Link>
              <div className="absolute bg-white shadow-lg mt-2 hidden group-hover:grid p-8 w-auto" style={{ zIndex: 20 }}>
                <Link href="/category" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">All Ads</Link>
                <Link href="/product-1" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Electronics</Link>
                <Link href="/product-2" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Furniture</Link>
                <Link href="/product-3" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Jobs</Link>
                <Link href="/product-4" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Real Estate</Link>
                <Link href="/product-5" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Sports</Link>
                <Link href="/product-6" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Health & Beauty</Link>
                <Link href="/product-single" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Single Ad</Link>
              </div>
            </div>
            <div className="relative group">
              <Link href="#" className="text-gray-800 hover:text-gray-600 flex items-center">
                Pages <span className="fa fa-angle-down ml-2" aria-hidden="true"></span>
              </Link>
              <div className="absolute bg-white shadow-lg mt-2 hidden group-hover:grid p-4 w-auto" style={{ zIndex: 20 }}>
                <Link href="/about" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">About</Link>
                <Link href="/services" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">How it Works?</Link>
                <Link href="/pricing" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Pricing</Link>
                <Link href="/team" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Team</Link>
                <Link href="/team-single" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Team Member</Link>
                <Link href="/blog" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Blog</Link>
                <Link href="/blog-single" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Blog Single</Link>
                <Link href="/timeline" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Timeline</Link>
                <Link href="/faq" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Faq</Link>
                <Link href="/coming-soon" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Coming Soon</Link>
                <Link href="/404" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">404</Link>
                <Link href="/search-results" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Search Results</Link>
                <Link href="/login" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Login</Link>
                <Link href="/signup" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Signup</Link>
                <Link href="/email-template" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Email Template</Link>
              </div>
            </div>
            <div className="relative group">
              <Link href="#" className="text-gray-800 hover:text-gray-600 flex items-center">
                Shop <span className="fa fa-angle-down ml-2" aria-hidden="true"></span>
              </Link>
              <div className="absolute bg-white shadow-lg mt-2 hidden group-hover:grid p-4 w-auto" style={{ zIndex: 20 }}>
                <Link href="/ecommerce" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Ecommerce</Link>
                <Link href="/ecommerce-single" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Ecommerce Single</Link>
                <Link href="/ecommerce-cart" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Ecommerce Cart</Link>
              </div>
            </div>
            <Link href="/contact" className="text-gray-800 hover:text-gray-600">Contact</Link>
            <Link href="/ChooseCategory" className="bg-blue-500 text-white py-2 px-2 mb-3 rounded hover:bg-blue-600">
              <span className="fa fa-paper-plane-o mr-2" aria-hidden="true"></span>
              Post your Ad
            </Link>
            <Link href="/api/auth/login/" className="bg-blue-500 text-white py-2 px-2 mb-3 rounded hover:bg-blue-600">
              <span className="fa fa-paper-plane-o mr-2" aria-hidden="true"></span>
              Login
            </Link>
          </nav>
          <button className="lg:hidden text-gray-800 hover:text-gray-600">
            <span className="fa fa-bars text-2xl"></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Nav;
