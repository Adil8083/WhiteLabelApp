import client from "./client";

export function del(ProjId, user) {
  return client.delete(
    `politicianProj/delete?email=${user.email}&id=${ProjId}`
  );
}
export function update(ProjId, ProjObject, user) {
  return client.put(
    `politicianProj/update?email=${user.email}&id=${ProjId}`,
    ProjObject
  );
}
export function add(ProjObject, user) {
  return client.post(`politicianProj?email=${user.email}`, ProjObject);
}

export function Read(user) {
  return client.get(`politicianProj/get?email=${user.email}`);
}

// add
// const response=await add({"identifier":"1",
// "name":"abc",
// "year":"2020",
// "detail":"detail"},user)

// update
// const response=await update("1",{"identifier":"1",
// "name":"abc",
// "year":"2020",
// "detail":"detail"},user)
