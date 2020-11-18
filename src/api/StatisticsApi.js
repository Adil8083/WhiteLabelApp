import client from "./client";

export const add = (Statistic, user) => {
  return client.post(`statistics?email=${user.email}`, Statistic);
};

export const read = (user) => {
  return client.get(`statistics/get?email=${user.email}`);
};

export const del = (StatisticID, user) => {
  return client.delete(
    `statistics/delete?email=${user.email}&id=${StatisticID}`
  );
};

export const update = (StatisticID, Statistic, user) => {
  return client.put(
    `statistics/update?email=${user.email}&id=${StatisticID}`,
    Statistic
  );
};
