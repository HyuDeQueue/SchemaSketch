import { useState, useRef } from "react";
import { PlusOutlined } from "@ant-design/icons"; // Import Ant Design icon

const Table = ({
  name,
  borderColor = "pink",
  selectedBorderColor = "blue",
  initialPosition = { top: 10, left: 250 },
}) => {
  const [width, setWidth] = useState(300); // Initial width in pixels
  const [isSelected, setIsSelected] = useState(false); // Track if the table is selected
  const [columns, setColumns] = useState([
    { id: 1, name: "Example Name", type: "String" },
  ]);
  const [position, setPosition] = useState(initialPosition); // Track table position
  const tableRef = useRef(null);
  const startX = useRef(0);
  const startY = useRef(0);
  const startWidth = useRef(0);
  const startTop = useRef(0); // Track starting top position
  const startLeft = useRef(0); // Track starting left position
  const isResizing = useRef(false); // Track if the table is being resized
  const minWidth = 300; // Minimum width before showing ellipsis

  // Dragging logic
  const handleDragStart = (e) => {
    if (isResizing.current) return; // Prevent dragging if resizing

    startX.current = e.clientX;
    startY.current = e.clientY;
    startTop.current = position.top;
    startLeft.current = position.left;

    document.addEventListener("mousemove", handleDrag);
    document.addEventListener("mouseup", handleDragEnd);
  };

  const handleDrag = (e) => {
    const deltaX = e.clientX - startX.current;
    const deltaY = e.clientY - startY.current;
    setPosition({
      top: startTop.current + deltaY,
      left: startLeft.current + deltaX,
    });
  };

  const handleDragEnd = () => {
    document.removeEventListener("mousemove", handleDrag);
    document.removeEventListener("mouseup", handleDragEnd);
  };

  // Resizing logic
  const handleResizeStart = (e) => {
    isResizing.current = true;
    startX.current = e.clientX;
    startWidth.current = tableRef.current.offsetWidth;

    document.addEventListener("mousemove", handleResize);
    document.addEventListener("mouseup", handleResizeEnd);
  };

  const handleResize = (e) => {
    const newWidth = startWidth.current + (e.clientX - startX.current);
    if (newWidth >= minWidth) {
      setWidth(newWidth);
    }
  };

  const handleResizeEnd = () => {
    isResizing.current = false;
    document.removeEventListener("mousemove", handleResize);
    document.removeEventListener("mouseup", handleResizeEnd);
  };

  const handleTableClick = () => {
    setIsSelected(true); // Mark table as selected when clicked
  };

  // Function to add a new column
  const addNewColumn = () => {
    const newColumnId = columns.length + 1;
    setColumns([
      ...columns,
      { id: newColumnId, name: `Column ${newColumnId}`, type: "String" },
    ]);
  };

  const renderRows = () => {
    return columns.map((col, index) => (
      <tr key={index} style={rowStyle}>
        <td style={{ ...cellStyle, textAlign: "left" }}>{col.name}</td>
        <td style={{ ...cellStyle, textAlign: "right" }}>{col.type}</td>
      </tr>
    ));
  };

  const rowStyle = {
    display: "flex", // Use flexbox for row layout
    justifyContent: "space-between",
  };

  const cellStyle = {
    borderRight: "none", // Remove the border between columns
    padding: "8px",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    flex: 1, // Ensure even distribution of space
  };

  return (
    <div
      style={{
        marginBottom: "10px",
        position: "absolute", // Make it movable
        top: `${position.top}px`,
        left: `${position.left}px`,
        width: `${width}px`, // Set width dynamically
      }}
      onMouseDown={handleDragStart} // Add drag start event
    >
      <div
        ref={tableRef}
        style={{
          border: `2px solid ${isSelected ? selectedBorderColor : borderColor}`, // Highlight if selected
          borderRadius: "8px",
          position: "relative",
          overflowX: width < minWidth ? "auto" : "visible", // Scroll if too narrow
          cursor: isSelected ? "default" : "pointer", // Change cursor on click
        }}
        onClick={handleTableClick}
      >
        <div
          style={{
            backgroundColor: "#f0f0f0",
            color: "black",
            padding: "10px",
            borderBottom: "1px solid black",
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
            display: "flex", // Flexbox for aligning the button and name
            justifyContent: "space-between", // Space out the name and button
            alignItems: "center", // Vertically center items
          }}
        >
          <span>{name}</span>
          <PlusOutlined onClick={addNewColumn} style={{ cursor: "pointer" }} />
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={rowStyle}>
              <th style={{ ...cellStyle, textAlign: "left" }}>Name</th>
              <th style={{ ...cellStyle, textAlign: "right" }}>Datatype</th>
            </tr>
          </thead>
          <tbody>{renderRows()}</tbody>
        </table>
        {isSelected && (
          <div
            onMouseDown={handleResizeStart} // Trigger resize logic
            style={{
              width: "5px", // Resize bar on the right
              height: "100%",
              position: "absolute",
              right: 0,
              top: 0,
              cursor: "ew-resize",
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Table;
