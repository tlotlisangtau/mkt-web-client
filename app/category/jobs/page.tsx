'use client';

import React, { useEffect, useRef, useState } from 'react';
import '../../../styles/globals.css';
import '../../../styles/style.css';
import Nav from '@/components/Nav';
import RightSideBar from '@/components/rightSideBar';
import Footer from '@/components/footer';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { categoryMappings } from '@/utils/categoryMappings';
import { jwtDecode } from "jwt-decode";
import { toast, Toaster } from "react-hot-toast";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  salary: string;
  image_urls: string[];
  category_id: number;
  created_at: string;
  job_location: string;
  department: string; // Add department field
}

interface DecodedToken {
  user_id: number;
}

const departments = [
  'Department',
  'Sale & Marketing',
  'IT & Engineering',
  'Finance & Accounting',
  'Human Resources & Legal',
  'Agriculture & Farm',
  'Healthcare & Nursing',
  'Manufacturing & Retail',
  'Government & NGO',
  'Others'
];

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

const ProductList: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<string>("Location");
  const [selectedDepartment, setSelectedDepartment] =
    useState<string>("Department");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const [sortOption, setSortOption] = useState<string>("date");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [isDepartmentDropdownOpen, setIsDepartmentDropdownOpen] =
    useState<boolean>(false);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] =
    useState<boolean>(false);
    const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("None"); // Default filter is 'None'
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const departmentDropdownRef = useRef<HTMLDivElement>(null);
    const locationDropdownRef = useRef<HTMLDivElement>(null);

  const latestAdsRef = useRef<HTMLDivElement>(null);
  const whyChooseUsRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);

  const tabContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tabContentRef.current) {
      tabContentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentPage]);
  


  // Handle click outside dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        departmentDropdownRef.current &&
        !departmentDropdownRef.current.contains(event.target as Node) &&
        locationDropdownRef.current &&
        !locationDropdownRef.current.contains(event.target as Node)
      ) {
        setIsDepartmentDropdownOpen(false);
        setIsLocationDropdownOpen(false);
      }
    };

    // Add event listener for clicks outside
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://ikahemarketapp-b1c3e9e6f70a.herokuapp.com/api/jobs/"
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
    if (selectedDepartment !== "Department")
      params.set("department", selectedDepartment);
    if (selectedLocation !== "Location")
      params.set("location", selectedLocation);
    if (minPrice !== "") params.set("min_price", minPrice.toString());
    if (maxPrice !== "") params.set("max_price", maxPrice.toString());
    if (searchQuery !== "") params.set("search", searchQuery);
    params.set("sort", sortOption);
    params.set("page", currentPage.toString());

    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${params.toString()}`
    );
  }, [
    selectedDepartment,
    selectedLocation,
    minPrice,
    maxPrice,
    searchQuery,
    sortOption,
    currentPage,
  ]);

  const filteredProducts = products.filter((product) => {
    return (
      (selectedDepartment === "Department" ||
        product.department === selectedDepartment) &&
      (selectedLocation === "Location" ||
        product.job_location === selectedLocation) &&
      (minPrice === "" || product.price >= minPrice) &&
      (maxPrice === "" || product.price <= maxPrice) &&
      (searchQuery === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()))
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
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
    }
  });

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = sortedProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleDepartmentSelect = (department: string) => {
    setSelectedDepartment(department);
    setIsDepartmentDropdownOpen(false);
    setCurrentPage(1);
  };

  const handleLocationSelect = (job_location: string) => {
    if (job_location !== "Location") { 
      setSelectedLocation(job_location);
      setIsLocationDropdownOpen(false);
      setCurrentPage(1);
    }
  };

  const handleDepartmentDropdownToggle = () => {
    setIsDepartmentDropdownOpen((prev) => !prev);
  };

  const handleLocationDropdownToggle = () => {
    setIsLocationDropdownOpen((prev) => !prev);
  };

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(event.target.value === "" ? "" : Number(event.target.value));
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
    if (!urls || (typeof urls === "string" && urls.trim() === "")) {
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
    price: string,
    imageUrls: string[]
  ) => {
    try {
      const token = localStorage.getItem('accessToken');
  
      if (token) {
        const decodedToken = jwtDecode<DecodedToken>(token);
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
  
        const data = await response.json();
  
        if (response.ok) {
          setFavorites((prevFavorites) => [...prevFavorites, data.id]);
          toast.success(data.message || 'Product added to favorites!', {
            style: { background: 'blue', color: 'white' },
            duration: 1000,
          });
        } else {
          toast.error(data.error || 'Failed to add to favorites');
        }
      } else {
        toast.error("You must be logged in to add favorites.");
      }
    } catch (error) {
      console.error('Error adding to favorites:', error);
      toast.error("Something went wrong. Please try again later.");
    }
  };
  
  

  return (
    <>
    <Toaster position="top-center" reverseOrder={false} />
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
              <li className="active">All Ads</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="w3l-products-page w3l-blog-single w3l-products-4">
        <div className="single blog">
          <div className="wrapper">
            <h3 className="title-main" ref={tabContentRef}>Jobs</h3>
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
                      <span
                        className="fa fa-search"
                        style={{ margin: "auto" }}
                      ></span>
                    </button>
                    <button
                      className="btn reset"
                      type="reset"
                      title="Reset Search"
                    >
                      <span className="fa fa-repeat"></span>
                    </button>
                  </form>

                  {/* Department Dropdown */}
                  <div
                    className="filter-dropdown-container"
                    ref={departmentDropdownRef}
                  >
                    <input
                      type="text"
                      placeholder="Filter by department..."
                      className="filter-input"
                      onClick={handleDepartmentDropdownToggle}
                      value={selectedDepartment}
                      readOnly
                    />
                    {isDepartmentDropdownOpen && (
                      <ul className="filter-dropdown-menu">
                        {departments.map((department, index) => (
                          <li
                            key={index}
                            className="filter-dropdown-item"
                            onClick={() => handleDepartmentSelect(department)}
                          >
                            {department}
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
                      onClick={handleLocationDropdownToggle}
                      value={selectedLocation}
                      readOnly
                    />
                    {isLocationDropdownOpen && (
                      <ul className="filter-dropdown-menu">
                        {locations.map((job_location, index) => (
                          <li
                            key={index}
                            className={`filter-dropdown-item ${job_location === "Location" ? "unselectable" : ""}`}
                            onClick={() => handleLocationSelect(job_location)}
                          >
                            {job_location}
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

              <div className="tab-content text-left" >
                <aside className="top-border d-flex">
                  <h3 className="aside-title mb-3">
                    Showing {filteredProducts.length === 0 ? 0 : startIndex + 1}
                    –
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
                            {product.image_urls.map((imageUrl, index) => (
                              <div key={index}>
                                <img
                                  src={imageUrl}
                                  className="img-responsive"
                                  alt={`Image ${index + 1}`}
                                />
                              </div>
                            ))}
                          </Carousel>
                          <a
                            href={`/category/jobs/Productdetail?productId=${product.id
                            }&category=${
                              categoryMappings[product.category_id]
                            }`}
                          >
                          <div className="info-bg">
                            <h5><b>
                                {product.name}
                                </b>
                            </h5>
                            <p>
                              {truncateDescription(product.description, 35)}
                            </p>
                            <p>{product.job_location}</p>
                            <p>Price: R{product.salary}</p>
                            <ul className="d-flex">
                                <li>{timeAgo(product.created_at)}</li>

                                  <li key={product.id} className="margin-effe">
                                <a
                                  title="Add this to Favorite"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleFavoriteClick(
                                      product.id,
                                      categoryMappings[product.category_id], // Category
                                      product.name,                         // Product name
                                      product.description,                  // Product description
                                      product.salary,                        // Product price
                                      product.image_urls                    // Product image URLs (assuming this is an array)
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
