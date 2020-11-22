import client from "./client";

export function del(user) {
  return client.delete(`politicianInfo/delete?email=${user.email}`);
}
export function update(InfoObject, user) {
  return client.put(`politicianInfo/update?email=${user.email}`, InfoObject);
}

export function add(InfoObject, user) {
  return client.post(`politicianInfo?email=${user.email}`, InfoObject);
}
export function Read(user) {
  return client.get(`politicianInfo/get?email=${user.email}`);
}
// const response = await add({"country":"Pakistan",
// "district":"Punjab",
// "area":"lahore",
// "party":"PIT",
// "position":"CM"},user)

// const response = await update({"country":"Pakistan",
// "district":"Punjab",
// "area":"lahore",
// "party":"PIT",
// "position":"CM"},user)
