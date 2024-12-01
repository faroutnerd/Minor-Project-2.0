import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export const getTasks = async (token) => {
  return axios.get(`${API_URL}/api/tasks`, {
    headers: { Authorization: token },
  });
};

export const createTask = async (token, task) => {
  return axios.post(`${API_URL}/api/tasks`, task, {
    headers: { Authorization: token },
  });
};

export const updateTask = async (token, id, updatedTask) => {
  return axios.put(`${API_URL}/api/tasks/${id}`, updatedTask, {
    headers: { Authorization: token },
  });
};

export const deleteTask = async (token, id) => {
  return axios.delete(`${API_URL}/api/tasks/${id}`, {
    headers: { Authorization: token },
  });
};
