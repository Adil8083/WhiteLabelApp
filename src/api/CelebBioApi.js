import client from "./client";
export const add = (BioObject, user) => {
  return client.put(`users/update?email=${user.email}`, BioObject);
};
export const profile = (BioObject, user) => {
  return client.post(`users/profile?email=${user.email}`, BioObject);
};

export const get = (user) => {
  return client.get(`users/get?email=${user.email}`);
};
export const getCountries = () => {
  return client.get(`country/get`);
};
export const getCities = () => {
  return client.get(`city/get`);
};
