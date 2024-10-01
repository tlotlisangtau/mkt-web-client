'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

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
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
