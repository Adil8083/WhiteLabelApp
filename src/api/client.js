import { create } from "apisauce";

const apiClient = create({
  baseURL: "http://192.168.10.5:3000/api",
});

export default apiClient;
