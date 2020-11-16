import client from "./client";
import useAuth from "../auth/useAuth";

const { user } = useAuth();

const del = (PosterName) => {
  client
    .delete(`poster/delete?email=${user.email}&name=${PosterName}`)
    .then((Response) => console.log(Response.data))
    .catch((error) => console.log(error));
};
const updateAlbum = (PosterName, SongAlbum) => {
  let data = {
    name: PosterName,
    album: SongAlbum,
  };
  client
    .put(`poster/update?email=${user.email}&name=${PosterName}`, data)
    .then((Response) => console.log(Response.data))
    .catch((error) => console.log(error));
};
const updatePoster = (PosterName, SongPoster) => {
  let data = {
    name: PosterName,
    poster: SongPoster,
  };
  client
    .put(`poster/update?email=${user.email}&name=${PosterName}`, data)
    .then((Response) => console.log(Response.data))
    .catch((error) => console.log(error));
};
const updateCategory = (PosterName, SongCategory) => {
  let data = {
    name: PosterName,
    category: SongCategory,
  };
  client
    .put(`poster/update?email=${user.email}&name=${PosterName}`, data)
    .then((Response) => console.log(Response.data))
    .catch((error) => console.log(error));
};
const add = (SongObject) => {
  client
    .post(`poster?email=${user.email}`, SongObject)
    .then((Response) => console.log(Response.data))
    .catch((error) => console.log(error));
};
const Read = () => {
  return client
    .get(`poster/get?email=${user.email}`)
    .then((Response) => {
      return Response.data;
    })
    .catch((error) => console.log(error));
};

export default { del, updateAlbum, Read, add, updateCategory, updatePoster };
