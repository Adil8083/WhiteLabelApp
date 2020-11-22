import client from "./client";

const register = (userInfo) => {
  return client.post("/users/signup", userInfo);
};
export default { register };
