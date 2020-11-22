import client from "./client";

export function del(AchievementId, user) {
  return client.delete(
    `achievements/delete?email=${user.email}&id=${AchievementId}`
  );
}
export function update(AchievementId, AchievementObject, user) {
  return client.put(
    `achievements/update?email=${user.email}&id=${AchievementId}`,
    AchievementObject
  );
}
export function add(AchievementObject, user) {
  return client.post(`achievements?email=${user.email}`, AchievementObject);
}

export function Read(user) {
  return client.get(`achievements/get?email=${user.email}`);
}
