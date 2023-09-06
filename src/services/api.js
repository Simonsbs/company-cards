import axios from "axios";
import { BaseAPI, ProjectID } from "../constants/constants";

const api = axios.create({
  baseURL: BaseAPI,
});

// Login
export const loginUser = async (email, password) => {
  const response = await api.post(`/login/${ProjectID}`, {
    Email: email,
    Password: password,
  });
  return response.data;
};

// Register User
export const registerUser = async (email, password, name) => {
  const response = await api.post("/user/", {
    ProjectID: ProjectID,
    Email: email,
    Password: password,
    Role: "Guest",
    Name: name,
  });
  return response.data;
};

// Register User
export const updateUser = async (token, email, password, name) => {
  const response = await api.put(
    `/user/${ProjectID}`,
    {
      ProjectID: ProjectID,
      Email: email,
      Password: password,
      Role: "Guest",
      Name: name,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// Get single user
export const getUser = async (email) => {
  const response = await api.get(`/user/object/${ProjectID}/${email}`);
  return response.data;
};

// Post Item
export const postItem = async (token, itemCategory, data) => {
  const response = await api.post(`/item/${ProjectID}_${itemCategory}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Get all items for a project
export const getItems = async (token, itemCategory) => {
  const config = token
    ? {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    : {};
  const response = await api.get(`/item/${ProjectID}_${itemCategory}`, config);
  return response.data;
};

// Update item
export const updateItem = async (token, itemCategory, itemId, data) => {
  const response = await api.put(
    `/item/${ProjectID}_${itemCategory}/${itemId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// Delete item
export const deleteItem = async (token, itemCategory, itemId) => {
  const response = await api.delete(
    `/item/${ProjectID}_${itemCategory}/${itemId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
