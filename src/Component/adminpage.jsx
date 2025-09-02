import React from "react";
import { useNavigate } from "react-router-dom";

function Admin() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "40px", textAlign: "center", color:"black", paddingBottom:"400px"}}>
      <h1> Welcome! Admin Dashboard</h1>
      <div style={{ marginTop: "50px", display: "flex", justifyContent: "center", gap: "30px" }}>
        {/* View Members Button */}
        <button
          onClick={() => navigate("/memapprove")}
          style={{
            backgroundColor: "gold",
            color: "white",
            padding: "20px 40px",
            fontSize: "18px",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          View Members
        </button>

        {/* Add Events Button */}
        <button
          onClick={() => navigate("/events")}
          style={{
            backgroundColor: "gold",
            color: "white",
            padding: "20px 40px",
            fontSize: "18px",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          Add Events
        </button>
      </div>
    </div>
  );
}

export default Admin;
