'use client';

import { useEffect,useState } from 'react';
import { useRouter } from 'next/navigation';
import { MinusIcon, XMarkIcon, UserIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import {jwtDecode} from 'jwt-decode';

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
      const facebookId = localStorage.getItem('facebookID');
      console.log('heyy',token);
      

      if (!token) {
        setError('No token found, please log in.');
        router.push('/api/auth/login');
        return;
      }

      try {
        //const decoded = jwtDecode<JwtPayload>(token);
    
        const userId = facebookId;
        

        const identifier = userId ;
        console.log('User',identifier);
        const response = await fetch(`http://127.0.0.1:8000/accounts/users/${identifier}/`, {
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

  return (
    <nav className="bg-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="`${
            isOpen ? 'block' : 'hidden'
          } md:flex md:items-center md:space-x-6 p-8`">
        <Link href="/" className="text-black hover:text-gray-400">Home</Link>
          <Link href="/about" className="text-black hover:text-gray-400">About</Link>
          <Link href="/services" className="text-black hover:text-gray-400">Services</Link>
          <Link href="/contact" className="text-black hover:text-gray-400">Contact</Link>
        </div>

        {/* Hamburger Menu Button (Mobile) */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white absolute top-7 focus:outline-none"
          >
            {isOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <MinusIcon className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Links */}
        <div
          className={`${
            isOpen ? 'block' : 'hidden'
          } md:flex md:items-center md:space-x-6`}
        >
          <div className="hidden md:flex items-center space-x-2">
          <img
            src={userData?.image_url || '/Images/author/img-07.jpg'} // Use profile picture URL or default image // Alt text with fallback names
            style={{ width: '50px', height: '50px', borderRadius: '50%' }} // Styling for circular profile picture
            />
         
          {userData ? (
            <div>
                <h3>Hi! {userData.username}</h3>
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
