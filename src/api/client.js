import { create } from "apisauce";

const apiClient = create({
  baseURL: "http://192.168.0.105:3000/api",
});

export default apiClient;
