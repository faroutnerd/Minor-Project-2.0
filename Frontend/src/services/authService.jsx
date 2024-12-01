import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export const signup = async (userData) => {
  return axios.post(`${API_URL}/api/auth/signup`, userData);
};

export const login = async (credentials) => {
  return axios.post(`${API_URL}/api/auth/login`, credentials);
};

export const changePassword = async (token, newPassword) => {
  return axios.put(`${API_URL}/api/auth/change-password`, { newPassword }, {
    headers: { Authorization: token },
  });
};
