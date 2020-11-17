import client from "./client";

export function del(PosterName) {
  client
    .delete(`poster/delete?email=${user.email}&name=${PosterName}`)
    .then((Response) => console.log(Response.data))
    .catch((error) => console.log(error));
}
export function updateAlbum(PosterName, SongAlbum) {
  let data = {
    name: PosterName,
    album: SongAlbum,
  };
  client
    .put(`poster/update?email=${user.email}&name=${PosterName}`, data)
    .then((Response) => console.log(Response.data))
    .catch((error) => console.log(error));
}
export function updatePoster(PosterName, SongPoster) {
  let data = {
    name: PosterName,
    poster: SongPoster,
  };
  client
    .put(`poster/update?email=${user.email}&name=${PosterName}`, data)
    .then((Response) => console.log(Response.data))
    .catch((error) => console.log(error));
}
export function updateCategory(PosterName, SongCategory) {
  let data = {
    name: PosterName,
    category: SongCategory,
  };
  client
    .put(`poster/update?email=${user.email}&name=${PosterName}`, data)
    .then((Response) => console.log(Response.data))
    .catch((error) => console.log(error));
}
export function add(SongObject) {
  client
    .post(`poster?email=${user.email}`, SongObject)
    .then((Response) => console.log(Response.data))
    .catch((error) => console.log(error));
}
export function Read() {
  return client
    .get(`poster/get?email=${user.email}`)
    .then((Response) => {
      return Response.data;
    })
    .catch((error) => console.log(error));
}
