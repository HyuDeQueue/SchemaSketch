// DesignCard.js
import React from 'react';

const DesignCard = ({ design, onDelete, onView }) => {
  const handleView = () => {
    onView(design.id); // Call the view function with the design's ID
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this design?')) {
      onDelete(design.id); // Call the delete function with the design's ID
    }
  };

  return (
    <div className="design-card">
      <h3>{design.name}</h3>
      <p>Type: {design.type}</p> {/* Displaying the type of design, e.g., SQL Server, MySQL */}
      <div className="design-card-buttons">
        <button onClick={handleView}>View</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default DesignCard;
