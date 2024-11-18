import React from 'react'

function Navbar() {
  return (
<nav id="tg-nav" className="tg-nav">
				<div className="navbar-header">
					<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#tg-navigation" aria-expanded="false">
						<span className="sr-only">Toggle navigation</span>
						<span className="icon-bar"></span>
						<span className="icon-bar"></span>
						<span className="icon-bar"></span>
					</button>
				</div>
				<div id="tg-navigation" className="collapse navbar-collapse tg-navigation">
					<ul>
						<li className="menu-item-has-children">
							<a href="javascript:void(0);">Home</a>
							<ul className="sub-menu">
								<li><a href="index.html">Home V1</a></li>
								<li><a href="indexv2.html">Home V2</a></li>
							</ul>
						</li>
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
								<li><a href="dashboard-privacy-setting.html">Dashboard privacy Setting</a></li>
								<li><a href="dashboard-profile-setting.html">Dashboard Profile Setting</a></li>
							</ul>
						</li>
						<li className="menu-item-has-children">
							<a href="javascript:void(0);">Pages</a>
							<ul className="sub-menu">
								<li><a href="aboutus.html">About</a></li>
								<li><a href="contactus.html">Contact Us</a></li>
								<li className="menu-item-has-children">
									<a href="javascript:void(0);">News</a>
									<ul className="sub-menu">
										<li><a href="newsgrid.html">News grid</a></li>
										<li><a href="newslist.html">News list</a></li>
										<li><a href="newsdetail.html">News detail</a></li>
									</ul>
								</li>
								<li><a href="404error.html">404 Error</a></li>
								<li><a href="comingsoon.html">Coming Soon</a></li>
								<li><a href="packages.html">Packages</a></li>
								<li><a href="loginsignup.html">Login/Register</a></li>
							</ul>
						</li>
					</ul>
				</div>
			</nav>
  )
}

export default Navbar;
