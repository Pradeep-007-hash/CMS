// src/Admin.js
import React, { useEffect, useState } from "react";

import axios from "axios";

function Memberapprove() {
  const [users, setUsers] = useState([]);

  // Fetch all users from backend
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/admin/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const approveUser = async (id) => {
    try {
      await axios.put(`http://localhost:5000/admin/approve/${id}`);
      fetchUsers(); // refresh list
    } catch (err) {
      console.error("Error approving user:", err);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/admin/reject/${id}`);
      fetchUsers(); // refresh list
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  return (
    <div style={{ padding: "20px",color: "black"}}>
      <h1>👨‍💼 Admin Dashboard</h1>
      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {users.map((user, index) => (
          <tr key={user.id}>
            <td>{index + 1}</td> {/* <-- sequential index */}
            <td>{user.firstname} {user.lastname}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>{user.status}</td>
            <td>
              {user.status === "PENDING" && (
                <button className="approve-btn" onClick={() => approveUser(user.id)}>Approve</button>
              )}
              <button className="delete-btn" onClick={() => deleteUser(user.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
      </table>
      
    </div>

  );
}

export default Memberapprove;
