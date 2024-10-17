"use client";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import Nav from "@/components/Nav";
import Banner from "@/components/banner";
import Searchform from "@/components/Searchform";
import Categorysection from "@/components/Categorysection";
import Products4_block from "@/components/Products4_block";

const queryClient = new QueryClient();

const HomePage: React.FC = () => {
  return (
    <>
      <Nav />
      <Banner />
      <Searchform />
      <Categorysection />
      <Products4_block />
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
