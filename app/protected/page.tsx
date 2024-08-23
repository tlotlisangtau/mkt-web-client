'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from "jwt-decode"; // Install jwt-decode if not already installed

interface JwtPayload {
  user_id: number;
  // add other fields if necessary
}

const ProtectedPage = () => {
  const [userData, setUserData] = useState<any>(null);
  const [error, setError] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('accessToken');

      if (!token) {
        setError('No token found, please log in.');
        router.push('/Login'); // Redirect to login page if no token is found
        return;
      }

      try {
        // Decode the token to get the user ID
        const decoded: JwtPayload = jwtDecode(token);
        const userId = decoded.user_id;

        // Fetch user details using the user ID
        const response = await fetch(`http://127.0.0.1:8000/accounts/users/${userId}/`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          setError('Failed to fetch user data.');
        }
      } catch (err) {
        setError('An error occurred while fetching data.');
      }
    };

    fetchData();
  }, [router]);

  return (
    <div>
      <h2>Protected Page</h2>
      {error && <p>{error}</p>}
      {userData ? (
        <div>
          <h3>User Details:</h3>
          <pre>{JSON.stringify(userData, null, 2)}</pre>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default ProtectedPage;
