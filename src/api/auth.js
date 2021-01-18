import client from "./client";

const login = (email, password) => {
  return client.post("/auth", { email, password });
};

const forgotPassword = (email) => {
  return client.post("/auth/forget-password", { email });
};

export default {
  login,
  forgotPassword,
};
