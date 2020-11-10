import API from "apisauce";
const baseURL = "http://192.168.10.9:3000/api";
const api = API.create({ baseURL: baseURL });

export function del(AchievementId) {
  api
    .delete(
      `achievements/delete?email=uzair12naseem@gmail.com&id=${AchievementId}`
    )
    .then((Response) => console.log(Response.data))
    .catch((error) => console.log(error));
}
export function update(AchievementId, AchievementObject) {
  api
    .put(
      `achievements/update?email=uzair12naseem@gmail.com&id=${AchievementId}`,
      AchievementObject
    )
    .then((Response) => console.log(Response.data))
    .catch((error) => console.log(error));
}
export function add(AchievementObject) {
  api
    .post("achievements?email=uzair12naseem@gmail.com", AchievementObject)
    .then((Response) => console.log(Response.data))
    .catch((error) => console.log(error));
}
export function Read() {
  return api
    .get("achievements/get?email=uzair12naseem@gmail.com")
    .then((Response) => {
      return Response.data;
    })
    .catch((error) => console.log(error));
}
