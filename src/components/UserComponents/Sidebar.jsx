// Sidebar.js
import React from 'react';

const Sidebar = ({ onAddTable }) => {
  const handleAddTable = () => {
    const newTable = { name: 'NewTable', columns: [] };
    onAddTable(newTable);
  };

  return (
    <div className="sidebar">
      <h3>Tables</h3>
      <button onClick={handleAddTable}>Add Table</button>
    </div>
  );
};

export default Sidebar;
