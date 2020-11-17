import client from "./client";
import useAuth from "../auth/useAuth";

const getUser = () => {
  return ({ user } = useAuth());
};

export function del(ConcertId) {
  const user = getUser();
  client
    .delete(`concert/delete?email=${user.email}&id=${ConcertId}`)
    .then((Response) => console.log(Response.data))
    .catch((error) => console.log(error));
}
export function update(ConcertId, ConcertObject) {
  const user = getUser();
  client
    .put(`concert/update?email=${user.email}&id=${ConcertId}`, ConcertObject)
    .then((Response) => console.log(Response.data))
    .catch((error) => console.log(error));
}
export function add(ConcertObject) {
  const user = getUser();
  client
    .post(`concert?email=${user.email}`, ConcertObject)
    .then((Response) => console.log(Response.data))
    .catch((error) => console.log(error));
}
export function Read() {
  const user = getUser();
  return client
    .get(`concert/get?email=${user.email}`)
    .then((Response) => {
      return Response.data;
    })
    .catch((error) => console.log(error));
}
