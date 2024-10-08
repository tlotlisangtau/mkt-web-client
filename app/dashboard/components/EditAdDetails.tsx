import React, { useEffect, useState } from 'react';
import '../styles/editAdDetails.css'; // Import the CSS file
import supabase from '../../../utils/supabaseClient';

interface Post {
  id: number;
  name?: string;
  price: string;
  location: string;
  company: string;
  job_location: string;
  description: string;
  mobile_number?: string;
  brand?: string;
  size?: string;
  material: string;
  department: string;
  ingredients: string;
  property_type: string;
  color: string;
  dimensions: string;
  condition?: string;
  type?: string;
  category_id: number;
  category: string;
  salary?: string;
  valid_until?: string;
  complete?: boolean;
  image_urls: string[]; // Add image_url to the Post interface
}

interface EditAdDetailsProps {
  post: Post;
  onCancel: () => void;
  onSaveSuccess: (updatedPost: Post) => void; // Callback to refresh data after saving
}

const categoryMap: { [key: number]: string } = {
  5: 'jobs',
  7: 'sports',
  8: 'furniture',
  9: 'realestate',  
  10: 'healthbeauty',
};

function EditAdDetails({ post, onCancel, onSaveSuccess }: EditAdDetailsProps) {
  const [isComplete, setIsComplete] = useState(false);
  const [adDetails, setAdDetails] = useState<Post | null>(null);
  const [isSaving, setIsSaving] = useState(false); // State for tracking saving status
  const [images, setImages] = useState<File[]>([]); // State for the uploaded image
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  useEffect(() => {
    // Fetch detailed ad info from backend
    const fetchAdDetails = async () => {
      const category = post.category?.toLowerCase(); 
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/${category}/ads/${post.id}/`);
        const data = await response.json();
        console.log('Fetched data:', data);
        setAdDetails({ ...data, complete: data.complete ?? false }); // Set the fetched ad details
      } catch (error) {
        console.error('Error fetching ad details:', error);
      }
    };

    fetchAdDetails();
  }, [post]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    const inputValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    console.log(`Checkbox '${name}' clicked. New value: ${inputValue}`);

    setAdDetails((prevDetails) =>
      prevDetails ? { ...prevDetails, [name]: inputValue } : null
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImages(files);
      const previews = files.map(file => URL.createObjectURL(file));
      setImagePreviews(previews);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adDetails) return; // Prevent submission if adDetails is null
  
    setIsSaving(true); // Set the saving state
    const category = categoryMap[adDetails.category_id || 1]; // Fallback to 'jobs'
  
    let uploadedImageUrls: string[] = []; // Array to hold uploaded image URLs
  
    // Check if images were selected for upload
    if (images.length > 0) {
      // Upload each image to Supabase
      for (const image of images) {
        const { data, error: uploadError } = await supabase.storage
          .from('images')
          .upload(`public/${image.name}`, image); // Use image.name here
  
        if (uploadError) {
          console.error('Error uploading image:', uploadError);
          alert('Failed to upload image: ' + uploadError.message); // Notify user
          setIsSaving(false); // Reset saving state
          return; // Exit if there's an upload error
        }
  
        // Generate the public URL for the uploaded image
        const publicUrl = `https://mrcrgxijqzzfzrmhfkjb.supabase.co/storage/v1/object/public/images/${data.path}`;
        uploadedImageUrls.push(publicUrl); // Collect the URL
      }
  
      // Update the adDetails with all uploaded image URLs
      adDetails.image_urls[0] = uploadedImageUrls.join(','); // Joining as a string if necessary
    }
  
    console.log('Submitting to:', category);
  
    if (!category) {
      console.error('Category is undefined. Cannot submit form.');
      setIsSaving(false); // Reset saving state
      return; // Prevent submission if category is undefined
    }
  
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/${category}/ads/${post.id}/`, {
        method: 'PATCH', // Or 'PATCH' if you're only updating part of the ad
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(adDetails),
      });
  
      if (response.ok) {
        console.log('Changes saved successfully.');
        onSaveSuccess(adDetails as Post); // Pass the updatedPost object here
        onCancel(); // Call to refresh the data or notify the parent component
      } else {
        const errorText = await response.text();
        console.error('Failed to save changes:', errorText); // Log response text
        alert('Failed to save changes: ' + errorText); // Alert user
      }
    } catch (error) {
      console.error('Error saving changes:', error);
    } finally {
      setIsSaving(false); // Reset saving state
    }
  };
  

  if (!adDetails) {
    return <p>Loading ad details...</p>;
  }

  // Conditional rendering based on the category_id
  const renderCategorySpecificFields = () => {
    switch (adDetails.category_id) {
      case 5: // Jobs category
        return (
          <>
              <div className="form-group">
              <label>Description:</label>
              <input
                type="text"
                name="company"
                className="form-control"
                value={adDetails.description || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Company:</label>
              <input
                type="text"
                name="company"
                className="form-control"
                value={adDetails.company || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Price:</label>
              <input
                type="text"
                name="price"
                className="form-control"
                value={adDetails.salary || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Valid Until:</label>
              <input
                type="text"
                name="valid_until"
                className="form-control"
                value={adDetails.valid_until || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Upload Image:</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <div className="form-group">
              <label>Publish:</label>
              <input
                type="checkbox"
                name="complete"
                className="form-control"
                checked={adDetails.complete}
                onChange={handleInputChange}
              />
            </div>
          </>
        );
      case 7: // Sports category
        return (
          <>
            <div className="form-group">
              <label>Type:</label>
              <input
                type="text"
                name="type"
                className="form-control"
                value={adDetails.type || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Brand:</label>
              <input
                type="text"
                name="brand"
                className="form-control"
                value={adDetails.brand || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Size:</label>
              <input
                type="text"
                name="size"
                className="form-control"
                value={adDetails.size || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Condition:</label>
              <select
                name="condition"
                className="form-control"
                value={adDetails.condition || 'New'} // Default to 'New' if undefined
                onChange={handleInputChange}
              >
                <option value="New">New</option>
                <option value="Used">Used</option>
              </select>
            </div>
            <div className="form-group">
              <label>Upload Image:</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <div className="form-group">
              <label>Publish:</label>
              <input
                type="checkbox"
                name="complete"
                className="form-control"
                checked={adDetails.complete || false}
                onChange={handleInputChange}
              />
            </div>
          </>
        ); 
      case 8: // Furniture category
        return (
          <>
            <div className="form-group">
              <label>Material:</label>
              <input
                type="text"
                name="material"
                className="form-control"
                value={adDetails.material || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Dimensions:</label>
              <input
                type="text"
                name="dimensions"
                className="form-control"
                value={adDetails.dimensions || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Condition:</label>
              <select
                name="condition"
                className="form-control"
                value={adDetails.condition || 'New'}
                onChange={handleInputChange}
              >
                <option value="New">New</option>
                <option value="Used">Used</option>
              </select>
            </div>
            <div className="form-group">
              <label>Upload Image:</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
          </>
        );
      case 9: // Real Estate category
        return (
          <>
            <div className="form-group">
              <label>Property Type:</label>
              <input
                type="text"
                name="property_type"
                className="form-control"
                value={adDetails.property_type || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Location:</label>
              <input
                type="text"
                name="location"
                className="form-control"
                value={adDetails.location || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Price:</label>
              <input
                type="text"
                name="price"
                className="form-control"
                value={adDetails.price || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Upload Image:</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
          </>
        );
      case 10: // Health and Beauty category
        return (
          <>

            <div className="form-group">
              <label>Color:</label>
              <input
                type="text"
                name="color"
                className="form-control"
                value={adDetails.color || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Upload Image:</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="edit-ad-details">
      <h2>Edit Ad Details</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={adDetails.name || ''}
            onChange={handleInputChange}
          />
        </div>
        {renderCategorySpecificFields()}
        <div className="form-group">
          <button type="submit" className='savechanges' disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
      {imagePreviews.length > 0 && (
        <div className="image-previews">
          {imagePreviews.map((preview, index) => (
            <img key={index} src={preview} alt={`Preview ${index + 1}`} className="img-thumbnail" />
          ))}
        </div>
      )}
    </div>
  );
}

export default EditAdDetails;
