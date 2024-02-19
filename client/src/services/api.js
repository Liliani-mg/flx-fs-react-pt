import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4000",
});

export const createUser = async (newUser) => {
  try {
    console.log(newUser);
    const response = await instance.post("/users", newUser);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(`Error al crear usuario: ${error.message}`);
  }
};

export const getUsers = async (limit, offset, searchTerm, filterStatus) => {
  try {
    const params = {
      _limit: limit,
      _start: offset,
      name_like: searchTerm,
    };

    if (filterStatus) {
      params.status = filterStatus;
    }

    const response = await instance.get("/users", { params });

    return {
      data: response.data,
      total: parseInt(response.headers["x-total-count"], 10),
    };
  } catch (error) {
    throw new Error(`Error al obtener usuarios: ${error.message}`);
  }
};

export const updateUser = async (userId, updatedUser) => {
  try {
    const response = await instance.put(`/users/${userId}`, updatedUser);
    return response.data;
  } catch (error) {
    throw new Error(`Error al actualizar usuario: ${error.message}`);
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await instance.delete(`/users/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error al eliminar usuario: ${error.message}`);
  }
};
