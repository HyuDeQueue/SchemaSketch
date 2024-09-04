import { useState } from "react";
import Sidebar from "../../components/DesignComponents/Sidebar";
import Table from "../../components/DesignComponents/Table";

const DesignPage = () => {
  const [tables, setTables] = useState([]);

  const addTable = () => {
    setTables([
      ...tables,
      { id: tables.length + 1, name: `Table ${tables.length + 1}` },
    ]);
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar onAddTable={addTable} />
      <div style={{ flex: 1, padding: "10px" }}>
        {tables.map((table) => (
          <Table key={table.id} />
        ))}
      </div>
    </div>
  );
};

export default DesignPage;
