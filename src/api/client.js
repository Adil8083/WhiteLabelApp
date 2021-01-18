import { create } from "apisauce";

const apiClient = create({
  baseURL: "http://whitelabelapp-backend.herokuapp.com/api",
});

export default apiClient;
