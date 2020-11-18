import client from "./client";

export const add = (Sportinfo, user) => {
  return client.post(`sportInfo?email=${user.email}`, Sportinfo);
};

export const read = (user) => {
  return client.get(`sportInfo/get?email=${user.email}`);
};

export const del = (SportInfoID, user) => {
  return client.delete(
    `sportInfo/delete?email=${user.email}&id=${SportInfoID}`
  );
};

export const update = (SportInfoID, SportInfo, user) => {
  return client.put(
    `sportInfo/update?email=${user.email}&id=${SportInfoID}`,
    SportInfo
  );
};
