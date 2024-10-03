import React from 'react';

interface DeleteAdProps {
  postId: number;
  categoryId: number; // Include categoryId instead of the full Post object
  onDeleteSuccess: () => void;
  onCancel: () => void;
}

const categoryMap: { [key: number]: string } = {
  5: 'jobs',
  7: 'sports',
  8: 'furniture',
  9: 'realestate',
  10: 'healthbeauty',
};

const DeleteAd: React.FC<DeleteAdProps> = ({ postId, categoryId, onDeleteSuccess, onCancel }) => {
  const handleDelete = async () => {
    const category = categoryMap[categoryId]?.toLowerCase(); // Get the category based on the categoryId
    if (!category) {
      console.error('Invalid category');
      return;
    }

    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`http://127.0.0.1:8000/api/${category}/ads/${postId}/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        onDeleteSuccess(); // Call this function to refresh the list after deletion
      } else {
        console.error('Failed to delete the ad');
      }
    } catch (error) {
      console.error('Error deleting the ad:', error);
    }
  };

  return (
    <div className="custom-modal">
      <div className="custom-modal-content">
        <h3>Are you sure you want to delete this ad?</h3>
        <div className="form-actions">
          <button onClick={handleDelete} className="btn btn-delete">Delete</button>
          <button onClick={onCancel} className="btn btn-cancel">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAd;
