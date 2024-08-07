'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const DashboardPage: React.FC = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/Login/');
    } else {
      // Optionally, you can verify the token with the backend here
      setAuthenticated(true);
    }
  }, [router]);

  if (!authenticated) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold">Welcome to the Dashboard!</h1>
    </div>
  );
};

export default DashboardPage;
