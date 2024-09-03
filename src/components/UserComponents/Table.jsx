// Table.js
import React, { useState } from 'react';
import './Table.css';

const Table = ({ table, onUpdate, onDrag, onRemove }) => {
  const [columns, setColumns] = useState(table.columns || []);
  const [editColumnIndex, setEditColumnIndex] = useState(null);
  const [newColumnName, setNewColumnName] = useState('');

  const handleAddColumn = () => {
    const newColumn = { name: '', datatype: 'VARCHAR', nullable: false, unique: false, primary: false };
    setColumns([...columns, newColumn]);
    onUpdate(table.id, { ...table, columns: [...columns, newColumn] });
  };

  const handleColumnChange = (index, field, value) => {
    const updatedColumns = [...columns];
    updatedColumns[index][field] = value;
    setColumns(updatedColumns);
    onUpdate(table.id, { ...table, columns: updatedColumns });
  };

  const handleRenameColumn = (index) => {
    const updatedColumns = [...columns];
    updatedColumns[index].name = newColumnName;
    setColumns(updatedColumns);
    onUpdate(table.id, { ...table, columns: updatedColumns });
    setEditColumnIndex(null);
    setNewColumnName('');
  };

  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', table.id);
    onDrag(table.id, { x: e.clientX, y: e.clientY });
  };

  return (
    <div className="table" draggable onDragStart={handleDragStart}>
      <div className="table-header">
        <h4>{table.name}</h4>
        <button onClick={() => onRemove(table.id)}>Remove Table</button>
        <button onClick={handleAddColumn}>+ Column</button>
      </div>
      <div className="table-columns">
        {columns.map((col, index) => (
          <div key={index} className="column">
            {editColumnIndex === index ? (
              <div>
                <input
                  type="text"
                  value={newColumnName}
                  onChange={(e) => setNewColumnName(e.target.value)}
                  placeholder="New Column Name"
                />
                <button onClick={() => handleRenameColumn(index)}>Save</button>
                <button onClick={() => setEditColumnIndex(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                <input
                  type="text"
                  value={col.name}
                  readOnly
                />
                <button onClick={() => { setEditColumnIndex(index); setNewColumnName(col.name); }}>Rename</button>
                <button onClick={() => handleColumnChange(index, 'remove')}>Remove Column</button>
              </div>
            )}
            <select
              value={col.datatype}
              onChange={(e) => handleColumnChange(index, 'datatype', e.target.value)}
            >
              <option value="VARCHAR">VARCHAR</option>
              <option value="INT">INT</option>
              <option value="BOOLEAN">BOOLEAN</option>
              <option value="DATE">DATE</option>
              {/* Add more datatypes as needed */}
            </select>
            <label>
              <input
                type="checkbox"
                checked={col.nullable}
                onChange={(e) => handleColumnChange(index, 'nullable', e.target.checked)}
              />
              Nullable
            </label>
            <label>
              <input
                type="checkbox"
                checked={col.unique}
                onChange={(e) => handleColumnChange(index, 'unique', e.target.checked)}
              />
              Unique
            </label>
            <label>
              <input
                type="checkbox"
                checked={col.primary}
                onChange={(e) => handleColumnChange(index, 'primary', e.target.checked)}
              />
              Primary Key
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table;
