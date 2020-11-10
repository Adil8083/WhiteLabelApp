import API from "apisauce";
const baseURL = "http://192.168.10.9:3000/api";
const api = API.create({ baseURL: baseURL });

export function del(ConcertId) {
  api
    .delete(`concert/delete?email=uzair12naseem@gmail.com&id=${ConcertId}`)
    .then((Response) => console.log(Response.data))
    .catch((error) => console.log(error));
}
export function update(ConcertId, ConcertObject) {
  api
    .put(
      `concert/update?email=uzair12naseem@gmail.com&id=${ConcertId}`,
      ConcertObject
    )
    .then((Response) => console.log(Response.data))
    .catch((error) => console.log(error));
}
export function add(ConcertObject) {
  api
    .post("concert?email=uzair12naseem@gmail.com", ConcertObject)
    .then((Response) => console.log(Response.data))
    .catch((error) => console.log(error));
}
export function Read() {
  return api
    .get("concert/get?email=uzair12naseem@gmail.com")
    .then((Response) => {
      return Response.data;
    })
    .catch((error) => console.log(error));
}
