import { useState } from "react";
import Sidebar from "../../components/DesignComponents/Sidebar";
import Table from "../../components/DesignComponents/Table";

const DesignPage = () => {
  const [tables, setTables] = useState([]);

  // Add a new table
  const addTable = (name) => {
    setTables([
      ...tables,
      { id: tables.length + 1, name }, // Use the provided name
    ]);
  };

  // Rename an existing table
  const renameTable = (id, newName) => {
    setTables(
      tables.map((table) =>
        table.id === id ? { ...table, name: newName } : table
      )
    );
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar onAddTable={addTable} onRenameTable={renameTable} />
      <div style={{ flex: 1, padding: "10px" }}>
        {tables.map((table) => (
          <Table key={table.id} name={table.name} />
        ))}
      </div>
    </div>
  );
};

export default DesignPage;
