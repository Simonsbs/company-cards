import axios from "axios";
import { BaseAPI, ProjectID } from "../constants/constants";

const api = axios.create({
  baseURL: BaseAPI,
});

export const loginUser = (email, password) => {
  return api
    .post(`/login/${ProjectID}`, {
      Email: email,
      Password: password,
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error logging in:", error);
      throw error;
    });
};

export const registerUser = (email, password, name, role = "Guest") => {
  return api
    .post("/user/", {
      ProjectID: ProjectID,
      Email: email,
      Password: password,
      Role: role,
      Name: name,
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error registering user:", error);
      throw error;
    });
};

export const updateUser = (token, email, password, name, role, favorites) => {
  return api
    .put(
      `/user/${ProjectID}/${email}`,
      {
        ProjectID: ProjectID,
        Email: email,
        Password: password,
        Role: role,
        Name: name,
        Favorites: favorites,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error updating user:", error);
      throw error;
    });
};

export const getUser = (token, email) => {
  return api
    .get(`/user/object/${ProjectID}/${email}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error getting user:", error);
      throw error;
    });
};

export const getUsers = (token) => {
  return api
    .get(`/user/${ProjectID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error getting user:", error);
      throw error;
    });
};

export const deleteUser = (token, email) => {
  return api
    .delete(`/user/${ProjectID}/${email}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error getting user:", error);
      throw error;
    });
};

export const postItem = (token, itemCategory, data) => {
  return api
    .post(`/item/${ProjectID}_${itemCategory}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error posting item:", error);
      throw error;
    });
};

export const getItems = (token, itemCategory) => {
  const config = token
    ? {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    : {};

  return api
    .get(`/item/${ProjectID}_${itemCategory}`, config)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error getting items:", error);
      throw error;
    });
};

export const updateItem = (token, itemCategory, itemId, data) => {
  return api
    .put(`/item/${ProjectID}_${itemCategory}/${itemId}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error updating item:", error);
      throw error;
    });
};

export const deleteItem = (token, itemCategory, itemId) => {
  return api
    .delete(`/item/${ProjectID}_${itemCategory}/${itemId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error deleting item:", error);
      throw error;
    });
};
