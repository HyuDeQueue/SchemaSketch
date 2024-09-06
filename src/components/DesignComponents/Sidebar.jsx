import { useState } from "react";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import "./Sidebar.css";

const Sidebar = ({ onAddTable, onRenameTable }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [sidebarTables, setSidebarTables] = useState([]);
  const [openTableId, setOpenTableId] = useState(null); // Track the open table details
  const [editingTableId, setEditingTableId] = useState(null); // Track the table being renamed
  const [newName, setNewName] = useState(""); // Store the new name for the table being edited

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const addTableToSidebar = () => {
    const newTableName = `Table ${sidebarTables.length + 1}`;
    setSidebarTables([
      ...sidebarTables,
      {
        id: sidebarTables.length + 1,
        name: newTableName,
      },
    ]);
    onAddTable(newTableName); // Pass the new table's name to the parent component
  };

  const toggleTableDetails = (id) => {
    setOpenTableId(openTableId === id ? null : id); // Toggle table details
  };

  // Start renaming a table
  const handleRenameStart = (id, currentName) => {
    setEditingTableId(id);
    setNewName(currentName); // Set the current name in the input field
  };

  // Save the new name and update it in both Sidebar and DesignPage
  const handleRenameSave = (id) => {
    setSidebarTables(
      sidebarTables.map((table) =>
        table.id === id ? { ...table, name: newName } : table
      )
    );
    onRenameTable(id, newName); // Pass the new name to the parent component
    setEditingTableId(null); // Exit the rename mode
  };

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="buttons">
        {!isCollapsed && (
          <>
            <button className="button" title="Search">
              🔍
            </button>
            <button
              className="button"
              onClick={addTableToSidebar}
              title="Add Table"
            >
              ➕
            </button>
          </>
        )}
        <button
          className={`button collapse-button`}
          onClick={toggleCollapse}
          title={isCollapsed ? "Expand" : "Collapse"}
        >
          {isCollapsed ? "▶️" : "◀️"}
        </button>
      </div>
      <div className="content">
        {sidebarTables.map((table) => (
          <div key={table.id} className="table-row">
            {/* Toggle between editing input and table name */}
            {editingTableId === table.id ? (
              <div className="edit-row">
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="rename-input"
                />
                <SaveOutlined
                  className="icon-button"
                  onClick={() => handleRenameSave(table.id)}
                />
              </div>
            ) : (
              <div className="edit-row">
                <button
                  onClick={() => toggleTableDetails(table.id)}
                  className="dropdown-button"
                >
                  {table.name}
                </button>
                <EditOutlined
                  className="icon-button"
                  onClick={() => handleRenameStart(table.id, table.name)}
                />
              </div>
            )}
            {openTableId === table.id && (
              <div className="table-details">
                <p>Table Name: {table.name}</p>
                <button className="action-button">Table Action</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
