import client from "./client";

export const del = (AchievementId, user) => {
  return client.delete(
    `achievements/delete?email=${user.email}&id=${AchievementId}`
  );
};
export const update = (AchievementId, AchievementObject, user) => {
  return client.put(
    `achievements/update?email=${user.email}&id=${AchievementId}`,
    AchievementObject
  );
};
export const add = (AchievementObject, user) => {
  return client.post(`achievements?email=${user.email}`, AchievementObject);
};
export const Read = (user) => {
  return client.get(`achievements/get?email=${user.email}`);
};
