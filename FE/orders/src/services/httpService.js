import axios from "axios";
import userService from "./userService";

axios.defaults.headers.common["x-auth-token"] = userService.getJwt();

axios.interceptors.response.use(null, (error) => Promise.reject(error));

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
};
