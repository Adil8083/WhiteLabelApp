import client from "./client";
export const add = (BioObject, user) => {
  return client.put(`users/update?email=${user.email}`, BioObject);
};
export const get = (user) => {
  return client.get(`users/get?email=${user.email}`);
};
