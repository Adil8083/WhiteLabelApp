import { create } from "apisauce";

const apiClient = create({
  baseURL: "http://192.168.10.6:3000/api",
});

export default apiClient;
