// DesignView.js
import React, { useState } from 'react';
import Sidebar from '../../components/UserComponents/Sidebar';
import Canvas from '../../components/UserComponents/Canvas'; 

const DesignView = () => {
  const [tables, setTables] = useState([]);

  const handleAddTable = (table) => {
    setTables([...tables, table]);
  };

  const handleImportSQL = (file) => {
    // Logic to import SQL and parse it into tables and constraints
  };

  const handleExportSQL = () => {
    // Logic to generate SQL file from the current schema
  };

  return (
    <div className="design-view-container">
      <header className="design-header">
        <button onClick={handleImportSQL}>Import SQL</button>
        <button onClick={handleExportSQL}>Export SQL</button>
      </header>
      <div className="design-body">
        <Canvas tables={tables} onUpdateTables={setTables} />
      </div>
    </div>
  );
};

export default DesignView;
