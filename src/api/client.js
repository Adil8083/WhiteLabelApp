import { create } from "apisauce";

const apiClient = create({
  baseURL: "http://192.168.0.104:3000/api",
});

export default apiClient;
