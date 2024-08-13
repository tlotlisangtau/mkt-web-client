'use client';

import '@fortawesome/fontawesome-free/css/all.min.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import Nav from '@/components/Nav';
import Banner from '@/components/banner';
import Searchform from '@/components/Searchform';
import Categorysection from '@/components/Categorysection';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Products4_block from '@/components/Products4_block';
import Specifications from '@/components/Specifications';
import Pricing from '@/components/pricing';
import WhyChooseUs from '@/components/WhyChooseUs';
import Footer from '@/components/footer';
import Sidebar from '@/components/sidebar';
import ProductDetail from '@/components/ProductDetail';


const queryClient = new QueryClient();
const imagePath = 'public/Screenshot from 2024-03-15 04-28-26.png';
const HomePage: React.FC = () => {
  return (
    <>
      <Nav />
      <Banner />
      <Searchform />
      <Categorysection />
      <Products4_block />
      <Specifications />
      <Pricing />
      <WhyChooseUs />
      <Footer />
    </>
  );
};

const App: React.FC = () => {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* Add more routes as needed */}
          </Routes>
        </Router>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default App;
