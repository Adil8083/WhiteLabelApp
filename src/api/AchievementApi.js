import useAuth from "../auth/useAuth";
import client from "./client";

const { user } = useAuth();

const del = (AchievementId) => {
  client
    .delete(`achievements/delete?email=${user.email}&id=${AchievementId}`)
    .then((Response) => console.log(Response.data))
    .catch((error) => console.log(error));
};
const update = (AchievementId, AchievementObject) => {
  client
    .put(
      `achievements/update?email=${user.email}&id=${AchievementId}`,
      AchievementObject
    )
    .then((Response) => console.log(Response.data))
    .catch((error) => console.log(error));
};
const add = (AchievementObject) => {
  client
    .post(`achievements?email=${user.email}`, AchievementObject)
    .then((Response) => console.log(Response.data))
    .catch((error) => console.log(error));
};
const Read = () => {
  return client
    .get(`achievements/get?email=${user.email}`)
    .then((Response) => {
      return Response.data;
    })
    .catch((error) => console.log(error));
};

export default { del, update, add, Read };
