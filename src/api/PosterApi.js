import client from "./client";

export const del = (PosterName, user) => {
  client
    .delete(`poster/delete?email=${user.email}&name=${PosterName}`)
    .then((Response) => console.log(Response.data))
    .catch((error) => console.log(error));
};
export const updateAlbum = (PosterName, SongAlbum, user) => {
  let data = {
    name: PosterName,
    album: SongAlbum,
  };
  return client.put(
    `poster/update?email=${user.email}&name=${PosterName}`,
    data
  );
};
export const updatePoster = (PosterName, SongPoster, user) => {
  let data = {
    name: PosterName,
    poster: SongPoster,
  };
  return client.put(
    `poster/update?email=${user.email}&name=${PosterName}`,
    data
  );
};
export const updateCategory = (PosterName, SongCategory, user) => {
  let data = {
    name: PosterName,
    category: SongCategory,
  };
  return client.put(
    `poster/update?email=${user.email}&name=${PosterName}`,
    data
  );
};
export const add = (SongObject, user) => {
  return client.post(`poster?email=${user.email}`, SongObject);
};
export const Read = (user) => {
  return client.get(`poster/get?email=${user.email}`);
};
