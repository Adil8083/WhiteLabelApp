import client from "./client";
export const add = (NamingObject, user) => {
  return client.put(`users/update?email=${user.email}`, NamingObject);
};
