import axios from "axios";

const API_URL = "/api/auth";

export const signup = (userData) => axios.post(`${API_URL}/signup`, userData);

// GET /api/users/:id
export const getUserById = (id) => axios.get(`${API_URL}/users/${id}`);
