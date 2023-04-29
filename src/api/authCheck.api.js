import routes from "./api.config";

const url = "http://localhost:1031" + routes.authCheck;

export const authCheck = async (password) => {
  const basicAuth = "Basic " + btoa("admin:" + password);
  let headers = new Headers();
  headers.append("Authorization", basicAuth);
  try {
    const response = fetch(url, {
      method: "GET",
      headers: headers,
    });
    const responseRawData = await response;
    return responseRawData.ok;
  } catch (err) {
    return false;
  }
};
