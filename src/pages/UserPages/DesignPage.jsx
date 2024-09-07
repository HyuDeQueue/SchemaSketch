import { useState, useRef } from "react";
import Sidebar from "../../components/DesignComponents/Sidebar";

const DesignPage = () => {
  const [tables, setTables] = useState([]);
  const [selectedTableId, setSelectedTableId] = useState(null);
  const [tablePositions, setTablePositions] = useState({}); // Track table positions
  const isResizing = useRef(false); // Flag to track if resizing

  const minWidth = 230;

  const addTable = (name) => {
    const newTableId = tables.length + 1;
    setTables([...tables, { id: newTableId, name, columns: [] }]);
    setTablePositions({
      ...tablePositions,
      [newTableId]: { top: 10, left: 250, width: 230 },
    });
  };

  const renameTable = (id, newName) => {
    setTables(
      tables.map((table) =>
        table.id === id ? { ...table, name: newName } : table
      )
    );
  };

  const handleTableSelection = (id) => {
    setSelectedTableId(id);
  };

  const addColumn = (tableId) => {
    setTables(
      tables.map((table) =>
        table.id === tableId
          ? {
              ...table,
              columns: [
                ...table.columns,
                {
                  id: table.columns.length + 1,
                  name: `Column ${table.columns.length + 1}`,
                  type: "String",
                },
              ],
            }
          : table
      )
    );
  };

  const handleDragStart = (e, tableId) => {
    if (isResizing.current) return;

    const startX = e.clientX;
    const startY = e.clientY;
    const initialTop = tablePositions[tableId].top;
    const initialLeft = tablePositions[tableId].left;

    const handleDrag = (e) => {
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      setTablePositions((prevPositions) => ({
        ...prevPositions,
        [tableId]: {
          ...prevPositions[tableId],
          top: initialTop + deltaY,
          left: initialLeft + deltaX,
        },
      }));
    };

    const handleDragEnd = () => {
      document.removeEventListener("mousemove", handleDrag);
      document.removeEventListener("mouseup", handleDragEnd);
    };

    document.addEventListener("mousemove", handleDrag);
    document.addEventListener("mouseup", handleDragEnd);
  };

  const handleResizeStart = (e, tableId) => {
    e.preventDefault();
    isResizing.current = true;
    const startX = e.clientX;
    const startWidth = tablePositions[tableId].width;

    const handleResize = (e) => {
      const newWidth = startWidth + (e.clientX - startX);
      if (newWidth >= minWidth) {
        setTablePositions((prevPositions) => ({
          ...prevPositions,
          [tableId]: {
            ...prevPositions[tableId],
            width: newWidth,
          },
        }));
      }
    };

    const handleResizeEnd = () => {
      isResizing.current = false;
      document.removeEventListener("mousemove", handleResize);
      document.removeEventListener("mouseup", handleResizeEnd);
    };

    document.addEventListener("mousemove", handleResize);
    document.addEventListener("mouseup", handleResizeEnd);
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar
        onAddTable={addTable}
        onRenameTable={renameTable}
        onTableSelect={handleTableSelection}
        tables={tables} // Pass tables to Sidebar
        onAddColumn={addColumn}
      />
      <div style={{ flex: 1, padding: "10px", position: "relative" }}>
        {tables.map((table) => (
          <div
            key={table.id}
            style={{
              position: "absolute",
              top: `${tablePositions[table.id]?.top || 10}px`,
              left: `${tablePositions[table.id]?.left || 250}px`,
              width: `${tablePositions[table.id]?.width || 300}px`,
              border: `2px solid ${
                selectedTableId === table.id ? "blue" : "pink"
              }`,
              borderRadius: "10px",
              cursor: "move",
            }}
            onMouseDown={(e) => handleDragStart(e, table.id)}
          >
            <div
              style={{
                backgroundColor: "#f0f0f0",
                borderRadius: "10px 10px 0 0",
                color: "black",
                padding: "10px",
                borderBottom: "1px solid black",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>{table.name}</span>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ padding: "8px", textAlign: "left" }}>Name</th>
                  <th style={{ padding: "8px", textAlign: "right" }}>
                    Datatype
                  </th>
                </tr>
              </thead>
              <tbody>
                {table.columns.map((col) => (
                  <tr key={col.id}>
                    <td style={{ padding: "8px", textAlign: "left" }}>
                      {col.name}
                    </td>
                    <td style={{ padding: "8px", textAlign: "right" }}>
                      {col.type}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Resize handle */}
            <div
              style={{
                width: "5px",
                height: "100%",
                position: "absolute",
                right: 0,
                top: 0,
                cursor: "ew-resize",
              }}
              onMouseDown={(e) => handleResizeStart(e, table.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesignPage;
