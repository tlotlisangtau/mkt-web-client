"use client";

import React, { useEffect, useRef, useState } from "react";
import "../../../styles/globals.css";
import "../../../styles/style.css";
import Nav from "@/components/Nav";
import Footer from "@/components/footer";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { categoryMappings } from "@/utils/categoryMappings";
import { jwtDecode } from "jwt-decode";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_urls: string[];
  category_id: number;
  created_at: string;
  location: string;
  condition: string;
  others_types: string;
}

interface DecodedToken {
  user_id: number;
}

// Function to calculate relative time
const timeAgo = (dateString: string) => {
  const now = new Date();
  const createdTime = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - createdTime.getTime()) / 1000);

  const intervals: { [key: string]: number } = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  for (let key in intervals) {
    const interval = intervals[key];
    const timePassed = Math.floor(diffInSeconds / interval);
    if (timePassed >= 1) {
      return `${timePassed} ${key}${timePassed > 1 ? "s" : ""} ago`;
    }
  }
  return "Just now";
};

const types = ["Type", "Men", "Women", "Kids", "Others"];
const locations = [
  "Location",
  "Maseru",
  "Leribe",
  "Qacha",
  "Berea",
  "Mafeteng",
  "Mokhotlong",
  "Thaba-Tseka",
  "Botha-Buthe",
  "Quthing",
  "Mafeteng",
];
const conditions = ["Condition", "New", "Used"]; // "Condition" is the default value

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 4;
  const [selectedType, setSelectedType] = useState<string>("Type"); // Default to "Type"
  const [selectedLocation, setSelectedLocation] = useState<string>("Location"); // Default to "Location"
  const [selectedCondition, setSelectedCondition] = useState<string>("Condition");   // Default to "Condition"
  const [minPrice, setMinPrice] = useState<number | ''>('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState<boolean>(false);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState<boolean>(false);
  const [isConditionDropdownOpen, setIsConditionDropdownOpen] = useState<boolean>(false);
  const [sortOption, setSortOption] = useState<string>("date");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
      const latestAdsRef = useRef<HTMLDivElement>(null);
      const whyChooseUsRef = useRef<HTMLDivElement>(null);
      const categoriesRef = useRef<HTMLDivElement>(null);
      const typeDropdownRef = useRef<HTMLDivElement>(null);
      const locationDropdownRef = useRef<HTMLDivElement>(null);
      const conditionDropdownRef = useRef<HTMLDivElement>(null);

      const tabContentRef = useRef<HTMLDivElement>(null);

      useEffect(() => {
        if (tabContentRef.current) {
          tabContentRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, [currentPage]);
      

      useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          if (
            typeDropdownRef.current &&
            !typeDropdownRef.current.contains(event.target as Node)
          ) {
            setIsTypeDropdownOpen(false);
          }
          if (
            locationDropdownRef.current &&
            !locationDropdownRef.current.contains(event.target as Node)
          ) {
            setIsLocationDropdownOpen(false);
          }
          if (
            conditionDropdownRef.current &&
            !conditionDropdownRef.current.contains(event.target as Node)
          ) {
            setIsConditionDropdownOpen(false);
          }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, []);


  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://ikahemarketapp-b1c3e9e6f70a.herokuapp.com/api/others"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          setError("Data format is incorrect");
        }
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Update URL parameters based on state
    const params = new URLSearchParams();
    if (selectedType !== "Type") params.set('type', selectedType);
    if (selectedLocation !== "Location") params.set('location', selectedLocation);
    if (selectedCondition !== "Condition") params.set('condition', selectedCondition);
    if (minPrice !== '') params.set('min_price', minPrice.toString());
    if (maxPrice !== '') params.set('max_price', maxPrice.toString());
    if (searchQuery !== '') params.set('search', searchQuery);
    params.set('sort', sortOption);
    params.set('page', currentPage.toString());

    window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
  }, [selectedType, selectedLocation, selectedCondition, minPrice, maxPrice, searchQuery, sortOption, currentPage]);

  const filteredProducts = products.filter((product) => {
    return (
      (selectedType === "Type" || product.others_types === selectedType) &&
      (selectedLocation === "Location" || product.location === selectedLocation) &&
      (selectedCondition === "Condition" || product.condition === selectedCondition) &&
      (minPrice === '' || product.price >= minPrice) &&
      (maxPrice === '' || product.price <= maxPrice) &&
      (searchQuery === '' || product.name.toLowerCase().includes(searchQuery.toLowerCase()) || product.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  const sortedProducts = filteredProducts.sort((a, b) => {
    switch (sortOption) {
      case "name":
        return a.name.localeCompare(b.name);
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "date":
      default:
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
  });

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = sortedProducts.slice(startIndex, startIndex + itemsPerPage);


  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
    setIsTypeDropdownOpen(false);
    setCurrentPage(1);
  };

  const handleLocationSelect = (location: string) => {
    if (location !== "Location") { 
      setSelectedLocation(location);
      setIsLocationDropdownOpen(false);
      setCurrentPage(1);
    }
  };

  const handleConditionSelect = (condition: string) => {
    setSelectedCondition(condition);
    setCurrentPage(1);
    setIsConditionDropdownOpen(false);
    setCurrentPage(1);
  };
  const handleTypeDropdownToggle = () => {
    setIsTypeDropdownOpen((prev) => !prev);
  };

  const handleLocationDropdownToggle = () => {
    setIsLocationDropdownOpen((prev) => !prev);
  };

  const handleConditionDropdownToggle = () => {
    setIsConditionDropdownOpen((prev) => !prev);
  };

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(event.target.value);
    setCurrentPage(1);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const getImageUrlsArray = (urls: any): string[] => {
    if (!urls || typeof urls === 'string' && urls.trim() === '') {
      return [];
    }
    return Array.isArray(urls) ? urls : [urls];
  };

    const truncateDescription = (description: string, maxLength: number) => {
      if (description.length > maxLength) {
        return description.substring(0, maxLength) + "...";
      }
      return description;
    };

    const handleFavoriteClick = async (
      productId: number,
      category: string,
      name: string,
      description: string,
      price: number,
      imageUrls: string[]
    ) => {
      try {
        const token = localStorage.getItem('accessToken');
    
        if (token) {
          try {
            const decodedToken = jwtDecode<DecodedToken>(token);
            console.log("Decoded Token:", decodedToken);
    
            const user_id = decodedToken.user_id;
            
            const response = await fetch(`http://127.0.0.1:8000/favorites/`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                user_id: user_id,
                object_id: productId,
                content_type: category,
                name: name,
                description: description,
                price: price,
                image_urls: imageUrls,
              }),
            });
    
            if (response.ok) {
              const data = await response.json();
              setFavorites((prevFavorites) => [...prevFavorites, data.id]);
            } else {
              alert('Failed to add to favorites');
            }
          } catch (error) {
            console.error("Error decoding token:", error);
          }
        } else {
          console.error("No token found in localStorage");
        }
      } catch (error) {
        console.error('Error adding to favorites:', error);
        alert('Something went wrong. Please try again later.');
      }
    };

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
              <li className="active">General Ads</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="w3l-products-page w3l-blog-single w3l-products-4">
        <div className="single blog">
          <div className="wrapper">
            <h3 className="title-main" ref={tabContentRef}>Others</h3>
            <div className="d-grid grid-colunm-2 grid-colunm">
              <div className="right-side-bar">
                <aside>
                  <h3 className="aside-title mb-3">Filter Ads</h3>
                  <form
                    className="form-inline search-form"
                    action="#"
                    method="post"
                  >
                    <input
                      className="form-control"
                      type="search"
                      placeholder="Search here..."
                      aria-label="search"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      required
                    />
                    <button
                      className="btn search"
                      style={{ marginTop: "3.7px" }}
                      type="submit"
                    >
                      <span className="fa fa-search"></span>
                    </button>
                    <button
                      className="btn reset"
                      type="reset"
                      title="Reset Search"
                    >
                      <span className="fa fa-repeat"></span>
                    </button>
                  </form>

                  {/* Type Filter */}
                  {/* Type Filter */}
                  <div
                    className="filter-dropdown-container"
                    ref={typeDropdownRef}
                  >
                    <input
                      type="text"
                      placeholder="Filter by type..."
                      className="filter-input"
                      onClick={() => setIsTypeDropdownOpen((prev) => !prev)}
                      value={selectedType}
                      readOnly
                    />
                    {isTypeDropdownOpen && (
                      <ul className="filter-dropdown-menu">
                        {types.map((type, index) => (
                          <li
                            key={index}
                            className="filter-dropdown-item"
                            onClick={() => handleTypeSelect(type)}
                          >
                            {type}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Location Filter */}
                  <div
                    className="filter-dropdown-container"
                    ref={locationDropdownRef}
                  >
                    <input
                      type="text"
                      placeholder="Filter by location..."
                      className="filter-input"
                      onClick={() =>
                        setIsLocationDropdownOpen((prev) => !prev)
                      }
                      value={selectedLocation}
                      readOnly
                    />
                    {isLocationDropdownOpen && (
                      <ul className="filter-dropdown-menu">
                        {locations.map((location, index) => (
                          <li
                            key={index}
                            className={`filter-dropdown-item ${location === "Location" ? "unselectable" : ""}`}
                            onClick={() => handleLocationSelect(location)}
                          >
                            {location}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Condition Filter */}
                  <div
                    className="filter-dropdown-container"
                    ref={conditionDropdownRef}
                  >
                    <input
                      type="text"
                      placeholder="Filter by condition..."
                      className="filter-input"
                      onClick={() =>
                        setIsConditionDropdownOpen((prev) => !prev)
                      }
                      value={selectedCondition}
                      readOnly
                    />
                    {isConditionDropdownOpen && (
                      <ul className="filter-dropdown-menu">
                        {conditions.map((condition, index) => (
                          <li
                            key={index}
                            className="filter-dropdown-item"
                            onClick={() => handleConditionSelect(condition)}
                          >
                            {condition}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Price Range Filter */}
                  <div className="price-range-filter">
                    <label>Price Range</label>
                    <input
                      type="number"
                      placeholder="Min Price"
                      value={minPrice === "" ? "" : minPrice}
                      onChange={handleMinPriceChange}
                    />
                    <input
                      type="number"
                      placeholder="Max Price"
                      value={maxPrice === "" ? "" : maxPrice}
                      onChange={handleMaxPriceChange}
                    />
                  </div>
                </aside>
              </div>

              <div className="tab-content text-left">
                <aside className="top-border d-flex">
                  <h3 className="aside-title mb-3">
                    Showing{" "}
                    {filteredProducts.length === 0 ? 0 : startIndex + 1}–
                    {Math.min(
                      startIndex + itemsPerPage,
                      filteredProducts.length
                    )}{" "}
                    of {filteredProducts.length} results
                  </h3>
                  <div className="input-group-btn">
                    <label htmlFor="Sort By :">Sort By :</label>
                    <select
                      id="sort"
                      value={sortOption}
                      onChange={handleSortChange}
                      className="sort"
                    >
                      <option value="date">Date</option>
                      <option value="name">Name</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                    </select>
                  </div>
                </aside>
                <div className="d-grid grid-col-4">
                  {loading && <p>Loading...</p>}
                  {error && <p>Error: {error}</p>}
                  {!loading && !error && (
                    <div className="d-grid grid-col-2">
                      {currentProducts.map((product) => (
                        <div className="product" key={product.id}>
                          <Carousel showThumbs={false} infiniteLoop>
                            {getImageUrlsArray(product.image_urls).map(
                              (url, index) => (
                                <div key={index}>
                                  <img src={url} alt={product.name} />
                                </div>
                              )
                            )}
                          </Carousel>
                          <a
                            href={`/category/others/Productdetail?productId=${
                                  product.id
                                }&category=${
                                  categoryMappings[product.category_id]
                                }`}
                              >
                          <div className="info-bg">
                            <h5> <b>
                                {product.name}
                                </b>
                            </h5>
                            <p>
                              {truncateDescription(product.description, 35)}
                            </p>
                            <p>{product.location}</p>
                            <p>Condition: {product.condition}</p>
                            <p>Price: R{product.price}</p>
                            <ul className="d-flex">
                                <li>{timeAgo(product.created_at)}</li>

                                  <li key={product.id} className="margin-effe">
                                <a
                                  title="Add this to Favorite"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleFavoriteClick(
                                      product.id,
                                      categoryMappings[product.category_id],
                                      product.name,                        
                                      product.description,                  
                                      product.price,                        
                                      product.image_urls                   
                                    );
                                  }}
                                >
                                  <span className="fa fa-heart"></span>
                                </a>
                              </li>


                              </ul>
                          </div>
                          </a>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {!loading && !error && filteredProducts.length > 0 && (
                  <div className="pagination">
                    <ul className="num">
                      {[...Array(totalPages)].map((_, index) => (
                        <li key={index}>
                          <button
                            className={
                              currentPage === index + 1 ? "active" : ""
                            }
                            onClick={() => handlePageChange(index + 1)}
                          >
                            {index + 1}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ProductList;
