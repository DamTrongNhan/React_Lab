import axios from "./axios";
const fetchAllUser = (page) => {
  return axios.get(`/api/users?page=${page}`);
};

const createUser = (name, job) => {
  return axios.post("/api/users", { name: name, job: job });
};

const editUser = (name, job) => {
  return axios.put("/api/users/2", { name: name, job: job });
};
const deleteUser = (id) => {
  return axios.delete(`api/user/2/${id}`);
};

export { fetchAllUser, createUser, editUser, deleteUser };
