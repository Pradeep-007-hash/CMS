import axios from "axios";

const API_URL = "http://localhost:5000"; // backend server

// Signup
export const signupUser = async (userData) => {
  return await axios.post(`${API_URL}/signup`, userData);
};

// Login
export const loginUser = async (credentials) => {
  return await axios.post(`${API_URL}/login`, credentials);
};

// Admin: Get all pending users
export const getUsers = async () => {
  return await axios.get(`${API_URL}/pending-users`);
};

// Admin: Approve
export const approveUser = async (id) => {
  return await axios.post(`${API_URL}/approve-user`, { id });
};

// Admin: Reject
export const rejectUser = async (id) => {
  return await axios.post(`${API_URL}/reject-user`, { id });
};
