'use client';

import React, { useEffect, useState, lazy, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import {jwtDecode} from 'jwt-decode';
import DashboardHeader from './components/DashboardHeader';
import DashboardFooter from './components/DashboardFooter';
import DashboardBanner from './components/DashboardBanner';
import myAds from './components/myAds';
import styles from './Sidebar.module.css'; 
import $ from 'jquery';
import '../../styles/bootstrap.css';
import '../../styles/dashboard.css';
import '../../styles/chartist.css';
import '../../styles/color.css';
import '../../styles/dbresponsive.css';
import '../../styles/flags.css';
import '../../styles/icomoon.css';
import '../../styles/jquery-ui.css';
import '../../styles/main.css';
import '../../styles/normalize.css';
import '../../styles/owl.carousel.css';
import '../../styles/prettyPhoto.css';
import '../../styles/responsive.css';
import '../../styles/scrollbar.css';
import '../../styles/transitions.css';
import Navbar from './components/Navbar';
import Notification from './components/Notification';
import 'malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css';
import 'malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js';
import MyAds from './components/myAds';

interface JwtPayload {
  user_id: number;
}

interface UserData {
  id: number;
  username: string; // Include other properties as needed
  email: string;
  phone_number: string;
  first_name: string;
  last_name: string;
  // add more fields as needed
}

// Lazy load ProfileSettings component
const ProfileSettings = lazy(() => import('./components/ProfileSettings'));

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('accessToken');

      if (!token) {
        setError('No token found, please log in.');
        router.push('/Login');
        return;
      }

      try {
        const decoded = jwtDecode<JwtPayload>(token);
        const userId = decoded.user_id;

        const response = await fetch(`http://127.0.0.1:8000/accounts/users/${userId}/`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
          console.log('User Name from API:', data.name);
        } else {
          setError('Failed to fetch user data.');
        }
      } catch (err) {
        setError('An error occurred while fetching data.');
      }
    };

    fetchData();
  }, [router]);

  const handleNavClick = (section: string) => {
    setActiveSection(section); // Update active section
  };

  useEffect(() => {
    if ($('.tg-verticalscrollbar').length > 0) {
      $('.tg-verticalscrollbar').mCustomScrollbar({
        axis: 'y',
      });
    }

    if ($('.tg-horizontalthemescrollbar').length > 0) {
      $('.tg-horizontalthemescrollbar').mCustomScrollbar({
        axis: 'x',
        advanced: { autoExpandHorizontalScroll: true },
      });
    }
  }, []);

  return (
    <>
      
      <header id="tg-dashboardheader" className="tg-dashboardheader tg-haslayout">
        <Navbar />
        <Notification />
      <div id="tg-sidebarwrapper" className="tg-sidebarwrapper">
				<span id="tg-btnmenutoggle" className="tg-btnmenutoggle">
					<i className="fa fa-angle-left"></i>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="67" viewBox="0 0 20 67">
            <path
              id="bg"
              className="cls-1"
              d="M20,27.652V39.4C20,52.007,0,54.728,0,67.265,0,106.515.026-39.528,0-.216-0.008,12.32,20,15.042,20,27.652Z"
            />
          </svg>
				</span>
				<div id="tg-verticalscrollbar" className="tg-verticalscrollbar">
					<strong className="tg-logo"><a href="javascript:void(0);"><img src="/Images/logod.png" alt="image description"/></a></strong>
					<div className="tg-user">
						<figure>
							<span className="tg-bolticon"><i className="fa fa-bolt"></i></span>
							<a href="javascript:void(0);"><img src="/Images/author/img-07.jpg" alt="image description"/></a>
						</figure>
						<div className="tg-usercontent">
                  {error && <p>{error}</p>}
                  {userData ? (
                    <div>
                      <h3>Hi! {userData.first_name} {userData.last_name}</h3>
                    </div>
                  ) : (
                    <p>Loading user data...</p>
                  )}
                
                <h4>Administrator</h4>
              </div>
						<a className="tg-btnedit" href="javascript:void(0);"><i className="icon-pencil"></i></a>
					</div>
					<nav id="tg-navdashboard" className="tg-navdashboard">
						<ul>
            <li className={activeSection === 'dashboard' ? 'tg-active' : ''}>
                <a href="javascript:void(0);" onClick={() => handleNavClick('dashboard')}>
                  <i className="icon-chart-bars"></i>
                  <span> Insights</span>
                </a>
            </li>
            <li className={activeSection === 'profile-settings' ? 'tg-active' : ''}>
                  <a href="javascript:void(0);" onClick={() => handleNavClick('profile-settings')}>
                    <i className="icon-cog"></i>
                    <span>Profile Settings</span>
                  </a>
                </li>
                <li className={activeSection === 'myAds' ? 'tg-active' : ''} id = "menu-item-has-children">
								<a href="javascript:void(0);" onClick={() => handleNavClick('myAds')}>
									<i className="icon-layers"></i>
									<span>My Ads</span>
								</a>
								<ul className="sub-menu">
									<li><a href="dashboard-myads.html">All Ads</a></li>
									<li><a href="dashboard-myads.html">Featured Ads</a></li>
									<li><a href="dashboard-myads.html">Active Ads</a></li>
									<li><a href="dashboard-myads.html">Inactive Ads</a></li>
									<li><a href="dashboard-myads.html">Sold Ads</a></li>
									<li><a href="dashboard-myads.html">Expired Ads</a></li>
									<li><a href="dashboard-myads.html">Deleted Ads</a></li>
								</ul>
							</li>
							<li className="menu-item-has-children">
								<a href="javascript:void(0);">
									<i className="icon-envelope"></i>
									<span>Offers/Messages</span>
								</a>
								<ul className="sub-menu">
									<li><a href="dashboard-offermessages.html">Offer Received</a></li>
									<li><a href="dashboard-offermessages.html">Offer Sent</a></li>
									<li><a href="dashboard-offermessages.html">Trash</a></li>
								</ul>
							</li>
							<li>
								<a href="dashboard-payments.html">
									<i className="icon-cart"></i>
									<span>Payments</span>
								</a>
							</li>
							<li>
								<a href="dashboard-myfavourites.html">
									<i className="icon-heart"></i>
									<span>My Favourites</span>
								</a>
							</li>
							<li>
								<a href="dashboard-privacy-setting.html">
									<i className="icon-star"></i>
									<span>Privacy Settings</span>
								</a>
							</li>
							<li>
								<a href="javascript:void(0);">
									<i className="icon-exit"></i>
									<span>Logout</span>
								</a>
							</li>
						</ul> 
					</nav>
				</div>
        <div id="tg-horizontalthemescrollbar" className="tg-horizontalthemescrollbar">
            <nav id="tg-verticalnavdashboard" className="tg-verticalnavdashboard">
              <ul>
                <li className={activeSection === 'dashboard' ? 'tg-active' : ''}><a href="javascript:void(0);" onClick={() => handleNavClick('dashboard')}><span>Insights</span></a></li>
                <li className={activeSection === 'profile-settings' ? 'tg-active' : ''}><a href="javascript:void(0);" onClick={() => handleNavClick('profile-settings')}><span>Profile Settings</span></a></li>
                <li className={activeSection === 'myAds' ? 'tg-active' : ''}><a href="javascript:void(0);" onClick={() => handleNavClick('myAds')}><span>My Ads</span></a></li>
              </ul>
            </nav>
          </div>
        </div>
        <main id="tg-main" className="tg-main tg-haslayout">
        {activeSection === 'profile-settings' && (
            <Suspense fallback={<div>Loading...</div>}>
              <ProfileSettings />
            </Suspense>
          )}
          {activeSection === 'dashboard' && (
            <section className="tg-dbsectionspace tg-haslayout tg-statistics">
            <div className="row">
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-3">
                <div className="tg-dashboardbox tg-statistic">
                  <figure><img src="/Images/icons/img-32.png" alt="image description"/></figure>
                  <div className="tg-contentbox">
                    <h2>562</h2>
                    <h3>Total Ad Posted</h3>
                    <a className="tg-btnviewdetail fa fa-angle-right" href="javascript:void(0);">View Detail</a>
                  </div>
                </div>
              </div>
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-3">
                <div className="tg-dashboardbox tg-statistic">
                  <figure><img src="/Images/icons/img-33.png" alt="image description"/></figure>
                  <div className="tg-contentbox">
                    <h2>06</h2>
                    <h3>Featured Ads</h3>
                    <a className="tg-btnviewdetail fa fa-angle-right" href="javascript:void(0);">View Detail</a>
                  </div>
                </div>
              </div>
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-3">
                <div className="tg-dashboardbox tg-statistic">
                  <figure><img src="/Images/icons/img-34.png" alt="image description"/></figure>
                  <div className="tg-contentbox">
                    <h2>04</h2>
                    <h3>Inactive Ads</h3>
                    <a className="tg-btnviewdetail fa fa-angle-right" href="javascript:void(0);">View Detail</a>
                  </div>
                </div>
              </div>
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-3">
                <div className="tg-dashboardbox tg-statistic">
                  <span className="tg-badge">7</span>
                  <figure><img src="/Images/icons/img-35.png" alt="image description"/></figure>
                  <div className="tg-contentbox">
                    <h2>45706</h2>
                    <h3>Offers / Messages</h3>
                    <a className="tg-btnviewdetail fa fa-angle-right" href="javascript:void(0);">View Detail</a>
                  </div>
                </div>
              </div>
            </div>
          </section>
          )}

          {activeSection === 'myAds' && (
            <Suspense fallback={<div>Loading...</div>}>
              <MyAds />
            </Suspense>
          )}

          {activeSection === 'my-activity-log' && (
            <section className="tg-dbsectionspace tg-haslayout">
              {/* Your activity log section */}
            </section>
          )}

          {activeSection === '' && (
            <section className="tg-dbsectionspace tg-haslayout">
              {/* Your approved ads section */}
            </section>
          )}

          {activeSection === 'total-views' && (
            <section className="tg-dbsectionspace tg-haslayout">
              {/* Your total views section */}
            </section>
          )}

          {activeSection === 'offers-messages' && (
            <section className="tg-dbsectionspace tg-haslayout">
              {/* Your offers/messages section */}
            </section>
          )}
        </main>
    </header>
    <DashboardBanner />
    

    </>
  );
};

export default DashboardLayout;
