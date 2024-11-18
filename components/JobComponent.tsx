'use client';
import React, { useState, useEffect, FormEvent, DragEvent } from 'react';
import '../styles/style.css'; 
import { jwtDecode } from "jwt-decode";
import toast, { Toaster } from 'react-hot-toast';
import supabase from '../utils/supabaseClient';
import { useRouter } from 'next/navigation';
import { jobSchema } from "@/lib/validationSchema";
import { z } from "zod";

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

const JobComponent: React.FC = () => {
  // State to hold the form data
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    salary: '',
    image_urls: '',
    mobile_number: '',
    job_location: '',
    company: '',
    valid_until: '',
    complete: false,
    category_id: 1,
    department: ''
  });

  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [formattedDate, setFormattedDate] = useState<string>("");
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
 // const formattedFieldName = field.name.toLowerCase().replace(/ /g, "_");
 const [username, setUsername] = useState<string | null>(null);
 const [errors, setErrors] = useState<Record<string, string>>({});
 const router = useRouter();
 

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
  
    setFormData((prev) => ({ ...prev, [name]: value }));
  
    // Real-time validation
    if (name in jobSchema.shape) {
      const result = (jobSchema.shape[name as keyof typeof jobSchema.shape] as z.ZodTypeAny).safeParse(value);
      setErrors((prev) => ({
        ...prev,
        [name]: result.success ? "" : result.error?.issues[0]?.message || "",
      }));
    }
  };
  
  

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isoDate = e.target.value; // Date in yyyy-mm-dd format from the date picker
    const dateParts = isoDate.split("-");

    if (dateParts.length === 3) {
      const formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`; // Convert to dd/mm/yyyy
      setFormData((prev) => ({ ...prev, Deadline: formattedDate }));
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

  useEffect(() => {
    getUserNameFromToken().then((name) => {
      if (name) {
        setUsername(name);
      } else {
        console.log(userId);
      }
    });
  }, []);

  useEffect(() => {
    if (userId !== null) {
      console.log("User ID updated:", userId);
    }
  }, [userId]);

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('accessToken'); // Retrieve the token from localStorage
      console.log("Token in localStorage:", token);

      const validatedData = jobSchema.parse(formData);

      console.log("Validated Data:", validatedData);
  
      // Log formData before submission (without images)
      console.log("Form Data before submission:", formData);
  
      // Build dataToSubmit conditionally based on category
      const dataToSubmit: Record<string, any> = {
        ...formData,
        category: 1, // Send the selectedCategory ID instead of name
        user_id: userId,
      };
  
 
      console.log('Submitting data:', dataToSubmit);
      console.log('User ID:', userId); // Log the data being submitted
  
      // Submit the form data first (without images)
      const endpoint = `https://ikahemarketapp-b1c3e9e6f70a.herokuapp.com/api/jobs/`;
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
        const updateEndpoint = `https://ikahemarketapp-b1c3e9e6f70a.herokuapp.com/api/jobs/${responseData.id}/`; // Use the ID of the successfully submitted form
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
      if (error instanceof z.ZodError) {
        // Map Zod errors to your form's error state
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(fieldErrors); // Update error state
        //toast.error(setErrors(errors));
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>

      <div className='move'>
  <label htmlFor="department" className="label1">
    Department
  </label>
  <select
    id="department"
    value={selectedDepartment || ""}
    onChange={handleDepartmentChange}
    className={`select1 ${!selectedDepartment ? "select-error" : "select-success"}`}
  >
    <option value="" disabled>
      Select a department
    </option>
    {departments.map((department) => (
      <option key={department.value} value={department.value}>
        {department.label}
      </option>
    ))}
  </select>
  {!selectedDepartment && (
    <p className="select-error-message">Please select a department</p>
  )}
</div>



        {/* Name */}
        <div className='move'>
          <label htmlFor="name">Job Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`input1 ${errors.name ? "input-error" : "input-success"}`}
          />
          {errors.name && <p className="Form-error">{errors.name}</p>}
        </div>

        {/* Description */}
        <div className='move'>
          <label htmlFor="description">Job Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={`input1 ${errors.description ? "input-error" : "input-success"}`}
          />
          {errors.description && <p className="Form-error">{errors.description}</p>}
        </div>

        {/* Salary */}
        <div className='move'>
          <label htmlFor="salary">Salary</label>
          <input
            type="number"
            id="salary"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            className={`input1 ${errors.salary ? "input-error" : "input-success"}`}
          />
          {errors.salary && <p className="Form-error">{errors.salary}</p>}
        </div>

        {/* Mobile Number */}
        <div className='move'>
          <label htmlFor="mobile_number">Mobile Number</label>
          <input
            type="text"
            id="mobile_number"
            name="mobile_number"
            value={formData.mobile_number}
            onChange={handleChange}
            className={`input1 ${errors.mobile_number ? "input-error" : "input-success"}`}
          />
          {errors.mobile_number && <p className="Form-error">{errors.mobile_number}</p>}
        </div>

        {/* Job Location */}
        <div className='move'>
          <label htmlFor="job_location">Job Location</label>
          <input
            type="text"
            id="job_location"
            name="job_location"
            value={formData.job_location}
            onChange={handleChange}
            className={`input1 ${errors.job_location ? "input-error" : "input-success"}`}
          />
          {errors.job_location && <p className="Form-error">{errors.job_location}</p>}
        </div>

        {/* Company */}
        <div className='move'>
          <label htmlFor="company">Company</label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className={`input1 ${errors.company ? "input-error" : "input-success"}`}
          />
           {errors.company && <p className="Form-error">{errors.company}</p>}
        </div>

        {/* Valid Until */}
        <div className='move'>
        <label htmlFor="valid_until">Deadline</label>
        <input
            type="text"
            id="valid_until"
            name="valid_until"
            className={`input1 ${errors.valid_until ? "input-error" : "input-success"}`}
            placeholder="dd/mm/yyyy"
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
            onChange={handleChange}
            value={formData.valid_until || ""}
        />
       {/* {errors.valid_until && <p className="Form-error">{errors.valid_until}</p>} */}
        </div>


        {/* Complete (Checkbox) */}
        <div>
          <label htmlFor="complete">Complete</label>
          <input
            type="checkbox"
            id="complete"
            name="complete"
            checked={formData.complete}
            onChange={handleChange}
            className="input1"
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

        {/* Category ID (Hidden, as it's already set to 1) */}
        <input type="hidden" name="category_id" value={formData.category_id} />

        {/* Submit Button */}
        <button type="submit" className="button1">
                Submit
        </button>
      </form>
    </div>
  );
};

export default JobComponent;
