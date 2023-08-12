const getLocalRefreshToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user !== null) {
    return user.refreshToken;
  }

  return null;
};

const getLocalAccessToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user !== null) {
    return user.accessToken;
  }

  return null;
};

const updateLocalAccessToken = (token) => {
  const user = JSON.parse(localStorage.getItem("user"));
  user.accessToken = token;
  localStorage.setItem("user", JSON.stringify(user));
};

const getUser = () => JSON.parse(localStorage.getItem("user"));

const setUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

const removeUser = () => {
  localStorage.removeItem("user");
};

const TokenService = {
  getLocalRefreshToken,
  getLocalAccessToken,
  updateLocalAccessToken,
  getUser,
  setUser,
  removeUser,
};

export default TokenService;
