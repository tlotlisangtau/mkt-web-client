"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import supabase from '../../utils/supabaseClient'; // Make sure to import your supabase client
import Nav from '@/components/Nav';
import '../../styles/style.css'
import Footer from '@/components/footer';

interface Category {
  id: number;
  name: string;
}

const AddAd: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState('');
  const [location, setLocation] = useState('');
  const [condition, setCondition] = useState('');
  const [brand, setBrand] = useState('');
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [otherFeature1, setOtherFeature1] = useState('');
  const [otherFeature2, setOtherFeature2] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    // Fetch categories from the API
    const fetchCategories = async () => {
      try {
        const response = await axios.get<Category[]>('http://localhost:8000/api/categories/');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let imageUrl: string | null = null;

      if (image) {
        // Upload the image to Supabase
        const { data, error: uploadError } = await supabase.storage
          .from('images')
          .upload(`public/${image.name}`, image);

        if (uploadError) throw uploadError;

        // Generate the public URL for the uploaded image
        imageUrl = `https://mrcrgxijqzzfzrmhfkjb.supabase.co/storage/v1/object/public/images/${data?.path}`;
      }

      // Post the data to your backend
      const response = await axios.post('http://127.0.0.1:8000/api/products/', {
        name,
        description,
        price,
        type,
        location,
        condition,
        brand,
        size,
        color,
        other_feature1: otherFeature1,
        other_feature2: otherFeature2,
        image_url: imageUrl,
        category: category,
      });

      if (response.status === 201) {
        setSuccess('Product added successfully!');
        // Reset form fields or redirect as needed
      } else {
        throw new Error('Failed to add product');
      }
    } catch (error: any) {
      console.error('Submit error:', error);
      setError(error.message);
    }
  };

  return (
    <>
    <Nav />
    <div className="add-ad-form mt-5">
      <h1 className='title'>Add New Product</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </label>
        <label>
          Price:
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </label>
        <label>
          Type:
          <input type="text" value={type} onChange={(e) => setType(e.target.value)} required />
        </label>
        <label>
          Location:
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
        </label>
        <label>
          Condition:
          <input type="text" value={condition} onChange={(e) => setCondition(e.target.value)} required />
        </label>
        <label>
          Brand:
          <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} required />
        </label>
        <label>
          Size:
          <input type="text" value={size} onChange={(e) => setSize(e.target.value)} required />
        </label>
        <label>
          Color:
          <input type="text" value={color} onChange={(e) => setColor(e.target.value)} required />
        </label>
        <label>
          Other Feature 1:
          <input type="text" value={otherFeature1} onChange={(e) => setOtherFeature1(e.target.value)} />
        </label>
        <label>
          Other Feature 2:
          <input type="text" value={otherFeature2} onChange={(e) => setOtherFeature2(e.target.value)} />
        </label>
        <label>
          Category:
          <select value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Image:
          <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)} />
        </label>
        <button type="submit">Add Product</button>
      </form>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </div>
    <Footer />
    </>
  );
};

export default AddAd;
