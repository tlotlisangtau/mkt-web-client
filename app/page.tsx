"use client";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import React, { useRef } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import Nav from "@/components/Nav";
import Banner from "@/components/banner";
import Searchform from "@/components/Searchform";
import Categorysection from "@/components/Categorysection";
import Products4_block from "@/components/Products4_block";
import Footer from "@/components/footer";
import Pricing from "@/components/pricing";
import WhyChooseUs from "@/components/WhyChooseUs";
import Specifications from "@/components/Specifications";

const queryClient = new QueryClient();

const HomePage: React.FC = () => {
  const latestAdsRef = useRef<HTMLDivElement>(null);
  const whyChooseUsRef = useRef<HTMLDivElement>(null); // Ref for Why Choose Us section
  const categoriesRef = useRef<HTMLDivElement>(null); // Create a ref for Latest Ads section

  return (
    <>
      <Nav
        latestAdsRef={latestAdsRef}
        whyChooseUsRef={whyChooseUsRef}
        categoriesRef={categoriesRef}
      />
      <Banner />
      <Searchform />
      <div ref={categoriesRef}>
        {" "}
        <Categorysection />
      </div>

      <div ref={latestAdsRef}>
        {" "}
        <Products4_block />
      </div>
      <Specifications />
      <div ref={whyChooseUsRef}>
        {" "}
        <WhyChooseUs />
      </div>
      <Footer />
    </>
  );
};

const Home: React.FC = () => {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <HomePage />
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default Home;
