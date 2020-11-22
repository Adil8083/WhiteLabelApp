import client from "./client";
export const add = (Object, user) => {
  return client.put(`users/update?email=${user.email}`, Object);
};
export const get = (user) => {
  return client.get(`users/get?email=${user.email}`);
};
