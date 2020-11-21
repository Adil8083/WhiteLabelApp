import { create } from "apisauce";

const apiClient = create({
  baseURL: "http://192.168.0.103:3000/api",
});

export default apiClient;
