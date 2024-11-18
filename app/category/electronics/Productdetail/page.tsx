"use client";

import React, { useEffect, useState, Suspense, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import "@/styles/globals.css";
import "@/styles/style.css";
import Nav from "@/components/Nav";
import Footer from "@/components/footer";
import BuyerInformation from "@/components/BuyerInformation";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import SafetyTips from "@/components/SafetyTips";

interface Product {
  id: number;
  name: string;
  brand: string;
  model: string;
  condition: string;
  description: string;
  mobile_number: string;
  department: string;
  image_urls: string[];
  location: string;
  company: string;
  created_at: string;
  price: string;
  valid_until: string;
  category: string;
}

const ProductDetail: React.FC = () => {
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Dummy refs
  const latestAdsRef = useRef<HTMLDivElement>(null);
  const whyChooseUsRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        setError("Product ID is missing");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://ikahemarketapp-b1c3e9e6f70a.herokuapp.com/api/electronics/${productId}/`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: Product = await response.json();
        setProduct(data);
      } catch (error: any) {
        console.error("Fetch error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
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
                {product ? product.name : "Loading..."}
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="w3l-products-page w3l-blog-single w3l-products-4">
        <div className="single blog">
          <div className="wrapper">
            <h3 className="title-main">
              {product ? product.name : "Loading..."}
            </h3>
            <div className="grid-colunm-2 d-flex">
              <div className="tab-content text-left single-left-content left-product-sing">
                <h3 className="aside-title single-prt">
                  {product ? product.name : "Loading..."}
                </h3>

                <br />
                {error && <p>Error: {error}</p>}
                {!loading && !error && product?.image_urls && (
                  <Carousel showThumbs={false} infiniteLoop>
                    {product.image_urls.map((url, index) => (
                      <div key={index}>
                        <img
                          src={url}
                          alt={`Image ${index + 1}`}
                          className="carousel-image"
                        />
                      </div>
                    ))}
                  </Carousel>
                )}

                <div className="top-sing-sec">
                  <h3 className="aside-title">Ad Details</h3>
                  {product && (
                    <div>
                      <p>{product.description}</p>
                    </div>
                  )}

                  <h3 className="aside-title top-sec-space">Features</h3>
                  <div className="map-single product-details-top">
                    <div className="d-grid some-text-spe">
                      <div className="left-cont">
                        {product && (
                          <>
                            <h4>
                              <span className="w3layouts-agileinfo">
                                Price{" "}
                              </span>{" "}
                              : <p>M {product.price}</p>
                            </h4>

                            <h4>
                              <span className="w3layouts-agileinfo">
                                Brand{" "}
                              </span>{" "}
                              : <p>{product.brand} </p>
                            </h4>
                            <h4>
                              <span className="w3layouts-agileinfo">
                                Model{" "}
                              </span>{" "}
                              : <p>{product.model} </p>
                            </h4>
                            <h4>
                              <span className="w3layouts-agileinfo">
                                Location{" "}
                              </span>{" "}
                              : <p>{product.location}</p>
                            </h4>
                            <h4>
                              <span className="w3layouts-agileinfo">
                                Condition{" "}
                              </span>{" "}
                              :{" "}
                              <p>
                               {product.condition}
                              </p>
                            </h4>
                            <h4>
                              <span className="w3layouts-agileinfo">
                                Posted on{" "}
                              </span>{" "}
                              :{" "}
                              <p>
                                  {" "}
                                  {formatDate(product.created_at)}
                              </p>
                            </h4>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <SafetyTips />
                </div>
              </div>
              <BuyerInformation />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </Suspense>
  );
};

export default ProductDetail;
