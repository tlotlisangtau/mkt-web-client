'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import '../styles/logout.css';

const Logout = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Clear the token or any authentication data
    localStorage.removeItem('accessToken');
    localStorage.removeItem('google_token');
    localStorage.removeItem('userID');

    // Redirect to login or homepage
    router.push('/api/auth/login'); // or '/homepage'
  };

  return (
    <div className="fullscreen-center">
      <button
        onClick={handleLogout}
        className="logout-button"
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
