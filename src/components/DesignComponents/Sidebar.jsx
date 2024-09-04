// import { useState } from "react";
// import "./Sidebar.css";

// const Sidebar = () => {
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const [tables, setTables] = useState([]);

//   const toggleCollapse = () => {
//     setIsCollapsed(!isCollapsed);
//   };

//   const addTable = () => {
//     setTables([
//       ...tables,
//       {
//         id: tables.length + 1,
//         name: `Table ${tables.length + 1}`,
//         columns: [{ id: 1, name: "Example Name" }],
//         isOpen: false,
//       },
//     ]);
//   };

//   const toggleTableDetails = (index) => {
//     setTables(
//       tables.map((table, i) =>
//         i === index ? { ...table, isOpen: !table.isOpen } : table
//       )
//     );
//   };

//   return (
//     <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
//       <div className="buttons">
//         {!isCollapsed && (
//           <>
//             <button className="button" title="Search">
//               🔍
//             </button>
//             <button className="button" onClick={addTable} title="Add Table">
//               ➕
//             </button>
//           </>
//         )}
//         <button
//           className={`button collapse-button`}
//           onClick={toggleCollapse}
//           title={isCollapsed ? "Expand" : "Collapse"}
//         >
//           {isCollapsed ? "▶️" : "◀️"}
//         </button>
//       </div>
//       <div className="content">
//         {tables.map((table, index) => (
//           <div key={table.id} className="table-row">
//             <button
//               onClick={() => toggleTableDetails(index)}
//               className="dropdown-button"
//             >
//               {table.name}
//             </button>
//             {table.isOpen && (
//               <div className="table-details">
//                 <p>Table Name: {table.name}</p>
//                 <button className="action-button">Table Action</button>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
import { useState } from "react";
import "./Sidebar.css";

const Sidebar = ({ onAddTable }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [sidebarTables, setSidebarTables] = useState([]);
  const [openTableId, setOpenTableId] = useState(null); // Track the open table details

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const addTableToSidebar = () => {
    setSidebarTables([
      ...sidebarTables,
      {
        id: sidebarTables.length + 1,
        name: `Sidebar Table ${sidebarTables.length + 1}`,
      },
    ]);
    onAddTable(); // Notify parent to create a new table outside the sidebar
  };

  const toggleTableDetails = (id) => {
    setOpenTableId(openTableId === id ? null : id); // Toggle table details
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
            <button
              onClick={() => toggleTableDetails(table.id)}
              className="dropdown-button"
            >
              {table.name}
            </button>
            {openTableId === table.id && (
              <div className="table-details">
                <p>Table Name: {table.name}</p>
                {/* Add more details or actions here */}
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
