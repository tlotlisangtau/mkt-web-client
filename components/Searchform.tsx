"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { getCategories } from "../services/categoryService"; // Import the category service
import axiosInstance from "../utils/axiosInstance"; // Import your axios instance
import "../styles/globals.css";
import { StringValidation } from "zod";

interface Category {
  id: number;
  name: string;
}

interface Product {
  location: String;
  category_id: number;
  image_urls: string[];
  job_location: string;
  id: number;
  name: string;
  description: string;
  price: string;
  country: string;
  salary: string;
}

const Searchform: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data); // Update categories with fetched data
      } catch (err) {
        setError("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent form submission

    if (!selectedCategory || !selectedCountry) {
      setError("Please select a category and a country before searching.");
      return;
    }

    try {
      const categoryToSearch = selectedCategory.toLowerCase();

      // Fetch all products for the selected category
      const response = await axiosInstance.get(`/${categoryToSearch}`);
      const allProducts: Product[] = response.data;

      // Filter products based on country and keyword
      const filteredProducts = allProducts.filter(
        (product) =>
          product.job_location.toLowerCase() ||
          (product.location.toLowerCase() ===
            selectedCountry.toLowerCase() &&
            product.name.toLowerCase().includes(searchKeyword.toLowerCase()))
      );

      if (filteredProducts.length === 0) {
        setError("No products found matching your criteria.");
      } else {
        setError(null); // Reset error if products are found

        // Navigate to search page with productId and category as query params
      const productsJson = JSON.stringify(filteredProducts);

      // Update the query parameters with your custom ones
  router.push(
    `/search?category=${encodeURIComponent(
      categoryToSearch
    )}&products=${encodeURIComponent(productsJson)}`
  );
      } 
    } catch (err) {
      console.error("Error fetching products:", err); // Log the error
      setError("Failed to fetch products for the selected category.");
    }
  };

  return (
    <section className="w3l-search-form-3-main">
      <div className="search-form-3">
        <div className="wrapper">
          <div className="section-width">
            <form onSubmit={handleSearch} className="search-3-gd">
              <div className="d-flex grids-icon ">
                <span className="fa fa-text-height" aria-hidden="true"></span>
                <input
                  type="search"
                  name="text"
                  placeholder="Enter Keywords here.."
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  required
                />
              </div>
              <div className="d-flex grids-icon grids-icon-2">
                <div className="input-group-btn">
                  <select
                    className="btn btn-default -mt-2"
                    name="category"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Select Category
                    </option>
                    {loading ? (
                      <option>Loading categories...</option>
                    ) : error ? (
                      <option>{error}</option>
                    ) : (
                      categories.map((category) => (
                        <option key={category.id} value={category.name}>
                          {category.name}
                        </option>
                      ))
                    )}
                  </select>
                </div>
              </div>
              <div className="d-flex grids-icon grids-icon-2">
                <div className="input-group-btn">
                  <select
                    className="btn btn-default -mt-2"
                    name="country"
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Select Country
                    </option>
                    <option value="test">test</option>
                    <option value="maseru">Maseru</option>
                    <option value="mafeteng">Mafeteng</option>
                    <option value="leribe">Leribe</option>
                    <option value="berea">Berea</option>
                    <option value="thaba-tseka">Thaba Tseka</option>
                    <option value="botha-buthe">Botha Buthe</option>
                    <option value="mokhotlong">Mokhotlong</option>
                    <option value="quthing">Quthing</option>
                    <option value="qach">Qacha</option>
                    {/* Add other countries as needed */}
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="btn button-eff"
                style={{ marginTop: "-0.1px" }}
              >
                <span className="fa fa-search" aria-hidden="true"></span>Search
              </button>
            </form>

            {error && <p className="error">{error}</p>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Searchform;
