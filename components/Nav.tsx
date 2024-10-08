import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import '../styles/globals.css';

const Nav: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    const userToken = localStorage.getItem('accessToken');
    setIsLoggedIn(!!userToken);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
    setShowLogoutModal(false);
    window.location.reload();
  };

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      setShowLogoutModal(true);
    } else {
      window.location.href = '/api/auth/login';
    }
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold">
              <Link href="/" className="flex items-center text-gray-800 hover:text-gray-600">
                <span className="fa fa-bullhorn text-2xl mr-2" aria-hidden="true"></span>
                Classify
              </Link>
            </h1>
          </div>
          <nav className="hidden lg:flex space-x-4 p-3">
            <Link href="/" className="text-gray-800 hover:text-gray-600">Home</Link>
            {/* Other links */}
            <Link href="/ChooseCategory" className="bg-blue-500 text-white py-2 px-2 mb-3 rounded hover:bg-blue-600">
              <span className="fa fa-paper-plane-o mr-2" aria-hidden="true"></span>
              Post your Ad
            </Link>
            <button
              onClick={handleLoginLogout}
              className="bg-blue-500 text-white py-2 px-2 mb-3 rounded hover:bg-blue-600"
            >
              <span className="fa fa-paper-plane-o mr-2" aria-hidden="true"></span>
              {isLoggedIn ? 'Logout' : 'Login'}
            </button>
          </nav>
          <button className="lg:hidden text-gray-800 hover:text-gray-600">
            <span className="fa fa-bars text-2xl"></span>
          </button>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="modal-overlay">
        <div className="modal-content">
          <h2 className="text-lg font-semibold mb-4">Confirm Logout</h2>
          <p className="mb-6">Are you sure you want to log out?</p>
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setShowLogoutModal(false)}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      
      )}
    </header>
  );
};

export default Nav;
