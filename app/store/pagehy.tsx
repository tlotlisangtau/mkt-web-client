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
  salary: string;
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

const types = ["Type", "Football", "Rugby", "Basketball", "Tennis", "Cricket"];
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

interface ProductsByCategory {
  [categoryName: string]: Product[];
}

interface CategoryCounts {
  [key: string]: number;
}

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
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [userId, setUserId] = useState<number | null>(null);
  const searchParams = useSearchParams();
  const productId = Number(searchParams.get('productId'));
  const category = searchParams.get('category');
  const [productsByCategory, setProductsByCategory] =
    useState<ProductsByCategory>({});
    const [categoryCounts, setCategoryCounts] = useState<CategoryCounts>({});

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
          "https://ikahemarketapp-b1c3e9e6f70a.herokuapp.com/api/sports"
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
      (selectedType === "Type" || product.type === selectedType) &&
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
              <li className="active">Sport Ads</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="w3l-products-page w3l-blog-single w3l-products-4">
        <div className="single blog">
          <div className="wrapper">
          <div className="sellerProfile">

              <div className="Profile">
                <div className="avatar-box">
                  <div className="avatar">
                    A
                  </div>
                </div>
              </div> 
              <div className="avatar-text">
                <h1 className="heading">jvbkbhcxkbhcx</h1>
              </div>
            </div>

            <section id="content1" className="tab-content text-left">
            {Object.entries(productsByCategory).map(
              ([categoryName, products]) => {
                const count = categoryCounts[categoryName.toLowerCase()] || 0;

                if (count === 0) return null;

                // Get the last 3 products for this category and reverse the order for right-to-left display
                const lastProducts = products.slice(-3).reverse();

                // Find category ID for the current categoryName
                const categoryID = Object.keys(categoryMappings).find(
                  (key) => categoryMappings[+key] === categoryName.toLowerCase()
                );

                return (
                  <div key={categoryName}>
                    <h3 style={{ marginTop: "8px", marginBottom: "8px" }}>
                      <span style={{ fontWeight: "bold" }}>
                        {categoryName.toUpperCase()} ({count})
                      </span>{" "}
                      <a
                        href={`/category/${categoryName
                          .toLowerCase()
                          .replace(/ & /g, "_")
                          .replace(/ /g, "_")}`}
                      >
                        <i>view all</i>
                      </a>
                    </h3>
                    <div className="d-grid grid-col-3">
                      {lastProducts.map((product) => (
                        <div className="  " key={product.id}>
                          <Carousel showThumbs={false} infiniteLoop>
                            {getImageUrlsArray(product.image_urls).map(
                              (imageUrl, index) => (
                                <div key={index}>
                                  <img
                                    src={imageUrl}
                                    className="img-responsive"
                                    alt={`Image ${index + 1}`}
                                  />
                                </div>
                              )
                            )}
                          </Carousel>
                          <div className="info-bg">
                            <h5>
                              <a
                                href={`/Productdetail?productId=${
                                  product.id
                                }&category=${
                                  categoryMappings[product.category_id] ||
                                  "unknown"
                                }`}
                              >
                                {product.name}
                              </a>
                            </h5>
                            <p>
                              {truncateDescription(product.description, 35)}
                            </p>
                            <ul className="d-flex">
                              <li>
                                <span className="fa fa"></span>R{" "}
                                {product.price || product?.salary}
                              </li>
                              <li className="margin-effe">
                                <a href="#fav" title="Add this to Favorite">
                                  {/* 
                                  <span className="fa fa-heart"></span>
                                  */}
                                </a>
                              </li>
                              
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }
            )}
          </section>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ProductList;
