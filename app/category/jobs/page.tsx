'use client';

import React, { useEffect, useState } from 'react';
import '../../../styles/globals.css';
import '../../../styles/style.css';
import Nav from '@/components/Nav';
import RightSideBar from '@/components/rightSideBar';
import Footer from '@/components/footer';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { categoryMappings } from '@/utils/categoryMappings';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_urls: string[];
  category_id: number;
  created_at: string;
  job_location: string;
  department: string; // Add department field
}

const departments = [
  'None',
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



const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const [selectedFilter, setSelectedFilter] = useState<string>('None'); // Default filter is 'None'
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/jobs');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          setError('Data format is incorrect');
        }
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(
    product => selectedFilter === 'None' || product.department === selectedFilter
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter);
    setIsDropdownOpen(false); 
    setCurrentPage(1); // Reset to the first page when filter changes
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <Nav />
      <section className="w3l-inner-banner-main">
        <div className="about-inner inner2">
          <div className="wrapper seen-w3">
            <ul className="breadcrumbs-custom-path">
              <li><a href="/">Home</a></li>
              <li><span className="fa fa-angle-right" aria-hidden="true"></span></li>
              <li className="active">All Ads</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="w3l-products-page w3l-blog-single w3l-products-4">
        <div className="single blog">
          <div className="wrapper">
            <h3 className="title-main">Jobs Category</h3>
            <div className="d-grid grid-colunm-2 grid-colunm">

            <div className="right-side-bar">
              <aside>
                <h3 className="aside-title mb-3">Filter Ads</h3>
                <form className="form-inline search-form" action="#" method="post">
                  <input className="form-control" type="search" placeholder="Search here..." aria-label="email" required />
                  <button className="btn search" type="submit"><span className="fa fa-search"></span></button>
                  <button className="btn reset" type="reset" title="Reset Search"><span className="fa fa-repeat"></span></button>
                </form>
                <div className="filter-dropdown-container">
                  <input
                    type="text"
                    placeholder="filter with.."
                    className="filter-input"
                    onClick={handleDropdownToggle}
                    value={selectedFilter}
                    readOnly
                  />
                  {isDropdownOpen && (
                    <ul className="filter-dropdown-menu">
                      {departments.map((department, index) => (
                        <li
                          key={index}
                          className="filter-dropdown-item"
                          onClick={() => handleFilterSelect(department)}
                        >
                          {department}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </aside>
              <aside className="posts p-4 border">
                <h3 className="aside-title">All Categories</h3>
                <ul className="category">
                  <li><a href="product-1.html"><span className="fa fa-laptop"></span>Electronics <label>(11)</label></a></li>
                  <li><a href="product-2.html"><span className="fa fa-bed"></span>Furniture <label>(24)</label></a></li>
                  <li><a href="product-3.html"><span className="fa fa-briefcase"></span>Jobs <label>(18)</label></a></li>
                  <li><a href="product-4.html"><span className="fa fa-home"></span>Real Estate <label>(08)</label></a></li>
                  <li><a href="product-5.html"><span className="fa fa-futbol-o"></span>Sports <label>(38)</label></a></li>
                  <li><a href="product-6.html"><span className="fa fa-heart"></span>Health & Beauty <label>(26)</label></a></li>
                </ul>
              </aside>
              <aside className="posts p-4 border">
                <h3 className="aside-title">Premium Ads</h3>
                <div className="posts-grid">
                  <a href="blog-single.html">
                    <img src="assets/images/b1.jpg" alt=" " className="img-responsive img-thumbnail" />
                  </a>
                  <a href="blog-single.html">
                    <img src="assets/images/b2.jpg" alt=" " className="img-responsive img-thumbnail" />
                  </a>
                  <a href="blog-single.html">
                    <img src="assets/images/b3.jpg" alt=" " className="img-responsive img-thumbnail" />
                  </a>
                </div>
              </aside>
              
              <aside>
                <h3 className="aside-title mb-3">Advertisement</h3>
                <img src="assets/images/screen.jpg" alt="" className="img-fluid img-responsive" />
              </aside>
            </div>

              <div className="tab-content text-left">
                <aside className="top-border d-flex">
                  <h3 className="aside-title mb-3">Showing {filteredProducts.length === 0 ? 0 : startIndex + 1}–{Math.min(startIndex + itemsPerPage, filteredProducts.length)} of {filteredProducts.length} results</h3>
                  <div className="input-group-btn">
                    <select className="btn btn-default" name="ext" required>
                      <option selected>Sort By Date</option>
                      <option>Sort By Expire</option>
                      <option>Sort By Popularity</option>
                      <option>Sort By Price - Ascending</option>
                      <option>Sort By Price - Descending</option>
                    </select>
                  </div>
                </aside>
                <div className="d-grid grid-col-4">
                  {loading && <p>Loading...</p>}
                  {error && <p>Error: {error}</p>}
                  {!loading && !error && (
                    <div className="d-grid grid-col-2">
                      {currentProducts.map(product => (
                        <div className="product" key={product.id}>
                          <Carousel showThumbs={false} infiniteLoop>
                            {product.image_urls.map((imageUrl, index) => (
                              <div key={index}>
                                <img src={imageUrl} className="img-responsive" alt={`Image ${index + 1}`} />
                              </div>
                            ))}
                          </Carousel>
                          <div className="info-bg">
                            <h5><a href={`/Productdetail?productId=${product.id}&category=${categoryMappings[product.category_id]}`}>{product.name}</a></h5>
                            <p>{product.description}</p>
                            <p>{product.job_location}</p>
                            <ul className="d-flex">
                              <li>{new Date(product.created_at).toLocaleDateString()}</li>
                              <li className="margin-effe">
                                <a href="#fav" title="Add this to Favorite">
                                  <span className="fa fa-heart"></span>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {!loading && !error && filteredProducts.length > 0 && (
                  <div className="pagination">
                    <ul>
                      {[...Array(totalPages)].map((_, index) => (
                        <li key={index}>
                          <button
                            className={currentPage === index + 1 ? 'active' : ''}
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
