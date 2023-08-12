import api from "./api";
import TokenService from "./token.service";

const register = (username, email, password) =>
  api.post("/auth/signup", {
    username,
    email,
    password,
  });

const login = (username, password) =>
  api
    .post("/auth/signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        TokenService.setUser(response.data);
      }

      return response.data;
    });

const logout = () => {
  TokenService.removeUser();
};

const getCurrentUser = () => JSON.parse(localStorage.getItem("user"));

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
