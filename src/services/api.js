import axios from "axios";
import TokenService from "./token.service";

const instance = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = TokenService.getLocalAccessToken();
    const newConfig = { ...config };
    if (token) {
      newConfig.headers.Authorization = `Bearer ${token}`; // for Spring Boot back-end
    }
    return newConfig;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err && err.config) {
      const originalConfig = err.config;

      if (originalConfig.url !== "/auth/signin" && err.response) {
        // Access Token was expired
        // eslint-disable-next-line no-underscore-dangle
        if (err.response.status === 401 && !originalConfig._retry) {
          // eslint-disable-next-line no-underscore-dangle
          originalConfig._retry = true;

          try {
            const rs = await instance.post("/auth/refreshtoken", {
              refreshToken: TokenService.getLocalRefreshToken(),
            });

            const { accessToken } = rs.data;
            TokenService.updateLocalAccessToken(accessToken);

            return instance(originalConfig);
          } catch (_error) {
            return Promise.reject(_error);
          }
        }
      }
    }
    return Promise.reject(err);
  }
);

export default instance;
