import { useState, useRef } from "react";

const Table = () => {
  const [width, setWidth] = useState(400); // Initial width in pixels
  const [columns, setColumns] = useState([{ id: 1, name: "Example Name" }]);
  const tableRef = useRef(null);
  const startX = useRef(0);
  const startWidth = useRef(0);
  const minWidth = 300; // Minimum width before showing ellipsis

  const handleMouseDown = (e) => {
    startX.current = e.clientX;
    startWidth.current = tableRef.current.offsetWidth;

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    const newWidth = startWidth.current + (e.clientX - startX.current);
    setWidth(newWidth);
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const addColumn = () => {
    setColumns((prevColumns) => [
      ...prevColumns,
      {
        id: prevColumns.length + 1,
        name: `New Column ${prevColumns.length + 1}`,
      },
    ]);
  };

  const renderRows = () => {
    return columns.map((col, index) => (
      <tr key={index}>
        <td style={{ border: "1px solid black", padding: "8px" }}>{col.id}</td>
        <td style={{ border: "1px solid black", padding: "8px" }}>
          {col.name}
        </td>
      </tr>
    ));
  };

  return (
    <div style={{ marginBottom: "10px" }}>
      <button onClick={addColumn} style={{ marginBottom: "10px" }}>
        +
      </button>
      <div
        ref={tableRef}
        style={{
          width: `${width}px`,
          border: "1px solid black",
          borderCollapse: "collapse",
          position: "relative",
          overflowX: width < minWidth ? "auto" : "visible", // Show scrollbar if width is less than minWidth
        }}
      >
        <div
          style={{
            backgroundColor: "#f0f0f0",
            padding: "10px",
            borderBottom: "1px solid black",
          }}
        >
          Table Header
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid black", padding: "8px" }}>ID</th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Name
              </th>
            </tr>
          </thead>
          <tbody>{renderRows()}</tbody>
        </table>
        <div
          onMouseDown={handleMouseDown}
          style={{
            width: "10px",
            height: "100%",
            backgroundColor: "#ccc",
            position: "absolute",
            right: 0,
            top: 0,
            cursor: "ew-resize",
          }}
        />
      </div>
    </div>
  );
};

export default Table;
