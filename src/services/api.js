import axios from "axios";

const BASE_URL =
  "https://gnte7mjwg9.execute-api.us-east-1.amazonaws.com/newdev";
const PROJECT_ID = "641d4882-e6ef-4735-9f5e-05d2319aa09e";

const api = axios.create({
  baseURL: BASE_URL,
});

// Login
export const loginUser = async (email, password) => {
  const response = await api.post(`/login/${PROJECT_ID}`, {
    Email: email,
    Password: password,
  });
  return response.data;
};

// Register User
export const registerUser = async (email, password, name) => {
  const response = await api.post("/user/", {
    ProjectID: PROJECT_ID,
    Email: email,
    Password: password,
    Role: "Guest",
    Name: name,
  });
  return response.data;
};

// Get single user
export const getUser = async (email) => {
  const response = await api.get(`/user/object/${PROJECT_ID}/${email}`);
  return response.data;
};

// Post Item
export const postItem = async (token, itemCategory, data) => {
  const response = await api.post(`/item/${PROJECT_ID}_${itemCategory}`, data, {
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
  const response = await api.get(`/item/${PROJECT_ID}_${itemCategory}`, config);
  return response.data;
};

// Update item
export const updateItem = async (token, itemCategory, itemId, data) => {
  const response = await api.put(
    `/item/${PROJECT_ID}_${itemCategory}/${itemId}`,
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
    `/item/${PROJECT_ID}_${itemCategory}/${itemId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
