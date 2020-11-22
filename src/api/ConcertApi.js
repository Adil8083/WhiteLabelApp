import client from "./client";

export function del(ConcertId, user) {
  return client.delete(`concert/delete?email=${user.email}&id=${ConcertId}`);
}
export function update(ConcertId, ConcertObject, user) {
  return client.put(
    `concert/update?email=${user.email}&id=${ConcertId}`,
    ConcertObject
  );
}
export function add(ConcertObject, user) {
  return client.post(`concert?email=${user.email}`, ConcertObject);
}
export function Read(user) {
  return client.get(`concert/get?email=${user.email}`);
}
