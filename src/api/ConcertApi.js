import client from "./client";
import useAuth from "../auth/useAuth";

const { user } = useAuth();

const del = (ConcertId) => {
  client
    .delete(`concert/delete?email=${user.email}&id=${ConcertId}`)
    .then((Response) => console.log(Response.data))
    .catch((error) => console.log(error));
};
const update = (ConcertId, ConcertObject) => {
  client
    .put(`concert/update?email=${user.email}&id=${ConcertId}`, ConcertObject)
    .then((Response) => console.log(Response.data))
    .catch((error) => console.log(error));
};
const add = (ConcertObject) => {
  client
    .post(`concert?email=${user.email}`, ConcertObject)
    .then((Response) => console.log(Response.data))
    .catch((error) => console.log(error));
};
const Read = () => {
  return client
    .get(`concert/get?email=${user.email}`)
    .then((Response) => {
      return Response.data;
    })
    .catch((error) => console.log(error));
};

export default { del, update, add, Read };
