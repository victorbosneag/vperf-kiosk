import { API_URL } from "../config";
import routes from "./api.config";

const url = API_URL + routes.authCheck;

export const authCheck = async (password) => {
  const basicAuth = "Basic " + btoa("admin:" + password);
  let headers = new Headers();
  headers.append("Authorization", basicAuth);
  //headers.append("Access-Control-Allow-Origin", "*");
  try {
    const response = fetch(url, {
      method: "GET",
      headers: headers,
    });
    const responseRawData = await response;
    return responseRawData.ok;
  } catch (err) {
    console.log(err)
    return false;
  }
};
