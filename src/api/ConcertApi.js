import client from "./client";

export const del = (ConcertId, user) => {
  client
    .delete(`concert/delete?email=${user.email}&id=${ConcertId}`)
    .then((Response) => console.log(Response.data))
    .catch((error) => console.log(error));
};
export const update = (ConcertId, ConcertObject, user) => {
  client
    .put(`concert/update?email=${user.email}&id=${ConcertId}`, ConcertObject)
    .then((Response) => console.log(Response.data))
    .catch((error) => console.log(error));
};
export const add = (ConcertObject, user) => {
  client
    .post(`concert?email=${user.email}`, ConcertObject)
    .then((Response) => console.log(Response.data))
    .catch((error) => console.log(error));
};
export const Read = (user) => {
  return client
    .get(`concert/get?email=${user.email}`)
    .then((Response) => {
      return Response.data;
    })
    .catch((error) => console.log(error));
};
