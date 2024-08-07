"use client"
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSignedUrl } from '../../utils/supabaseClient'; // Ensure this function is correctly imported
import '../../styles/globals.css';
import '../../styles/style.css';
import Nav from '@/components/Nav';
import Footer from '@/components/footer';

interface Product {
  id: number;
  name: string;
  description: string;
  price: string; // Assuming price is a string based on your API response
  image_url: string 
  type: string;
  location: string;
  condition: string;
  brand: string;
  size: string;
  color: string;
  other_feature1: string;
  other_feature2: string;
  created_at: string; 
}

const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/products/8/`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Product = await response.json();
        setProduct(data);

        if (data.image_url) {
          // Fetch the signed URL for the product image
          const signedUrl = await getSignedUrl(data.image_url); // Assuming `getSignedUrl` is correct
          setImageUrl(signedUrl);
        }

      } catch (error: any) {
        console.error('Fetch error:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  return (
    <>
      <Nav />
      <section className="w3l-inner-banner-main">
        <div className="about-inner inner2">
          <div className="wrapper seen-w3">
            <ul className="breadcrumbs-custom-path">
              <li><a href="/">Home</a></li>
              <li><span className="fa fa-angle-right" aria-hidden="true"></span></li>
              <li className="active">{product ? product.name : 'Loading...'}</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="w3l-products-page w3l-blog-single w3l-products-4">
        <div className="single blog">
          <div className="wrapper">
            <h3 className="title-main">Product Single Ad</h3>
            <div className="grid-colunm-2 d-flex">
              <div className="tab-content text-left single-left-content left-product-sing">
                <h3 className="aside-title single-prt">{product ? product.name : 'Loading...'}</h3>
                <p className="para-single">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                

                <p>Image here</p>
                {product ? (
                  <img src={product?.image_url} alt={product?.name ?? 'Product Image'} />
                ) : (
                  <p>Loading image...</p>
                )}

                <div className="top-sing-sec">
                  <h3 className="aside-title">Ad Details</h3>
                  {product && (
                    <div>
                      <p>{product.description}</p>
                      <ul className="d-flex">
                        <li>Price: R{product.price}</li><br />
                      </ul>
                      <ul>
                        <li>Posted: {formatDate(product.created_at)}</li>
                      </ul>
                    </div>
                  )}

                  <h3 className="aside-title top-sec-space">Features</h3>
                  <div className="d-grid list-styles">
                    <ul className="ad-lists">
                      <li><span className="fa fa-check-circle" aria-hidden="true"></span>{product?.type}</li>
                      <li><span className="fa fa-check-circle" aria-hidden="true"></span>{product?.location}</li>
                      <li><span className="fa fa-check-circle" aria-hidden="true"></span>{product?.condition}</li>
                      <li><span className="fa fa-check-circle" aria-hidden="true"></span>{product?.brand}</li>
                    </ul>
                    <ul className="ad-lists">
                      <li><span className="fa fa-check-circle" aria-hidden="true"></span>{product?.color}</li>
                      <li><span className="fa fa-check-circle" aria-hidden="true"></span>{product?.size}</li>
                      <li><span className="fa fa-check-circle" aria-hidden="true"></span>{product?.other_feature1}</li>
                      <li><span className="fa fa-check-circle" aria-hidden="true"></span>{product?.other_feature2}</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="right-side-bar single-right-content product-right-sin">
                <aside className="bg-effe">
                  <h3 className="aside-title margin-b-3">Buying </h3>
                  <span className="pos-icon">
                    <span className="fa fa-laptop"></span>
                  </span>
                </aside>
                <aside className="posts p-4 border">
                  <h3 className="aside-title">Buyer Information</h3>
                  <ul className="category product-page">
                    <li className="user-text"><span className="fa fa-user yelp"></span>Maria Zoe</li>
                    <li><span className="fa fa-phone"></span>XXXXXXXXXXXX</li>
                    <li><span className="fa fa-envelope"></span><a href="mailto:mail@example.com">info@example.com</a></li>
                  </ul>
                </aside>
                <aside className="posts p-4 border">
                  <h3 className="aside-title">Contact Buyer</h3>
                  <form action="#" method="post">
                    <div className="form-group">
                      <input type="email" name="Email" className="form-control" placeholder="Your Email" required />
                    </div>
                    <div className="form-group">
                      <input type="text" name="Name" className="form-control" placeholder="Your Name" required />
                    </div>
                    <div className="form-group">
                      <textarea name="Message" className="form-control" placeholder="Your reply..." required></textarea>
                    </div>
                    <div className="submit">
                      <button type="submit" className="btn button-eff">Send</button>
                    </div>
                  </form>
                </aside>

                <aside className="posts p-4 border actions">
                  <h3 className="aside-title">Ad Action</h3>
                  <ul className="links-single">
                    <li><a href="#share"><span className="fa fa-share-alt"></span>Share</a></li>
                    <li><a href="#print"><span className="fa fa-print"></span>Print</a></li>
                    <li><a href="#favorite"><span className="fa fa-heart-o"></span>Favorite</a></li>
                    <li><a href="#report"><span className="fa fa-flag-o"></span> Report </a></li>
                  </ul>
                </aside>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default ProductDetail;
