import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import 'malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css';
import 'malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js';
import styles from './Sidebar.module.css'; // Ensure this CSS file includes the styles above
import Link from 'next/link';
import ProfileSettings from '../components/ProfileSettings'; // Import the ProfileSettings component

const DashboardHeader = () => {
  const [activeSection, setActiveSection] = useState('dashboard'); // State to manage active section

  useEffect(() => {
    // Initialize custom scrollbars
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

    // Toggle menu on button click
    $('#tg-btnmenutoggle').on('click', function(event) {
      event.preventDefault();
      $('#tg-sidebarwrapper').toggleClass('tg-openmenu'); // Toggle the sidebar
      $('body').toggleClass('tg-noscroll'); // Optionally disable scrolling on the body
    });
  }, []);

  const handleNavClick = (section: string) => {
    setActiveSection(section); // Update active section
  };

  return (
    <header id="tg-dashboardheader" className="tg-dashboardheader tg-haslayout">
      <nav id="tg-nav" className="tg-nav">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#tg-navigation"
            aria-expanded="false"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
        </div>
        <div id="tg-navigation" className="collapse navbar-collapse tg-navigation">
          <ul>
            {/* Navigation links */}
            <li className="menu-item-has-children">
              <a href="javascript:void(0);">Home</a>
              <ul className="sub-menu">
                <li><a href="index.html">Home V1</a></li>
                <li><a href="indexv2.html">Home V2</a></li>
              </ul>
            </li>
            {/* Other menu items */}
            <li className="menu-item-has-children current-menu-item">
              <a href="javascript:void(0);">Listings</a>
              <ul className="sub-menu">
                <li><a href="adlistinggrid.html">Ad Grid</a></li>
                <li><a href="adlistinglist.html">Ad Listing</a></li>
                <li><a href="addetail.html">Listing Detail</a></li>
              </ul>
            </li>
            <li className="menu-item-has-children">
              <a href="javascript:void(0);">Dashboard</a>
              <ul className="sub-menu">
                <li><a href="dashboard.html">Dashboard</a></li>
                <li><a href="dashboard-myads.html">Dashboard My Ads</a></li>
                <li><a href="dashboard-myfavourites.html">Dashboard Favorites</a></li>
                <li><a href="dashboard-offermessages.html">Dashboard Offer Message</a></li>
                <li><a href="dashboard-payments.html">Dashboard Payment</a></li>
                <li><a href="dashboard-postanad.html">Dashboard Post Ad</a></li>
                <li><a href="dashboard-privacy-setting.html">Dashboard Privacy Setting</a></li>
                <li><a href="javascript:void(0);" onClick={() => handleNavClick('profile-settings')}>Profile Settings</a></li>
              </ul>
            </li>
            {/* Other menu items */}
          </ul>
        </div>
      </nav>
      <div className="tg-rghtbox">
        <a className="tg-btn" href="dashboard-postanad.html">
          <i className="icon-bookmark"></i>
          <span>Post an Ad</span>
        </a>
        <div className="dropdown tg-themedropdown tg-notification">
          <button
            className="tg-btndropdown"
            id="tg-notificationdropdown"
            type="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i className="icon-alarm"></i>
            <span className="tg-badge">9</span>
          </button>
          <ul className="dropdown-menu tg-dropdownmenu" aria-labelledby="tg-notificationdropdown">
            <li><p>Consectetur adipisicing sed eiusmod tempor incididunt ut labore et dolore.</p></li>
            {/* Other notifications */}
          </ul>
        </div>
      </div>
      <div id="tg-sidebarwrapper" className="tg-sidebarwrapper">
        <span id="tg-btnmenutoggle" className="tg-btnmenutoggle">
          <i className="fa fa-angle-left"></i>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="67" viewBox="0 0 20 67">
            <path id="bg" className="cls-1" d="M20,27.652V39.4C20,52.007,0,54.728,0,67.265,0,106.515.026-39.528,0-.216-0.008,12.32,20,15.042,20,27.652Z"/>
          </svg>
        </span>
        <div id="tg-verticalscrollbar" className="tg-verticalscrollbar">
          <strong className="tg-logo"><a href="javascript:void(0);"><img src="images/logod.png" alt="Logo"/></a></strong>
          <div className="tg-user">
            <figure>
              <span className="tg-bolticon"><i className="fa fa-bolt"></i></span>
              <a href="javascript:void(0);"><img src="/Images/author/img-07.jpg" alt="User"/></a>
            </figure>
            <div className="tg-usercontent">
              <h3>Hi! Angelena</h3>
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
              {/* Other menu items */}
            </ul>
          </nav>
        </div>
        <div id="tg-horizontalthemescrollbar" className="tg-horizontalthemescrollbar">
          <nav id="tg-verticalnavdashboard" className="tg-verticalnavdashboard">
            <ul>
              <li className={activeSection === 'dashboard' ? 'tg-active' : ''}><a href="javascript:void(0);" onClick={() => handleNavClick('dashboard')}><span>Insights</span></a></li>
              <li className={activeSection === 'profile-settings' ? 'tg-active' : ''}><a href="javascript:void(0);" onClick={() => handleNavClick('profile-settings')}><span>Profile Settings</span></a></li>
              {/* Other vertical nav items */}
            </ul>
          </nav>
        </div>
      </div>
      
      {/* Conditionally render content based on activeSection */}
      <div className={styles.dashboardContent}>
        {activeSection === 'profile-settings' && <ProfileSettings />}
        {activeSection === 'dashboard' && <div> {/* Your Dashboard Content Here */} </div>}
      </div>
    </header>
  );
};

export default DashboardHeader;
