'use client';

import { useEffect,useState } from 'react';
import { useRouter } from 'next/navigation';
import { MinusIcon, XMarkIcon, UserIcon ,Bars3Icon} from '@heroicons/react/24/outline';
import Link from 'next/link';
import {jwtDecode} from 'jwt-decode';
import './styles/navbar.css';

interface JwtPayload {
    user_id: number;
}


interface UserData {
    id: number;
    username: string; 
    image_url: string;
  }

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('accessToken');
      const userID = localStorage.getItem('userID');
      console.log('heyy',userID);
      

      if (!token) {
        setError('No token found, please log in.');
        router.push('/api/auth/login');
        return;
      }

      try {
        //const decoded = jwtDecode<JwtPayload>(token);
    
        //const userId = facebookId;
        

        const identifier = userID ;
        console.log('User',identifier);
        const response = await fetch(`http://127.0.0.1:8000/accounts/${identifier}/`, {
          method: 'GET',
          headers: {
            Authorization: `FBToken ${token}`,
            Accept: 'application/json',
          },
        });
    
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
          console.log('Data from API:', data);
        } else {
          setError('Failed to fetch user data.');
        }
      } catch (err) {
        setError('An error occurred while fetching data.');
      }
    };

    fetchData();
  }, [router]);

  const getImageUrlsArray = (urls: any): string[] => {
    console.log("Image URLs:", urls);
    console.log("Type of image_urls:", Array.isArray(urls));
    if (!urls || typeof urls === 'string' && urls.trim() === '') {
      return [];
    }
    return Array.isArray(urls) ? urls : [urls];
  };

  const toStore = () => {
    window.location.href = '/';

  };

  return (
<nav className="navbar">
  <div className="navbar-container">
    {/* Logo and Links */}
    <div className={`nav-links ${isOpen ? 'active' : ''} md-active`}>
      <button
        onClick={toStore}
        className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
        >
              Return To Store
            </button>
    </div>

    {/* Hamburger Menu Button (Mobile) */}
    <div className="md:hidden">
      <button
        onClick={toggleMenu}
        className="hamburger-btn"
      >
        {isOpen ? (
          <XMarkIcon className="h" />
        ) : (
          <>
          <Bars3Icon className="h" />
          </>

        )}
      </button>
    </div>  

    {/* Profile section */}
    <div className={'profile-container'}>
      <img
        src={userData?.image_url || '/Images/author/img-07.jpg'}
        alt="Profile picture"
        className="profile-pic"
      />
      {userData ? (
        <div className="username">
          <h3>Hi! {userData.username}</h3>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  </div>
</nav>
  );
};

export default Navbar;
