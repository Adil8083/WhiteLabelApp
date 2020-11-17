import useAuth from "../auth/useAuth";
import client from "./client";

const getUser = () => {
  return ({ user } = useAuth());
};

export function del(AchievementId) {
  const user = getUser();
  client
    .delete(`achievements/delete?email=${user.email}&id=${AchievementId}`)
    .then((Response) => console.log(Response.data))
    .catch((error) => console.log(error));
}
export function update(AchievementId, AchievementObject) {
  const user = getUser();
  client
    .put(
      `achievements/update?email=${user.email}&id=${AchievementId}`,
      AchievementObject
    )
    .then((Response) => console.log(Response.data))
    .catch((error) => console.log(error));
}
export function add(AchievementObject) {
  const user = getUser();
  client
    .post(`achievements?email=${user.email}`, AchievementObject)
    .then((Response) => console.log(Response.data))
    .catch((error) => console.log(error));
}
export function Read() {
  const user = getUser();
  return client
    .get(`achievements/get?email=${user.email}`)
    .then((Response) => {
      return Response.data;
    })
    .catch((error) => console.log(error));
}
