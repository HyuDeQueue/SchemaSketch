// Canvas.js
import React, { useState } from 'react';
import Table from './Table';
import Sidebar from './Sidebar';

const Canvas = () => {
  const [tables, setTables] = useState([
    { id: 1, name: 'Users', columns: [] },
    { id: 2, name: 'Orders', columns: [] }
  ]);

  const [nextId, setNextId] = useState(3);
  const [editTableId, setEditTableId] = useState(null);
  const [newTableName, setNewTableName] = useState('');

  const handleUpdateTable = (id, updatedTable) => {
    setTables(tables.map((table) => (table.id === id ? updatedTable : table)));
  };

  const handleRemoveTable = (id) => {
    setTables(tables.filter((table) => table.id !== id));
  };

  const handleDrag = (id, position) => {
    console.log(`Table ${id} dragged to position:`, position);
  };

  const handleAddTable = (newTable) => {
    const tableWithId = { ...newTable, id: nextId };
    setTables([...tables, tableWithId]);
    setNextId(nextId + 1);
  };

  const handleRenameTable = (id) => {
    const updatedTables = tables.map((table) =>
      table.id === id ? { ...table, name: newTableName } : table
    );
    setTables(updatedTables);
    setEditTableId(null);
    setNewTableName('');
  };

  return (
    <div className="canvas">
      <Sidebar onAddTable={handleAddTable} />
      <div className="tables-container">
        {tables.map((table) => (
          <div key={table.id} className="table-container">
            {editTableId === table.id ? (
              <div>
                <input
                  type="text"
                  value={newTableName}
                  onChange={(e) => setNewTableName(e.target.value)}
                  placeholder="New Table Name"
                />
                <button onClick={() => handleRenameTable(table.id)}>Save</button>
                <button onClick={() => setEditTableId(null)}>Cancel</button>
              </div>
            ) : (
              <div className="table">
                <Table
                  table={table}
                  onUpdate={handleUpdateTable}
                  onDrag={handleDrag}
                  onRemove={handleRemoveTable}
                />
                <button onClick={() => { setEditTableId(table.id); setNewTableName(table.name); }}>Rename Table</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Canvas;
