import React, { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';

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
  image_url?: string;
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
    <section className="tg-dbsectionspace tg-haslayout">
      <div className="row">
        <form className="tg-formtheme tg-formdashboard">
          <fieldset>
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <div className="tg-dashboardbox">
                <div className="tg-dashboardboxtitle">
                  <h2>My Ads</h2>
                </div>
                <div className="tg-dashboardholder">
                  <table id="tg-adstype" className="table tg-dashboardtable tg-tablemyads">
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
                            <img src={post.image_url || 'default-image.jpg'} alt="image description"/>
                          </td>
                          <td data-title="Title">
                            <h3>{post.name || 'No Title'}</h3>
                            <span>Ad ID: {post.id}</span>
                          </td>
                          <td data-title="Category">
                            <span className="tg-adcategories">
                              {post.category || 'Unknown'}
                            </span>
                          </td>
                          <td data-title="Featured">{post.featured ? 'Yes' : 'No'}</td>
                          <td data-title="Ad Status">
                            <span className={`tg-adstatus tg-adstatus${post.status || 'unknown'}`}>{post.status || 'Unknown'}</span>
                          </td>
                          <td data-title="Price &amp; Location">
                            <h3>{post.price || post.salary}</h3>
                            <address>{post.job_location || post.location}</address>
                          </td>
                          <td data-title="Date">
                            <time dateTime={post.created_at || ''}>
                              {post.created_at ? formatDate(post.created_at) : 'No Date'}
                            </time>
                            <span>Published</span>
                          </td>
                          <td data-title="Action">
                            <div className="tg-btnsactions">
                              <a className="tg-btnaction tg-btnactionview" href="#"><i className="fa fa-eye"></i></a>
                              <a className="tg-btnaction tg-btnactionedit" href="#"><i className="fa fa-pencil"></i></a>
                              <a className="tg-btnaction tg-btnactiondelete" href="#"><i className="fa fa-trash"></i></a>
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
