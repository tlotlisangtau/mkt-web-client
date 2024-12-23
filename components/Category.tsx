'use client';
import React, { useState, useEffect, FormEvent, DragEvent } from 'react';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import supabase from '../utils/supabaseClient';
import '../styles/style.css'; 
import { jwtDecode } from "jwt-decode";

interface Category {
  id: number;
  name: string;
  complete?: boolean; // Add 'complete' field for checkbox
}

interface FormField {
  name: string;
  type: "text" | "number" | "tel" | "date" | "select";
  options?: string[];
}

interface DecodedToken {
  user_id: number;
}

interface User {
  username: string;
}



const departments = [
  { label: 'Sale & Marketing', value: 'Sale & Marketing' },
  { label: 'IT & Engineering', value: 'IT & Engineering' },
  { label: 'Finance & Accounting', value: 'Finance & Accounting' },
  { label: 'Human Resources & Legal', value: 'Human Resources & Legal' },
  { label: 'Agriculture & Farm', value: 'Agriculture & Farm' },
  { label: 'Healthcare & Nursing', value: 'Healthcare & Nursing' },
  { label: 'Manufacturing & Retail', value: 'Manufacturing & Retail' },
  { label: 'Government & NGO', value: 'Government & NGO' },
  { label: 'Others', value: 'Others' }
];

const Type = [
  { label: 'Football', value: 'Football' },
  { label: 'Rugby', value: 'Rugby' },
  { label: 'Tennis', value: 'Tennis' },
  { label: 'Gym', value: 'Gym'},
  { label: 'General', value: 'General'},
];

const others_types = [
  { label: 'Men', value: 'Men' },
  { label: 'Women', value: 'Women' },
  { label: 'Kids', value: 'Kids' },
  { label: 'Others', value: 'Others'},
];

const automotives_types = [
  { label: 'Cars', value: 'Cars' },
  { label: 'Motorcycles', value: 'Motorcycles' },
  { label: 'Trucks', value: 'Trucks' },
  { label: 'Bicycles', value: 'Bicycles'},
  { label: 'Parts', value: 'Parts'},
  { label: 'Other Vehicles', value: 'Other Vehicles'},
];

const electronic_types = [
  { label: 'Cell Phones', value: 'Cell Phones' },
  { label: 'Computers', value: 'Computers' },
  { label: 'TV and Audio', value: 'TV and Audio' },
  { label: 'Camera', value: 'Camera'},
  { label: 'Other Equipment', value: 'Other Equipment'},
];

const furniture_types = [
  { label: 'Living Room', value: 'Living Room' },
  { label: 'Bedroom', value: 'Bedroom' },
  { label: 'Office', value: 'Office' },
  { label: 'Outdoor', value: 'Outdoor'},
  { label: 'Other Furniture', value: 'Other Furniture'},
];

const carMakes = [
  "Audi",
  "BMW",
  "Chevrolet",
  "Dodge",
  "Ford",
  "Honda",
  "Hyundai",
  "Kia",
  "Mazda",
  "Mercedes-Benz",
  "Nissan",
  "Toyota",
  "Volkswagen",
  "Volvo",
  "Others",
]; 

const brand = [
  "Apple",
  "Samsung",
  "Sony",
  "LG",
  "Panasonic",
  "Dell",
  "HP",
  "Lenovo",
  "Microsoft",
  "Asus",
  "Acer",
  "Toshiba",
  "Huawei",
  "Others",
];

const CategoryForm: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [images, setImages] = useState<File[]>([]); // Updated to handle multiple images
  const [imagePreviews, setImagePreviews] = useState<string[]>([]); // For displaying image previews
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedAutomotivesTypes, setSelectedAutomotivesTypes] = useState<string | null>(null);
  const [selectedElectronicsTypes, setSelectedElectronicsTypes] = useState<string | null>(null);
  const [selectedFurnitureTypes, setSelectedFurnitureTypes] = useState<string | null>(null);
  const [selectedOthersTypes, setSelectedOthersTypes] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [formattedDate, setFormattedDate] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const router = useRouter();

  useEffect(() => {
    fetch("https://ikahemarketapp-b1c3e9e6f70a.herokuapp.com/api/categories/")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  useEffect(() => {
    setFormData({});
    switch (selectedCategory) {
      case 1: // Jobs
        setFormFields([
          { name: "Name", type: "text" },
          { name: "Description", type: "text" },
          { name: "Salary", type: "number" },
          { name: "Job Location", type: "text" },
          { name: "Mobile Number", type: "tel" },
          { name: "Company", type: "text" },
          { name: "Valid Until", type: "text" },
        ]);
        break;
      case 2: // Sports
        setFormFields([
          { name: "Name", type: "text" },
          { name: "Description", type: "text" },
          { name: "Price", type: "number" },
          { name: "Brand", type: "text" },
          { name: "Size", type: "text" },
          { name: "Location", type: "text" },
          { name: "Mobile Number", type: "text" },
          { name: "Condition", type: "select", options: ["New", "Used"] },
        ]);
        break;
      case 3: // Furniture
        setFormFields([
          { name: "Name", type: "text" },
          { name: "Description", type: "text" },
          { name: "Price", type: "number" },
          { name: "Color", type: "text" },
          { name: "Mobile Number", type: "text" },
          { name: "Location", type: "text" },
          { name: "Condition", type: "select", options: ["New", "Used"] },
        ]);
        break;
      case 8: // Automotives
        setFormFields([
          { name: "Name", type: "text" },
          { name: "Description", type: "text" },
          { name: "Price", type: "number" },
          { name: "Make", type: "select", options: carMakes }, 
          { name: "Model", type: "text" },
          { name: "Mileage", type: "text" },
          { name: "Location", type: "text" },
          { name: "Year", type: "text" },
          { name: "Mobile Number", type: "text" },
          { name: "Condition", type: "select", options: ["New", "Used"] },
        ]);
        break;
      case 10: // Health & Beauty
        setFormFields([
          { name: "Name", type: "text" },
          { name: "Description", type: "text" },
          { name: "Price", type: "number" },
          { name: "Location", type: "text" },
          { name: "Model", type: "text" },
          { name: "Warranty", type: "text" },
          { name: "Mobile Number", type: "text" },
          { name: "Condition", type: "select", options: ["New", "Used"] },
        ]);
        break;
      case 12: // Others
        setFormFields([
          { name: "Name", type: "text" },
          { name: "Description", type: "text" },
          { name: "Price", type: "number" },
          { name: "Location", type: "text" },
          { name: "Mobile Number", type: "text" },
          { name: "Condition", type: "select", options: ["New", "Used"] },
        ]);
        break;
      default:
        setFormFields([]);
        break;
    }
  }, [selectedCategory]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isoDate = e.target.value; // Date in yyyy-mm-dd format from the date picker
    const dateParts = isoDate.split("-");

    if (dateParts.length === 3) {
      const formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`; // Convert to dd/mm/yyyy
      setFormData((prev) => ({ ...prev, Deadline: formattedDate }));
    }
  };


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    // Allow only numbers for specific fields
    if (name === "Valid Until") {
      handleDateChange(e as React.ChangeEvent<HTMLInputElement>);
    } else if (name === "Salary" || name === "Mobile Number") {
      // Allow only numbers for these fields
      const numericValue = value.replace(/\D/g, "");
      setFormData((prev) => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };


  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedDepartment(value);
    setFormData({
      ...formData,
      department: value
    });
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedType(value);
    setFormData({
      ...formData,
      type: value
    });
  };

  const handleOthersTypesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedOthersTypes(value);
    setFormData({
      ...formData,
      others_types: value
    });
  };


  const handleAutomotivesTypesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    console.log("Selected Automotive Type:", value); // Debugging log
    setSelectedAutomotivesTypes(value);
    setFormData({
      ...formData,
      automotives_types: value
    });
  };

  const handleElectronicsTypesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    console.log("Selected Electronics Type:", value); // Debugging log
    setSelectedElectronicsTypes(value);
    setFormData({
      ...formData,
      electronic_types: value
    });
  };

  const handleFurnitureTypesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    console.log("Selected Furniture Type:", value); // Debugging log
    setSelectedFurnitureTypes(value);
    setFormData({
      ...formData,
      furniture_types: value
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImages(files);
      const previews = files.map(file => URL.createObjectURL(file));
      setImagePreviews(previews);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files) {
      const files = Array.from(e.dataTransfer.files);
      setImages(files);
      const previews = files.map(file => URL.createObjectURL(file));
      setImagePreviews(previews);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // Function to fetch user data using user_id from the token
  const fetchUsername = async (userId: number) => {
    try {
      const response = await fetch(
        `https://ikahemarketapp-b1c3e9e6f70a.herokuapp.com/accounts/${userId}/`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const data: User = await response.json();
      return data.username;
    } catch (error) {
      console.error("Error fetching username:", error);
      return null;
    }
  };

  // Function to extract user's ID from the JWT token and fetch the username
  const getUserNameFromToken = async () => {
    const token = localStorage.getItem('accessToken'); // Assuming the token is stored in localStorage

    console.log("Token in localStorage:", token); // Debugging log

    if (token) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(token); // Decode token to extract user_id
        console.log("Decoded Token:", decodedToken); // Log the decoded token

        if (decodedToken.user_id) {
          setUserId(decodedToken.user_id);
          const fetchedUsername = await fetchUsername(decodedToken.user_id);
          return fetchedUsername || null; // Assuming the API returns 'username'
        } else {
          console.error("Decoded token does not have user_id");
        }
      } catch (error) {
        console.error("Error decoding token:", error); // Log any decoding errors
      }
    } else {
      console.error("No token found in localStorage");
    }
    return null;
  };

  // Use effect to get the username when the component mounts
  useEffect(() => {
    getUserNameFromToken().then((name) => {
      if (name) {
        setUsername(name);
      } else {
        console.log(userId);
      }
    });
  }, []);

  // Log userId updates
  useEffect(() => {
    if (userId !== null) {
      console.log("User ID updated:", userId);
    }
  }, [userId]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('accessToken'); // Retrieve the token from localStorage
      console.log("Token in localStorage:", token);
  
      // Log formData before submission (without images)
      console.log("Form Data before submission:", formData);
  
      // Build dataToSubmit conditionally based on category
      const dataToSubmit: Record<string, any> = {
        ...formData,
        category: selectedCategory, // Send the selectedCategory ID instead of name
        user_id: userId,
      };
  
      if (selectedCategory === 3) {
        dataToSubmit.furniture_types = formData.furniture_types;
      }
  
      if (selectedCategory === 8) {
        dataToSubmit.automotives_types = formData.automotives_types;
      }
  
      if (selectedCategory === 12) {
        dataToSubmit.others_types = formData.others_types;
      }
  
      if (selectedCategory === 10) {
        dataToSubmit.electronic_types = formData.electronic_types;
      }
  
      if (selectedCategory === 2) {
        dataToSubmit.type = formData.type;
      }
  
      console.log('Submitting data:', dataToSubmit);
      console.log('User ID:', userId); // Log the data being submitted
  
      // Submit the form data first (without images)
      const endpoint = `https://ikahemarketapp-b1c3e9e6f70a.herokuapp.com/api/${getCategoryEndpoint()}/`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(dataToSubmit)
      });
  
      if (response.ok) {
        const responseData = await response.json();
        console.log('Form submission success:', responseData);
  
        // If the form is successfully submitted, then proceed with uploading images
        const imageUrls: string[] = [];
        for (const image of images) {
          const timestamp = Date.now();
          const newImageName = `${timestamp}_${image.name}`;
          // Upload the image to Supabase
          const { data, error: uploadError } = await supabase.storage
            .from('images')
            .upload(`public/${newImageName}`, image);
  
          if (uploadError) throw uploadError;
  
          // Generate the public URL for the uploaded image
          const imageUrl = `https://mrcrgxijqzzfzrmhfkjb.supabase.co/storage/v1/object/public/images/${data.path}`;
          imageUrls.push(imageUrl);
        }
  
        // Update the form submission with image URLs
        const updateEndpoint = `https://ikahemarketapp-b1c3e9e6f70a.herokuapp.com/api/${getCategoryEndpoint()}/${responseData.id}/`; // Use the ID of the successfully submitted form
        const updateResponse = await fetch(updateEndpoint, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ image_urls: imageUrls })
        });
  
        if (updateResponse.ok) {
          toast.success('Product added successfully!');
          setTimeout(() => {
            router.push('/dashboard'); // Redirect to a protected page
          }, 1000);
        } else {
          toast.error('Failed to update product with images.');
        }
        
      } else {
        const responseText = await response.text();
        console.error('Error response:', responseText);
        toast.error('Failed to add product.');
      }
    } catch (error: any) {
      console.error('Submit error:', error);
      toast.error('Failed to add product.');
    }
  };
  
  const getCategoryEndpoint = () => {
    switch (selectedCategory) {
      case 1:
        return "jobs";
      case 2:
        return "sports";
      case 3:
        return "furniture";
      case 8:
        return "automotives";
      case 10:
        return "electronics";
      case 12:
        return "others";
      default:
        return "";
    }
  };

  return (
    <div className="container1">
      <Toaster />
      <div className="form-container1">
        <h2 className="heading1">
          {username ? (
            <p className="user-greeting">Welcome, {username}!</p>
          ) : (
            <p className="user-greeting">Welcome, Guest!</p>
          )}
        </h2>

        <div className="space-y-6">
          <div>
            <label htmlFor="category" className="label1">
              Category
            </label>
            <select
              id="category"
              value={selectedCategory || ""}
              onChange={(e) => setSelectedCategory(parseInt(e.target.value))}
              className="select1"
            >
              <option value="" disabled >Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {selectedCategory === 1 && (
            <div>
              <label htmlFor="department" className="label1">
                Department
              </label>
              <select
                id="department"
                value={selectedDepartment || ""}
                onChange={handleDepartmentChange}
                className="select1"
              >
                <option value="" disabled >Select a department</option>
                {departments.map((department) => (
                  <option key={department.value} value={department.value}>
                    {department.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {selectedCategory === 2 && (
            <div>
              <label htmlFor="Type" className="label1">
                Type
              </label>
              <select
                id="Type"
                value={selectedType || ""}
                onChange={handleTypeChange}
                className="select1"
              >
                <option value="" disabled >Select a sport type</option>
                {Type.map((sportType) => (
                  <option key={sportType.value} value={sportType.value}>
                    {sportType.label}
                  </option>
                ))}
              </select>
            </div>
          )}


          {formFields.length > 0 && (
            <form onSubmit={handleSubmit}>
              {selectedCategory === 8 && (
                <div>
                  <label htmlFor="automotives_types" className="label1">
                    Automotive Type
                  </label>
                  <select
                    id="automotives_types"
                    value={selectedAutomotivesTypes || ""}
                    onChange={handleAutomotivesTypesChange}
                    className="select1"
                  >
                    <option value="" disabled >Select automotive type</option>
                    {automotives_types.map((automotive) => (
                      <option key={automotive.value} value={automotive.value}>
                        {automotive.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {selectedCategory === 12 && (
                <div>
                  <label htmlFor="others_types" className="label1">
                  Others Type
                  </label>
                  <select
                    id="others_types"
                    value={selectedOthersTypes || ""}
                    onChange={handleOthersTypesChange}
                    className="select1"
                  >
                    <option value="" disabled>Select type</option>
                    {others_types.map((others) => (
                      <option key={others.value} value={others.value}>
                        {others.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {selectedCategory === 3 && (
                <div>
                  <label htmlFor="furniture_types" className="label1">
                  Furniture Type
                  </label>
                  <select
                    id="furniture_types"
                    value={selectedFurnitureTypes || ""}
                    onChange={handleFurnitureTypesChange}
                    className="select1"
                  >
                    <option value="" disabled >Select furniture type</option>
                    {furniture_types.map((furniture) => (
                      <option key={furniture.value} value={furniture.value}>
                        {furniture.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {selectedCategory === 10 && ( 
                <>
                <div>
                  <label htmlFor="electronic_types" className="label1">
                    Electronics Type
                  </label>
                  <select
                    id="electronic_types"
                    value={selectedElectronicsTypes || ""}
                    onChange={handleElectronicsTypesChange}
                    className="select1"
                  >
                    <option value="" disabled >Select electronics type</option>
                    {electronic_types.map((electronic) => (
                      <option key={electronic.value} value={electronic.value}>
                        {electronic.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="brand" className="label1">
                    Brand
                  </label>
                  <select
                    id="brand"
                    className="select1"
                    onChange={handleChange}
                  >
                    <option value="" disabled >Select a brand</option>
                    {brand.map((make, index) => (
                      <option key={index} value={make}>
                        {make}
                      </option>
                    ))}
                  </select>
                </div>
                </>
              )}

{formFields.map((field, index) => {
  // Generate formatted field name
  const formattedFieldName = field.name.toLowerCase().replace(/ /g, "_");

  return (
    <div key={index}>
      <label
        htmlFor={formattedFieldName}
        className="label1"
      >
        {field.name}
      </label>
      {field.type === "select" ? (
        <select
          id={formattedFieldName}
          name={formattedFieldName}
          className="select1"
          onChange={handleChange}
          value={formData[formattedFieldName] || ""}
        >
          <option value="" disabled>
            Select {field.name}
          </option>
          {field.options?.map((option, idx) => (
            <option key={idx} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : field.name === "Valid Until" ? (
        <input
          type="text"
          id={formattedFieldName}
          name={formattedFieldName}
          className="input1"
          placeholder="dd/mm/yyyy"
          onFocus={(e) => (e.target.type = "date")}
          onBlur={(e) => (e.target.type = "text")}
          onChange={handleChange}
          value={formData[formattedFieldName] || ""}
        />
      ) : (
        <input
          type={field.type}
          id={formattedFieldName}
          name={formattedFieldName}
          className="input1"
          onChange={handleChange}
          value={formData[formattedFieldName] || ""}
        />
      )}
    </div>
  );
})}


              {/* Complete Checkbox */}
              <div>
                <label htmlFor="complete" className="label1">
                  Complete
                </label>
                <input
                  type="checkbox"
                  id="complete"
                  className="input1"
                  checked={formData.complete || false}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      complete: e.target.checked,
                    })
                  }
                />
              </div>

              {/* Image Upload Section */}
              <div
                className="dropzone"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                style={{
                  border: "2px dashed #ccc",
                  padding: "20px",
                  textAlign: "center",
                }}
              >
                <p>Drag and drop images here or click to select files</p>
                <input
                  type="file"
                  id="images"
                  className="input1"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
                <button
                  type="button"
                  onClick={() => document.getElementById("images")?.click()}
                  className="button1"
                >
                  Select Images
                </button>
              </div>
              <br />
              {imagePreviews.length > 0 && (
                <div className="image-previews">
                  {imagePreviews.map((preview, index) => (
                    <img key={index} src={preview} alt={`Preview ${index}`} />
                  ))}
                </div>
              )}
              <button type="submit" className="button1">
                Submit
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryForm;
