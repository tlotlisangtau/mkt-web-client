"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from 'next/navigation';
import "@/styles/globals.css";
import "@/styles/style.css";
import "@/styles/SellerProfile.css";
import Nav from "@/components/Nav";
import Footer from "@/components/footer";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { categoryMappings } from "@/utils/categoryMappings";
import { jwtDecode } from "jwt-decode";
import { toast, Toaster } from "react-hot-toast";

interface Product {
  salary: number;
  id: number;
  name: string;
  description: string;
  price: number;
  image_urls: string[];
  category_id: number;
  created_at: string;
  location: string;
  condition: string;
  type: string;
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

const categories = ['categories','jobs', 'sports', 'furniture', 'electronics', 'automotives', 'others'];



interface ProductsByCategory {
  [categoryName: string]: Product[];
} 

const conditions = ["Condition", "New", "Used"]; // "Condition" is the default value

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsByCategory, setProductsByCategory] = useState<ProductsByCategory>({});
  const itemsPerPage = 4;
  const [selectedType, setSelectedType] = useState<string>("Categories"); // Default to "Type"
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState<boolean>(false);
  const [sortOption, setSortOption] = useState<string>("date");
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [userId, setUserId] = useState<number | null>(null);
  const [totalAds, setTotalAds] = useState<number | null>(null);
  const searchParams = useSearchParams();
  const productId = Number(searchParams.get('productId'));
  const category = searchParams.get('category');
  

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
            const response = await fetch("http://127.0.0.1:8000/api/api/user/1/products/");
            if (!response.ok) throw new Error("Network response was not ok");
        
            const data = await response.json();
            console.log("Fetched Data:", data); 
        

            setProductsByCategory(data);
          } catch (error) {
            setError(error instanceof Error ? error.message : "An unexpected error occurred");
          } finally {
            setLoading(false);
          }
        };
        
        fetchProducts();
      }, []);
    

  useEffect(() => {
    // Update URL parameters based on state
    const params = new URLSearchParams();
    if (selectedType !== "Categories") params.set('categories', selectedType);
    if (searchQuery !== '') params.set('search', searchQuery);
    params.set('sort', sortOption);
    params.set('page', currentPage.toString());

    window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
  }, [selectedType, searchQuery, sortOption, currentPage]);

  const filteredProducts = Object.entries(productsByCategory).flatMap(([categoryName, products]) =>
    products.filter((product) => {
      return (
        (selectedType === "Categories" || categoryMappings[product.category_id] === selectedType) &&
        (searchQuery === '' || product.name.toLowerCase().includes(searchQuery.toLowerCase()) || product.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    })
  );
  

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

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  


  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleTypeSelect = (type: string) => {
    if (type !== 'Categories') {
      setSelectedType(type);
      setIsTypeDropdownOpen(false);
      setCurrentPage(1);
    }
  };

  const handleTypeDropdownToggle = () => {
    setIsTypeDropdownOpen((prev) => !prev);
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
    
    const fetchTotalAds = async (userId: number) => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/user-post-count/1/`
        ); // Adjust your endpoint
        if (!response.ok) throw new Error("Failed to fetch total ads");
        const data = await response.json();
        setTotalAds(data.total_posts); // Assuming the response has a 'count' field
      } catch (error) {
        console.error("Error fetching total ads:", error);
      }
    };

    const getUserIdFromToken = () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        try {
          const decodedToken = jwtDecode<DecodedToken>(token);
          return decodedToken.user_id;
        } catch (error) {
          console.error("Error decoding token:", error);
        }
      }
      return null;
    };

    useEffect(() => {
      const userId = getUserIdFromToken();
      if (userId) {
        fetchTotalAds(userId);
      }
    }, []);
    
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
              <li className="active">Seller Profile</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="w3l-products-page w3l-blog-single w3l-products-4">
        <div className="single blog">
          <div className="wrapper">
            
            <div className="Profile">
                <div className="avatar-box">
                  <div className="avatar">
                    <h1>fffff</h1>
                  </div>
                  <div className="heading">
                    <h4 className="name">tschlier</h4>
                    <h4>Selling for 5 days</h4>
                    <h4>Total Ads {totalAds} | Featured Ads 0</h4>
                  </div>
                </div>
                
              </div> 
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
                  <div className="filter-dropdown-container" ref={typeDropdownRef}>
  <input
    type="text"
    placeholder="Filter by category..."
    className="filter-input"
    onClick={() => setIsTypeDropdownOpen((prev) => !prev)}
    value={selectedType}
    readOnly
  />
  {isTypeDropdownOpen && (
    <ul className="filter-dropdown-menu">
      {categories.map((category, index) => (
        <li
          key={index}
          className="filter-dropdown-item"
          onClick={() => handleTypeSelect(category)}
        >
          {category}
        </li>
      ))}
    </ul>
  )}
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
            {getImageUrlsArray(product.image_urls).map((url, index) => (
              <div key={index}>
                <img src={url} alt={product.name} />
              </div>
            ))}
          </Carousel>
          <a
            href={`/category/${categoryMappings[product.category_id]}/Productdetail?productId=${product.id}&category=${categoryMappings[product.category_id]}`}
          >
            <div className="info-bg">
              <h5><b>{product.name}</b></h5>
              <p>{truncateDescription(product.description, 35)}</p>
              <p>Category: {categoryMappings[product.category_id]}</p>
              <p>Price: R{product.price || product?.salary}</p>
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
