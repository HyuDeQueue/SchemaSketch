import {
  QuestionCircleOutlined,
  KeyOutlined,
  MenuOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import "./Sidebar.css";

const Sidebar = ({
  onAddTable,
  onRenameTable,
  onTableSelect,
  tables,
  onAddColumn,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openTableId, setOpenTableId] = useState(null);
  const [editingTableId, setEditingTableId] = useState(null);
  const [newName, setNewName] = useState(""); // For renaming the table

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const addTableToSidebar = () => {
    const newTableName = `Table ${tables.length + 1}`;
    onAddTable(newTableName);
  };

  const toggleTableDetails = (id) => {
    setOpenTableId(openTableId === id ? null : id);
    onTableSelect(id);
  };

  const handleRenameSave = (id) => {
    onRenameTable(id, newName);
    setEditingTableId(null);
  };

  const handleInputKeyDown = (e, id) => {
    if (e.key === "Enter") {
      handleRenameSave(id);
    }
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
        {tables.map((table) => (
          <div key={table.id} className="table-row">
            {editingTableId === table.id ? (
              <div className="edit-row">
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  onKeyDown={(e) => handleInputKeyDown(e, table.id)}
                  className="detail-input"
                  placeholder="Name: "
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
              </div>
            )}
            {openTableId === table.id && (
              <div className="table-details">
                <div className="table-details-row">
                  <input
                    type="text"
                    style={{ width: "100%" }}
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    onKeyDown={(e) => handleInputKeyDown(e, table.id)}
                    className="detail-input"
                    placeholder="Name: "
                  />
                </div>

                {table.columns.map((col, index) => (
                  <div key={index} className="table-details-row">
                    <input
                      type="text"
                      style={{ width: "30%" }}
                      value={col.name}
                      className="detail-input"
                      readOnly
                    />
                    <select value={col.type} className="detail-select" readOnly>
                      <option value="String">String</option>
                    </select>
                    <QuestionCircleOutlined className="icon-button" />
                    <KeyOutlined className="icon-button" />
                    <MenuOutlined className="icon-button" />
                  </div>
                ))}

                <div className="table-details-row">
                  <button
                    className="action-button"
                    onClick={() => onAddColumn(table.id)}
                  >
                    <PlusOutlined /> Add Index
                  </button>
                  <button className="action-button">
                    <DeleteOutlined /> Trash
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
