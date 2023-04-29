import { API_URL } from "../config";
import routes from "./api.config";

let baseUrl = API_URL + routes.submitAnswer;
let url =""
export const submitAnswer = async (password, teamId, problemId, answer) => {
  const basicAuth = "Basic " + btoa("admin:" + password);
  let headers = new Headers();
  url = baseUrl + "/" + teamId + "/submit/" + problemId;
  headers.append("Authorization", basicAuth);
  headers.append("Content-Type", "text/plain;charset=UTF-8")
  headers.append("Access-Control-Allow-Origin", "*");
  try {
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "omit",
      headers: headers,
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: answer,
    });
    const responseData = await response;
    return responseData.ok
  } catch (err) {
    console.log(err)
    return false;
  }

};
