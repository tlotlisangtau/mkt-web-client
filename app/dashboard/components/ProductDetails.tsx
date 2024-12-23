import React, { useState, useEffect } from 'react';
import EditAdDetails from '../components/EditAdDetails';
// Import Carousel if needed (for displaying images)
import { Carousel } from 'react-responsive-carousel'; 
import '../../../styles/globals.css';
import '../../../styles/style.css'; // Import carousel styles
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../styles/productDetails.css';
import { toast, Toaster } from 'react-hot-toast';

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

interface Post {
  id: number;
  name?: string;
  price: string;
  location: string;
  company: string;
  job_location: string;
  description: string;
  mobile_number?: string;
  brand?: string;
  size?: string;
  department: string;
  make: string;
  mileage: string;
  year: string;
  model: string;
  property_type: string;
  color: string;
  dimensions: string;
  condition?: string;
  type?: string;
  category_id: number;
  category: string;
  salary?: string;
  valid_until?: string;
  created_at: string;
  complete?: boolean;
  image_urls: string[]; // Add image_url to the Post interface
}


interface ProductDetailsProps {
  post: Post;
  onBack: () => void; // Function to go back to the ads list
  onDeleteSuccess: () => void; // Function to handle success after deletion
  onSaveSuccess: (updatedPost: Post) => void;
}

const categoryMap: { [key: number]: string } = {
  1: "jobs",
  2: "sports",
  3: "furniture",
  8: "automotives",
  10: "electronics",
  12: "others",
};


const ProductDetails: React.FC<ProductDetailsProps> = ({ post, onBack, onDeleteSuccess,onSaveSuccess }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [productDetails, setProductDetails] = useState<Post>(post); // Add local state for the product
  const [showDeleteModal, setShowDeleteModal] = useState(false); 

  // Function to handle success after saving the ad details
  const handleSaveSuccess = (updatedPost: Post) => {
    setProductDetails(updatedPost); // Update the product details with the new saved data
    setIsEditing(false); // Go back to the view mode after saving
    console.log('Ad details saved successfully!');
    onSaveSuccess(updatedPost);
  };

  const handleEditClick = () => {
    setIsEditing(true); // Switch to the Edit view when the 'Edit' button is clicked
  };


  
  const handleDeleteAd = async () => {
    const category = categoryMap[post.category_id];
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/${category}/ads/${post.id}/`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Ad deleted successfully.');
        toast.success('Ad deleted successfully!', {
            style: { background: 'green', color: 'white' },
            duration: 2000,
        });
        setShowDeleteModal(false); // Close modal after deletion
        setTimeout(() => {
            onDeleteSuccess(); // Call the function to handle success after deletion
            onBack();  // Call the parent component to refresh
        }, 2000); // Adjust the timeout duration as needed
    } else {
        console.error('Failed to delete ad:', await response.text());
      }
    } catch (error) {
      console.error('Error deleting ad:', error);
    }
  };

  const handleDeleteClick = () => setShowDeleteModal(true);

  useEffect(() => {
    if (productDetails.image_urls) {
      console.log('Image URLs:', productDetails.image_urls); // Log image URLs for debugging
    }
  }, [productDetails.image_urls]);


  if (isEditing) {
    // When switching to edit mode, pass the `productDetails`, `onBack`, and `onSaveSuccess` as props
    return (
      <EditAdDetails 
        post={productDetails} 
        onCancel={() => setIsEditing(false)} // Handle cancel action
        onSaveSuccess={handleSaveSuccess} // Pass the success handler to update state
      />
    );
  }


  return (
    <>
      <div className="btn-container">
        <button onClick={onBack} className="btn-secondary">
          Back
        </button>
      </div>

      <section className="w3l-products-page w3l-blog-single w3l-products-4">
        <Toaster position="top-center" reverseOrder={false} />
        <div className="single blog">
          <div className="wrapper">
            <h3 className="title-main">Product Single Ad</h3>
            <div className="grid-colunm-2 d-flex">
              <div className="tab-content text-left single-left-content left-product-sing">
                <h3 className="aside-title single-prt">
                  {productDetails.name || "Loading..."}
                </h3>
                <br />
                {Array.isArray(productDetails.image_urls) &&
                productDetails.image_urls.length > 0 ? (
                  <Carousel showThumbs={false} infiniteLoop autoPlay>
                    {productDetails.image_urls.map((url, index) => (
                      <div key={index}>
                        <img
                          src={url}
                          alt={`Image ${index + 1}`}
                          className="carousel-image"
                        />
                      </div>
                    ))}
                  </Carousel>
                ) : (
                  <p>No images available.</p>
                )}

                <div className="top-sing-sec">
                  <h3 className="aside-title">Ad Details</h3>
                  <div>
                    <p>
                      {productDetails.description ||
                        "No description available."}
                    </p>
                    <ul className="d-flex">
                      <li>
                        Price: R{productDetails.price || productDetails.salary}
                      </li>
                      <br />
                    </ul>
                    <ul>
                      <li>
                        Posted:{" "}
                        {productDetails.valid_until
                          ? formatDate(productDetails.valid_until)
                          : formatDate(productDetails.created_at)}
                      </li>
                    </ul>
                  </div>

                  <h3 className="aside-title top-sec-space">Features</h3>
                  <div className="d-grid list-styles">
                    <ul className="ad-lists">
                      <li>
                        <span
                          className="fa fa-check-circle"
                          aria-hidden="true"
                        ></span>
                        {productDetails.job_location || productDetails.location}
                      </li>
                      <li>
                        <span
                          className="fa fa-check-circle"
                          aria-hidden="true"
                        ></span>
                        {productDetails.company ||
                          "Owner"}
                      </li>
                      <li>
                        <span
                          className="fa fa-check-circle"
                          aria-hidden="true"
                        ></span>
                        {productDetails.color ||
                          productDetails.department ||
                          productDetails.type ||
                          productDetails.mileage ||
                          productDetails.model}
                      </li>
                      <li>
                        <span
                          className="fa fa-check-circle"
                          aria-hidden="true"
                        ></span>
                        {productDetails.size ||
                          productDetails.make ||
                          productDetails.salary ||
                          productDetails.brand}
                      </li>
                      <li>
                        <span
                          className="fa fa-check-circle"
                          aria-hidden="true"
                        ></span>
                        {productDetails.condition || productDetails.valid_until}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add Edit and Delete buttons */}
        <div className="btn-container">
          <button onClick={handleEditClick} className="btn-primary">
            Edit
          </button>
          <button onClick={handleDeleteClick} className="btn-danger">
            Delete
          </button>
        </div>

        {showDeleteModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>Are you sure you want to delete this ad?</h3>
              <div className="modal-buttons">
                <button className="btn btn-danger" onClick={handleDeleteAd}>
                  Yes, Delete
                </button>

                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="btn-cancel"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default ProductDetails;
