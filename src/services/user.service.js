import api from "./api";

const getPublicContent = () => api.get("/test/all");

const getUserBoard = () => api.get("/test/user");

const getModeratorBoard = () => api.get("/test/mod");

const getAdminBoard = () => api.get("/test/admin");

const UserService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
};

export default UserService;
