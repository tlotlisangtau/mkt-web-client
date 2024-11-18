"use client";

import React, { useState, useEffect } from "react";
import CategoryForm from "@/components/CategoryList";
import Modal from "@/components/Modal";

const CategoriesPage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      setIsModalOpen(true);
    }
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
    window.location.href = "/api/auth/login"; // Redirect to login page
  };

  if (isLoggedIn === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="categories-page">
      {isLoggedIn ? (
        <CategoryForm />
      ) : (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <p>You need to log in first.</p>
        </Modal>
      )}
    </div>
  );
};

export default CategoriesPage;
