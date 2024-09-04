// Dashboard.js
import { useState } from "react";
import DesignCard from "../../components/UserComponents/DesignCard";

const Dashboard = () => {
  const [designs, setDesigns] = useState([
    { id: 1, name: "Design 1", type: "sqlserver" },
    { id: 2, name: "Design 2", type: "mysql" },
  ]);

  const [editDesignId, setEditDesignId] = useState(null);
  const [newDesignName, setNewDesignName] = useState("");

  const handleCreateDesign = (type) => {
    const newDesign = {
      id: designs.length + 1,
      name: `New ${type} Design`,
      type,
    };
    setDesigns([...designs, newDesign]);
  };

  const handleDeleteDesign = (designId) => {
    setDesigns(designs.filter((design) => design.id !== designId));
  };

  const handleRenameDesign = (id) => {
    const updatedDesigns = designs.map((design) =>
      design.id === id ? { ...design, name: newDesignName } : design
    );
    setDesigns(updatedDesigns);
    setEditDesignId(null);
    setNewDesignName("");
  };

  const handleViewDesign = (designId) => {
    console.log(`Viewing design with ID: ${designId}`);
    // Implement view logic here
  };

  return (
    <div className="dashboard-container">
      <h2>Your Designs</h2>
      <button onClick={() => handleCreateDesign("sqlserver")}>
        Create SQL Server Design
      </button>
      <button onClick={() => handleCreateDesign("mysql")}>
        Create MySQL Design
      </button>
      <div className="design-list">
        {designs.map((design) => (
          <div key={design.id} className="design-card-container">
            {editDesignId === design.id ? (
              <div>
                <input
                  type="text"
                  value={newDesignName}
                  onChange={(e) => setNewDesignName(e.target.value)}
                  placeholder="New Design Name"
                />
                <button onClick={() => handleRenameDesign(design.id)}>
                  Save
                </button>
                <button onClick={() => setEditDesignId(null)}>Cancel</button>
              </div>
            ) : (
              <DesignCard
                design={design}
                onDelete={handleDeleteDesign}
                onView={handleViewDesign}
                onRename={() => {
                  setEditDesignId(design.id);
                  setNewDesignName(design.name);
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
