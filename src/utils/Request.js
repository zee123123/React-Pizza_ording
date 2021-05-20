import axios from "axios";

export default function Request(url, params) {
  return axios({
    // Google Firebase
    baseURL: "https://react-pizza-ording-default-rtdb.firebaseio.com/",
    url: url,
    method: "get",
    ...params,
  });
}
