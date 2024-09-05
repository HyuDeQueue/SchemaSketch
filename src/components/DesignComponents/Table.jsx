import { useState, useRef } from "react";

const Table = ({ borderColor = "pink", selectedBorderColor = "blue" }) => {
  const [width, setWidth] = useState(400); // Initial width in pixels
  const [isSelected, setIsSelected] = useState(false); // Track if the table is selected
  const [columns] = useState([{ id: 1, name: "Example Name", type: "String" }]);
  const tableRef = useRef(null);
  const startX = useRef(0);
  const startWidth = useRef(0);
  const minWidth = 300; // Minimum width before showing ellipsis

  const handleMouseDown = (e) => {
    if (!isSelected) return; // Only allow resizing if the table is selected
    startX.current = e.clientX;
    startWidth.current = tableRef.current.offsetWidth;

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    const newWidth = startWidth.current + (e.clientX - startX.current);
    if (newWidth >= minWidth) {
      setWidth(newWidth);
    }
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const handleTableClick = () => {
    setIsSelected(true); // Mark table as selected when clicked
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
    <div style={{ marginBottom: "10px" }} onClick={handleTableClick}>
      <div
        ref={tableRef}
        style={{
          width: `${width}px`,
          border: `2px solid ${isSelected ? selectedBorderColor : borderColor}`, // Highlight if selected
          borderRadius: "8px",
          position: "relative",
          overflowX: width < minWidth ? "auto" : "visible", // Scroll if too narrow
          cursor: isSelected ? "default" : "pointer", // Change cursor on click
        }}
      >
        <div
          style={{
            backgroundColor: "#f0f0f0",
            padding: "10px",
            borderBottom: "1px solid black",
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
            textAlign: "center", // Center the header
          }}
        >
          Table Header
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
            onMouseDown={handleMouseDown}
            style={{
              width: "5px", // Invisible resize bar
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
