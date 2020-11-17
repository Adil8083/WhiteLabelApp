import client from "./client";

export function del(PosterName, user) {
  return client.delete(`poster/delete?email=${user.email}&name=${PosterName}`);
}
export function updateAlbum(PosterName, SongAlbum, user) {
  let data = {
    name: PosterName,
    album: SongAlbum,
  };
  return client.put(
    `poster/update?email=${user.email}&name=${PosterName}`,
    data
  );
}
export function updatePoster(PosterName, SongPoster, user) {
  let data = {
    name: PosterName,
    poster: SongPoster,
  };
  return client.put(
    `poster/update?email=${user.email}&name=${PosterName}`,
    data
  );
}
export function updateCategory(PosterName, SongCategory, user) {
  let data = {
    name: PosterName,
    category: SongCategory,
  };
  return client.put(
    `poster/update?email=${user.email}&name=${PosterName}`,
    data
  );
}
export function add(SongObject, user) {
  return client.post(`poster?email=${user.email}`, SongObject);
}
export function Read(user) {
  return client.get(`poster/get?email=${user.email}`);
}
