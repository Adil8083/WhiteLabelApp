import client from "./client";

const register = (userInfo) => {
  return client.post("/users/signup", userInfo);
};

const updatePassword = (email, password) => {
  return client.put("/users/update-password", { email, password });
};

export default { register, updatePassword };
