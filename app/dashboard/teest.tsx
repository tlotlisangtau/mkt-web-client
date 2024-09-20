'use client';
import Navbar from './Navbar';
import MyAds from './components/myAds';
import '../../styles/insides.css'; 
import '../../styles/table.css';

import { useState , lazy, Suspense} from 'react';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';
import Logout from './components/Logout';

const ProfileSettings = lazy(() => import('./components/ProfileSettings'));
const Ssidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = (section: string) => {
    setActiveSection(section); // Update active section
  };
  
  return (
    <>
      <button
        className="p-2 bg-blue-500 text-white fixed top-4 left-4 z-20"
        onClick={toggleSidebar}
      >
        {isOpen ? (
          <ChevronLeftIcon className="h-6 w-6" />
        ) : (
          <ChevronRightIcon className="h-6 w-6" />
        )}
      </button>
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out z-10`}
      >
        <ul className="p-9 mt-10">
        <li className={`p-2 hover:bg-gray-700 mb-5 text-white flex items-center space-x-2 ${activeSection === 'dashboard' ? 'tg-active' : ''}`}>
            <a href="javascript:void(0);" className="text-white flex items-center space-x-2" onClick={() => handleNavClick('dashboard')}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
              <path fillRule="evenodd" d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75H12a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
            </svg>
              <span> Insights</span>
            </a>
          </li>

          <li className={`p-2 hover:bg-gray-700 mb-5 text-white flex items-center space-x-2 ${activeSection === 'profile-settings' ? 'tg-active' : ''}`}>
            <a href="javascript:void(0);" className="text-white flex items-center space-x-2" onClick={() => handleNavClick('profile-settings')}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
              <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 0 0-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 0 0-2.282.819l-.922 1.597a1.875 1.875 0 0 0 .432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 0 0 0 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 0 0-.432 2.385l.922 1.597a1.875 1.875 0 0 0 2.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 0 0 2.28-.819l.923-1.597a1.875 1.875 0 0 0-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 0 0 0-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 0 0-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 0 0-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 0 0-1.85-1.567h-1.843ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z" clipRule="evenodd" />
            </svg>
              <span>Profile-settings</span>
            </a>
          </li>

          <li className={`p-2 hover:bg-gray-700 mb-5 text-white flex items-center space-x-2 ${activeSection === 'myAds' ? 'tg-active' : ''}`}>
            <a href="javascript:void(0);" className="text-white flex items-center space-x-2" onClick={() => handleNavClick('myAds')}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3" />
            </svg>
              <span>My Ads</span>
            </a>
          </li>

          <li className={`p-2 hover:bg-gray-700 mb-5 text-white flex items-center space-x-2 ${activeSection === 'messages' ? 'tg-active' : ''}`}>
            <a href="javascript:void(0);" className="text-white flex items-center space-x-2" onClick={() => handleNavClick('messages')}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
            </svg>
              <span>Messages</span>
            </a>
          </li>

          <li className={`p-2 hover:bg-gray-700 mb-5 text-white flex items-center space-x-2 ${activeSection === 'payments' ? 'tg-active' : ''}`}>
            <a href="javascript:void(0);" className="text-white flex items-center space-x-2" onClick={() => handleNavClick('payments')}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
            </svg>
              <span>Payments</span>
            </a>
          </li>

          <li className={`p-2 hover:bg-gray-700 mb-5 text-white flex items-center space-x-2 ${activeSection === 'favourites' ? 'tg-active' : ''}`}>
            <a href="javascript:void(0);" className="text-white flex items-center space-x-2" onClick={() => handleNavClick('favourites')}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
              <span>My Favourites</span>
            </a>
          </li>

          <li className={`p-2 hover:bg-gray-700 mb-5 text-white flex items-center space-x-2 ${activeSection === 'logout' ? 'tg-active' : ''}`}>
            <a href="javascript:void(0);" className="text-white flex items-center space-x-2" onClick={() => handleNavClick('logout')}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
            </svg>
              <span>Logout</span>
            </a>
          </li>
        </ul>
      </div>

      <Navbar />


      {activeSection === 'dashboard' && (
           <section className="dashboard-stats">
           <div className="stats-container">
             <div className="stat-box">
               <figure><img src="/Images/icons/img-32.png" alt="Total Ad Posted" /></figure>
               <div className="stat-info">
                 <h2>562</h2>
                 <h3>Total Ad Posted</h3>
                 <a href="javascript:void(0);" className="view-detail">View Detail <i className="fa fa-angle-right"></i></a>
               </div>
             </div>
         
             <div className="stat-box">
               <figure><img src="/Images/icons/img-33.png" alt="Featured Ads" /></figure>
               <div className="stat-info">
                 <h2>06</h2>
                 <h3>Featured Ads</h3>
                 <a href="javascript:void(0);" className="view-detail">View Detail <i className="fa fa-angle-right"></i></a>
               </div>
             </div>
         
             <div className="stat-box">
               <span className="badge">7</span>
               <figure><img src="/Images/icons/img-35.png" alt="Offers / Messages" /></figure>
               <div className="stat-info">
                 <h2>45706</h2>
                 <h3>Offers / Messages</h3>
                 <a href="javascript:void(0);" className="view-detail">View Detail <i className="fa fa-angle-right"></i></a>
               </div>
             </div>
           </div>
         </section>
        )}

        {activeSection === 'profile-settings' && (
            <Suspense fallback={<div>Loading...</div>}>
              <ProfileSettings />
            </Suspense>
        )}

        {activeSection === 'myAds' && (
            <Suspense fallback={<div>Loading...</div>}>
              <MyAds />
            </Suspense>
        )}

        {activeSection === 'messages' && (
            <Suspense fallback={<div>Loading...</div>}>
              <h1>Messages</h1>
            </Suspense>
        )}

        {activeSection === 'payments' && (
            <Suspense fallback={<div>Loading...</div>}>
              <h1>Payments</h1>
            </Suspense>
        )}

        {activeSection === 'favourites' && (
            <Suspense fallback={<div>Loading...</div>}>
              <h1>My Favourites</h1>
            </Suspense>
        )}

        {activeSection === 'logout' && (
            <Suspense fallback={<div>Loading...</div>}>
              <Logout />
            </Suspense>
        )}
    </>
  );
};

export default Ssidebar;