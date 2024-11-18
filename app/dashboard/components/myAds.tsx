  import React, { useEffect, useState } from 'react';
  import { jwtDecode } from 'jwt-decode';
  import '../../../styles/table.css';
  import ProductDetails from '../components/ProductDetails';
  import Link from "next/link";
  import DeleteAd from '../components/DeleteAd';

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  interface Post {
    id: number;
    status?: string;
    image_urls: string[];
    category: string;
    featured?: boolean;
    department: string;
    price: string;
    description: string;
    name?: string;
    year: string;
    model: string;
    make: string;
    mileage: string;
    salary?: string;
    job_location: string;
    location: string;
    created_at: string;
    user_id?: number;
    category_id: number;
    complete?: boolean;
    company: string;
    property_type: string;
    valid_until?: string;
    color: string;
    dimensions: string;
  }

  interface DecodedToken {
    user_id: number;
    exp: number;
    iat: number;
  }

  function MyAds() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedPost, setSelectedPost] = useState<Post | null>(null); // Track the selected post// Track the selected post for details view
    const [viewDetails, setViewDetails] = useState(false);

    useEffect(() => {
      const fetchPosts = async () => {
        const token = localStorage.getItem('accessToken');
        let userId: number | null = null;

        if (token) {
          try {
            const decodedToken = jwtDecode<DecodedToken>(token);
            userId = decodedToken.user_id;
          } catch (error) {
            console.error('Error decoding token:', error);
          }
        }
        try {
          const [
            jobsResponse,
            sportsResponse,
            furnitureResponse,
            automotivesResponse,
            electronicsResponse,
            othersResponse,
          ] = await Promise.all([
            fetch(
              "https://ikahemarketapp-b1c3e9e6f70a.herokuapp.com/api/jobs/ads/",
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            ),
            fetch(
              "https://ikahemarketapp-b1c3e9e6f70a.herokuapp.com/api/sports/ads/",
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            ),
            fetch(
              "https://ikahemarketapp-b1c3e9e6f70a.herokuapp.com/api/furniture/ads/",
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            ),
            fetch(
              "https://ikahemarketapp-b1c3e9e6f70a.herokuapp.com/api/automotives/ads/",
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            ),
            fetch(
              "https://ikahemarketapp-b1c3e9e6f70a.herokuapp.com/api/electronics/ads/",
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            ),
            fetch(
              "https://ikahemarketapp-b1c3e9e6f70a.herokuapp.com/api/others/ads/",
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            ),
          ]);
        
          const [
            jobsData,
            sportsData,
            furnitureData,
            automotivesData,
            electronicsData,
            othersData,
          ] = await Promise.all([
            jobsResponse.json(),
            sportsResponse.json(),
            furnitureResponse.json(),
            automotivesResponse.json(),
            electronicsResponse.json(),
            othersResponse.json(),
          ]);
        
          const categorizedJobs = jobsData.map((job: Post) => ({
            ...job,
            category: 'Jobs',
          }));
          const categorizedSports = sportsData.map((sport: Post) => ({
            ...sport,
            category: 'Sports',
          }));
          const categorizedFurniture = furnitureData.map((furniture: Post) => ({
            ...furniture,
            category: 'Furniture',
          }));
          const categorizedAutomotives = automotivesData.map(
            (automotives: Post) => ({
              ...automotives,
              category: "Automotives",
            })
          );
          const categorizedElectronics = electronicsData.map(
            (electronics: Post) => ({
              ...electronics,
              category: "Electronics",
            })
          );
          const categorizedOthers = othersData.map((others: Post) => ({
            ...others,
            category: "Others",
          }));
        
          const combinedPosts = [
            ...categorizedJobs,
            ...categorizedSports,
            ...categorizedFurniture,
            ...categorizedAutomotives,
            ...categorizedElectronics,
            ...categorizedOthers,
          ].filter((post: Post) => post.user_id === userId);
        
          setPosts(combinedPosts);
        } catch (error) {
          console.error('Error fetching posts:', error);
        } finally {
          setLoading(false);
        }
        
      };

      fetchPosts();
    }, []);

    const handlePostClick = (post: Post) => {
      setSelectedPost(post);
      setViewDetails(true); // Switch to details view
    };

    const handleBackToAds = () => {
      setViewDetails(false); // Return to the ads list
    };

    const handleUpdateAd = (updatedPost: Post) => {
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === updatedPost.id ? updatedPost : post
        )
      );
      setSelectedPost(updatedPost); // Update the selected post to reflect changes
    };

    if (loading) {
      return <p>Loading...</p>;
    }
    const refreshAds = (deletedPostId: number) => {
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== deletedPostId));
      setViewDetails(false); // Go back to ads list after delete
    };

    if (viewDetails && selectedPost) {
      return (
        <ProductDetails
          post={selectedPost}
          onBack={handleBackToAds}
          onDeleteSuccess={() => refreshAds(selectedPost.id)} // Pass the deletion handler
          onSaveSuccess={handleUpdateAd}
        />
      );
    }

      const toStore = () => {
        window.location.href = "/";
      };

    return (
      <section className="custom-dashboard-section">
        <div className="row">
          <form className="custom-form">
            <fieldset>
              <div className="col-lg-12">
                <div className="custom-dashboardbox">
                  <div className="custom-dashboard-title">
                    <h2>My Ads</h2>
                    <Link
                      href="/ChooseCategory"
                      className="bg-blue-500 link text-white py-2 px-2 mb-3 rounded hover:bg-blue-600"
                    >
                      Post your Ad
                    </Link>
                  </div>
                  <div className="custom-dashboardholder">
                    <table id="custom-adstype" className="custom-table">
                      <thead>
                        <tr>
                          <th>Photo</th>
                          <th>Title</th>
                          <th>Category</th>
                          <th>Featured</th>
                          <th>Ad Status</th>
                          <th>Price &amp; Location</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {posts.map((post) => (
                          <tr
                            key={post.id}
                            data-category={post.status || "unknown"}
                            onClick={() => handlePostClick(post)} // Use handlePostClick here
                            style={{ cursor: "pointer" }} // Make the row look clickable
                          >
                            <td data-title="Photo">
                              {Array.isArray(post.image_urls) &&
                              post.image_urls.length > 0 ? (
                                post.image_urls.map((url, index) => (
                                  <img
                                    key={index}
                                    src={url}
                                    alt={`image-${index}`}
                                    style={{
                                      width: "200px",
                                      height: "auto",
                                      marginRight: "10px",
                                    }}
                                  />
                                ))
                              ) : (
                                <img src="default-image.jpg" alt="default" />
                              )}
                            </td>
                            <td data-title="Title">
                              <h3>{post.name || "No Title"}</h3>
                              <span>Ad ID: {post.id}</span>
                            </td>
                            <td data-title="Category">
                              <span className="custom-adcategories">
                                {post.category || "Unknown"}
                              </span>
                            </td>
                            <td data-title="Featured">
                              {post.featured ? "Yes" : "No"}
                            </td>
                            <td data-title="Ad Status">
                              <span
                                className={`custom-adstatus custom-adstatus${
                                  post.complete ? "published" : "unpublished"
                                }`}
                              >
                                {post.complete ? "Published" : "Unpublished"}
                              </span>
                            </td>
                            <td data-title="Price &amp; Location">
                              <h3>{post.price || post.salary}</h3>
                              <address>
                                {post.job_location || post.location}
                              </address>
                            </td>
                            <td data-title="Date">
                              <time dateTime={post.created_at || ""}>
                                {post.created_at
                                  ? formatDate(post.created_at)
                                  : "No Date"}
                              </time>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
      </section>
    );
  }

  export default MyAds;
