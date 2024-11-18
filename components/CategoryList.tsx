import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import '../styles/style.css'; 

// Import the components
import JobComponent from '../components/JobComponent';
//import SportsComponent from './SportsComponent';

interface Category {
  id: number;
  name: string;
}

const CategoryForm: React.FC = () => {
  // Statically define the categories
  const categories: Category[] = [
    { id: 1, name: 'Jobs' },
    { id: 2, name: 'Sports' },
  ];

  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  // Handle form submission (optional)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Submitted for category:', selectedCategory);
    // Add your submission logic here (e.g., saving data to a database)
  };

  return (
    <div className="container1">
      <Toaster />
      <div className="form-container1">
        <h2 className="heading1">
          <p className="user-greeting">Welcome, Guest!</p>
        </h2>

        <div className="space-y-6">
          <div>
            <label htmlFor="category" className="label1">
              Category
            </label>
            <select
              id="category"
              value={selectedCategory || ''}
              onChange={(e) => setSelectedCategory(parseInt(e.target.value))}
              className="select1"
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Dynamically render the corresponding component based on the selected category */}
          {selectedCategory === 1 && <JobComponent />}
          {/*{selectedCategory === 2 && <SportsComponent />} */}
        </div>
      </div>
    </div>
  );
};

export default CategoryForm;
