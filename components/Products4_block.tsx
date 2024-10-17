"use client";
import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel"; // Import Carousel
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import Carousel styles
import { getCategoriesData } from "../services/productService";
import { getPromotions } from "../services/promotionService";
import { getCategoryCounts } from "../services/categoryService";
import { categoryMappings } from "@/utils/categoryMappings";
import "../styles/style.css";

// Type definitions
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  salary: string;
  image_urls: string[];
  category_id: number;
}

interface CategoryCounts {
  [key: string]: number;
}

interface ProductsByCategory {
  [categoryName: string]: Product[];
}

// Utility function to format date as D-M-Y
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

// Utility function to filter promotions ending in less than 3 days
const isEndingSoon = (endDateString: string) => {
  const now = new Date();
  const endDate = new Date(endDateString);
  const timeDiff = endDate.getTime() - now.getTime();
  const daysDiff = timeDiff / (1000 * 3600 * 24);
  return daysDiff <= 3;
};

const Products4Block: React.FC = () => {
  const [productsByCategory, setProductsByCategory] =
    useState<ProductsByCategory>({});
  const [promotions, setPromotions] = useState<any[]>([]);
  const [categoryCounts, setCategoryCounts] = useState<CategoryCounts>({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getCategoriesData();
        setProductsByCategory(data); // Ensure this is an object where keys are category names
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    const fetchPromotions = async () => {
      try {
        const data = await getPromotions();
        setPromotions(data);
      } catch (error) {
        console.error("Failed to fetch promotions:", error);
      }
    };

    const fetchItemCounts = async () => {
      try {
        const data = await getCategoryCounts();
        setCategoryCounts(data);
      } catch (error) {
        console.error("Failed to fetch item counts:", error);
      }
    };

    fetchProducts();
    fetchPromotions();
    fetchItemCounts();
  }, []);

  const endingSoonPromotions = promotions.filter((promotion) =>
    isEndingSoon(promotion.end_date)
  );

  const getImageUrlsArray = (urls: any): string[] => {
    console.log("Image URLs:", urls);
    console.log("Type of image_urls:", Array.isArray(urls));
    if (!urls || (typeof urls === "string" && urls.trim() === "")) {
      return [];
    }
    return Array.isArray(urls) ? urls : [urls];
  };

  return (
    <div className="w3l-products-4">
      <div id="products4-block" className="text-center">
        <div className="wrapper">
          <input id="tab1" type="radio" name="tabs" defaultChecked />
          <label className="tabtle" htmlFor="tab1">
            Latest Ads
          </label>

          <input id="tab2" type="radio" name="tabs" />
          <label className="tabtle" htmlFor="tab2">
            Featured Ads
          </label>

          <input id="tab3" type="radio" name="tabs" />
          <label className="tabtle" htmlFor="tab3">
            Ending Soon
          </label>

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
                        <div className="product" key={product.id}>
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
                            <p>{product.description}</p>
                            <ul className="d-flex">
                              <li>
                                <span className="fa fa"></span>R{" "}
                                {product.price || product?.salary}
                              </li>
                              <li className="margin-effe">
                                <a href="#fav" title="Add this to Favorite">
                                  <span className="fa fa-heart-o"></span>
                                </a>
                              </li>
                              <li>
                                <a href="#share" title="Share">
                                  <span className="fa fa-share"></span>
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

          <section id="content2" className="tab-content text-left">
            <div className="d-grid grid-col-3">
              {promotions.map((promotion) => (
                <div className="product" key={promotion.id}>
                  <div className="product-image-wrapper">
                    <a href={`promotion-${promotion.id}.html`}>
                      <img
                        src={promotion.image_url || "/Images/c2.jpg"}
                        className="img-responsive"
                        alt={`Promotion ${promotion.id}`}
                      />
                    </a>
                  </div>
                  <div className="info-bg">
                    <h5>
                      <a href={`promotion-${promotion.id}.html`}>
                        Promotion {promotion.id}
                      </a>
                    </h5>
                    <p>End Date: {formatDate(promotion.end_date)}</p>
                    <ul className="d-flex">
                      <li>
                        <span className="fa fa"></span>R{" "}
                        {promotion.price || promotion?.salary}
                      </li>
                      <li className="margin-effe">
                        <a href="#fav" title="Add this to Favorite">
                          <span className="fa fa-heart-o"></span>
                        </a>
                      </li>
                      <li>
                        <a href="#share" title="Share">
                          <span className="fa fa-share"></span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="content3" className="tab-content text-left">
            <div className="d-grid grid-col-3">
              {endingSoonPromotions.map((promotion) => (
                <div className="product" key={promotion.id}>
                  <a href={`promotion-${promotion.id}.html`}>
                    <img
                      src={promotion.image_url || "/Images/c3.jpg"}
                      className="product-image"
                      alt={`Promotion ${promotion.id}`}
                    />
                  </a>
                  <div className="info-bg">
                    <h5>
                      <a href={`promotion-${promotion.id}.html`}>
                        Promotion {promotion.id}
                      </a>
                    </h5>

                    <p>End Date: {formatDate(promotion.end_date)}</p>
                    <ul className="d-flex">
                      <li>
                        <span className="fa "></span>R{" "}
                        {promotion.price || promotion?.salary}
                      </li>
                      <li className="margin-effe">
                        <a href="#fav" title="Add this to Favorite">
                          <span className="fa fa-heart-o"></span>
                        </a>
                      </li>
                      <li>
                        <a href="#share" title="Share">
                          <span className="fa fa-share"></span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Products4Block;
