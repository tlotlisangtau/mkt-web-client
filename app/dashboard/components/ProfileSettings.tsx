import React, { useState, useEffect } from 'react';
import {jwtDecode}  from 'jwt-decode'; // Import jwt_decode to decode the token
import supabase from '../../../utils/supabaseClient';
import '../../../styles/profile.css';

const ProfileSettings = () => {
  // State for user data
  const [userData, setUserData] = useState({
    
    username: '',
    firstname: '',
    lastname: '',
    phone_number: '',
    email: '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [userId, setUserId] = useState<string | null>(null); // State to store the user_id
  const [profileImage, setProfileImage] = useState(null); // State to handle image upload
  const [imageUrl, setImageUrl] = useState(''); // Store uploaded image URL

  // Function to extract user_id from the token
  const getUserIdFromToken = () => {
    const token = localStorage.getItem('accessToken'); // Get the token from localStorage
    if (token) {
      const decodedToken = jwtDecode<{ user_id: string }>(token);
      return decodedToken.user_id; // Extract user_id from the token
    }
    return null;
  };

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const id = getUserIdFromToken() || localStorage.getItem('userID'); // Get the dynamic user_id
        if (!id) {
          throw new Error('User ID not found');
        }
        setUserId(id);

        const response = await fetch(`http://127.0.0.1:8000/accounts/${id}/`); // Use dynamic user_id
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('User Data:', data); // Log the response to see its structure
        setUserData({
          username: data.username || '',
          firstname: data.first_name || '',
          lastname: data.last_name || '',
          phone_number: data.phone_number || '',
          email: data.email || ''
        });
      } catch (error) {
        setError((error as Error).message); // Type casting error as Error
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Handle file selection
  const handleFileChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  // Handle image upload
  const handleImageUpload = async () => {
    if (!profileImage) return;

    const fileName = `${userId}-${profileImage.name}`;
    const { data, error: uploadError } = await supabase
      .storage
      .from('images')
      .upload(fileName, profileImage);

    if (uploadError) {
      console.error('Error uploading image:', uploadError);
      return;
    }

    const imageUrl = `https://mrcrgxijqzzfzrmhfkjb.supabase.co/storage/v1/object/public/images/${data.path}`;
    setImageUrl(imageUrl); // Store the uploaded image URL
    alert('Profile photo uploaded successfully!');
  };


  // Handle form submission to update user data
  const handleUpdate = async () => {
    try {
      const id = userId; 
      const token = localStorage.getItem('accessToken'); 
      console.log('token',token)
      if (!id || !token) {
        throw new Error('User ID or token not available');
      }

      const response = await fetch(`http://127.0.0.1:8000/accounts/${id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify({
          username: userData.username || '',
          first_name: userData.firstname || '',
          last_name: userData.lastname || '',
          phone_number: userData.phone_number || '',
          email: userData.email || '',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update user data');
      }

      alert('Profile updated successfully!');
    } catch (error) {
      alert((error as Error).message); // Type casting error as Error
    }
  };

  const handleChangePassword = async () => {
    const { currentPassword, newPassword, confirmPassword } = passwordData;

    if (newPassword !== confirmPassword) {
      alert("New password and confirmation don't match!");
      return;
    }

    try {
      const token = localStorage.getItem('accessToken'); // Get token from localStorage
      const id = userId; // Use the stored user_id
      if (!id || !token) {
        throw new Error('User ID or token not available');
      }

      const response = await fetch(`http://127.0.0.1:8000/accounts/${id}/`, {
        method: 'PATCH', 
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          current_password: currentPassword,
          new_password: newPassword,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to change password');
      }

      alert('Password changed successfully!');
    } catch (error) {
      alert((error as Error).message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
<div>
  <section className="section dashboard-section">
    <div className="row">
      <form className="form form-dashboard">
        <fieldset>
          {/* Profile Photo */}
          <div>
            <div className="dashboard-box1">
              <div className="dashboard-box-title">
                <h2>Profile Photo</h2>
              </div>
              <div className="dashboard-box-content">
                <label className="file-upload-label" htmlFor="photo-gallery">
                  <span>Drop files anywhere to upload</span>
                  <span>Or</span>
                  <span className="file-size">Maximum upload file size: 500 KB</span>
                  <input
                    id="photo-gallery"
                    className="file-input"
                    type="file"
                    name="file"
                    onChange={handleFileChange}
                  />
                </label>
                <button className="btn-upload" type="button" onClick={handleImageUpload}>
                  Upload Photo
                </button>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div>
            <div className="dashboard-box2">
              <div className="dashboard-box-title">
                <h2>Profile Detail</h2>
              </div>
              <div className="dashboard-box-content">
                <div className="form-group">
                  <label>Username</label>
                  <input
                    type="text"
                    name="username"
                    className="form-controls"
                    placeholder="Username"
                    value={userData.username}
                    onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                  />
                </div>
                <div className="form-groups">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-controls"
                    placeholder="Email"
                    value={userData.email}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  />
                </div>
                <div className="form-groups">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstname"
                    className="form-controls"
                    placeholder="First Name"
                    value={userData.firstname}
                    onChange={(e) => setUserData({ ...userData, firstname: e.target.value })}
                  />
                </div>
                <div className="form-groups">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastname"
                    className="form-controls"
                    placeholder="Last Name"
                    value={userData.lastname}
                    onChange={(e) => setUserData({ ...userData, lastname: e.target.value })}
                  />
                </div>
                <div className="form-groups">
                  <label>Mobile Number</label>
                  <input
                    type="text"
                    name="phonenumber"
                    className="form-controls"
                    placeholder="Phone Number"
                    value={userData.phone_number}
                    onChange={(e) => setUserData({ ...userData, phone_number: e.target.value })}
                  />
                </div>
                <button className="btn-update" type="button" onClick={handleUpdate}>
                  Update
                </button>
              </div>
            </div>
          </div>

          {/* Change Password */}
          <div>
            <div className="dashboard-box3">
              <div className="dashboard-box-title">
                <h2>Change Password</h2>
              </div>
              <div className="dashboard-box-content">
                <div className="form-groups">
                  <input
                    type="password"
                    name="currentpassword"
                    className="form-controls"
                    placeholder="Current Password"
                    value={passwordData.currentPassword}
                    onChange={(e) =>
                      setPasswordData({ ...passwordData, currentPassword: e.target.value })
                    }
                  />
                </div>
                <div className="form-groups">
                  <input
                    type="password"
                    name="newpassword"
                    className="form-controls"
                    placeholder="New Password"
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData({ ...passwordData, newPassword: e.target.value })
                    }
                  />
                </div>
                <div className="form-groups">
                  <input
                    type="password"
                    name="confirmpassword"
                    className="form-controls"
                    placeholder="Confirm New Password"
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                    }
                  />
                </div>
                <button className="btn-change-password" type="button" onClick={handleChangePassword}>
                  Change Now
                </button>
              </div>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  </section>
</div>

)
};

export default ProfileSettings;
