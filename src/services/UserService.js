import axios from "./axios";
const fetchAllUser = (page) => {
  return axios.get(`/api/users?page=${page}`);
};

const createUser = (name, job) => {
  return axios.post("/api/users", { name: name, job: job });
};

export { fetchAllUser, createUser };
