import React, { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import '../../../styles/table.css';

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
  image_urls?: string[];  
  category?: string;
  featured?: boolean;
  price?: string;
  name?: string;
  salary?: string;
  job_location?: string;
  location?: string;
  created_at?: string;
  user_id?: number;
}
interface DecodedToken {
	user_id: number;
	exp: number;
	iat: number;
  }

function MyAds() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const token = localStorage.getItem('accessToken');
      let userId: number | null = null; // Declare userId outside

      if (token) {
        try {
          const decodedToken = jwtDecode<DecodedToken>(token); // Decode token to extract user_id
          console.log("Decoded Token:", decodedToken); // Log the decoded token
          userId = decodedToken.user_id; // Assign user_id
        } catch (error) {
          console.error("Error decoding token:", error); // Log any decoding errors
        }
      }

      try {
        const [jobsResponse, sportsResponse] = await Promise.all([
          fetch('http://127.0.0.1:8000/api/jobs/', {
            headers: {
              Authorization: `Bearer ${token}`, // Pass the Bearer token in the headers
            },
          }),
          fetch('http://127.0.0.1:8000/api/sports/', {
            headers: {
              Authorization: `Bearer ${token}`, // Pass the Bearer token in the headers
            },
          }),
        ]);

        const jobsData = await jobsResponse.json();
        const sportsData = await sportsResponse.json();

        // Add category labels to each post
        const categorizedJobs = jobsData.map((job: Post) => ({
			...job,
			category: 'Jobs', // Set category for job posts
		  }));
		  const categorizedSports = sportsData.map((sport: Post) => ({
			...sport,
			category: 'Sports', // Set category for sports posts
		  }));

        // Combine the categorized posts and filter by user_id
        const combinedPosts = [...categorizedJobs, ...categorizedSports].filter((post: Post) => post.user_id === userId);

        setPosts(combinedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <section className="custom-dashboard-section">
  <div className="row">
    <form className="custom-form">
      <fieldset>
        <div className="col-lg-12">
          <div className="custom-dashboardbox">
            <div className="custom-dashboard-title">
              <h2>My Ads</h2>
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
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => (
                    <tr key={post.id} data-category={post.status || 'unknown'}>
                        <td data-title="Photo">
                          {/* Safely handle image_urls: convert to an array if it's not */}
                          {Array.isArray(post.image_urls) && post.image_urls.length > 0 ? (
                            post.image_urls.map((url, index) => (
                              <img
                                key={index}
                                src={url}
                                alt={`image-${index}`}
                                style={{ width: '200px', height: 'auto', marginRight: '10px' }}
                              />
                            ))
                          ) : (
                            <img src="default-image.jpg" alt="default" />
                          )}
                        </td> 
                      <td data-title="Title">
                        <h3>{post.name || 'No Title'}</h3>
                        <span>Ad ID: {post.id}</span>
                      </td>
                      <td data-title="Category">
                        <span className="custom-adcategories">{post.category || 'Unknown'}</span>
                      </td>
                      <td data-title="Featured">{post.featured ? 'Yes' : 'No'}</td>
                      <td data-title="Ad Status">
                        <span className={`custom-adstatus custom-adstatus${post.status || 'unknown'}`}>{post.status || 'Unknown'}</span>
                      </td>
                      <td data-title="Price &amp; Location">
                        <h3>{post.price || post.salary}</h3>
                        <address>{post.job_location || post.location}</address>
                      </td>
                      <td data-title="Date">
                        <time dateTime={post.created_at || ''}>
                          {post.created_at ? formatDate(post.created_at) : 'No Date'}
                        </time>
                      </td>
                      <td data-title="Action">
                        <div className="custom-actions">
                          <a className="custom-action-view" href="#"><i className="fa fa-eye"></i></a>
                          <a className="custom-action-edit" href="#"><i className="fa fa-pencil"></i></a>
                          <a className="custom-action-delete" href="#"><i className="fa fa-trash"></i></a>
                        </div>
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
