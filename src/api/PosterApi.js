import API from "apisauce";
const baseURL = "http://192.168.10.9:3000/api";
const api = API.create({ baseURL: baseURL });

export function del(PosterName) {
  api
    .delete(`poster/delete?email=uzair12naseem@gmail.com&name=${PosterName}`)
    .then((Response) => console.log(Response.data))
    .catch((error) => console.log(error));
}
export function updateAlbum(PosterName, SongAlbum) {
  let data = {
    name: PosterName,
    album: SongAlbum,
  };
  api
    .put(`poster/update?email=uzair12naseem@gmail.com&name=${PosterName}`, data)
    .then((Response) => console.log(Response.data))
    .catch((error) => console.log(error));
}
export function updatePoster(PosterName, SongPoster) {
  let data = {
    name: PosterName,
    poster: SongPoster,
  };
  api
    .put(`poster/update?email=uzair12naseem@gmail.com&name=${PosterName}`, data)
    .then((Response) => console.log(Response.data))
    .catch((error) => console.log(error));
}
export function updateCategory(PosterName, SongCategory) {
  let data = {
    name: PosterName,
    category: SongCategory,
  };
  api
    .put(`poster/update?email=uzair12naseem@gmail.com&name=${PosterName}`, data)
    .then((Response) => console.log(Response.data))
    .catch((error) => console.log(error));
}
export function add(SongObject) {
  api
    .post("poster?email=uzair12naseem@gmail.com", SongObject)
    .then((Response) => console.log(Response.data))
    .catch((error) => console.log(error));
}
export function Read() {
  return api
    .get("poster/get?email=uzair12naseem@gmail.com")
    .then((Response) => {
      return Response.data;
    })
    .catch((error) => console.log(error));
}
