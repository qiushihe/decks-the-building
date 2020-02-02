import fetch from "isomorphic-fetch";
import Promise from "bluebird";

const request = (url, { method = "GET", headers = {}, body } = {}) => {
  const requestHeaders = {
    "Content-Type": "application/json",
    ...headers
  };

  let requestBody = body;
  if (requestHeaders["Content-Type"] === "application/json") {
    requestBody = JSON.stringify(body);
  }

  return fetch(url, {
    method,
    headers: requestHeaders,
    body: requestBody
  }).then(res => {
    if (!res.ok) {
      if (requestHeaders["Content-Type"] === "application/json") {
        return res.json().then(err => {
          return Promise.reject({
            ...err,
            status: res.status,
            statusText: res.statusText
          });
        });
      } else {
        return Promise.reject(res);
      }
    } else {
      if (requestHeaders["Content-Type"] === "application/json") {
        return res.status === 204 ? Promise.resolve({}) : res.json();
      } else {
        return res;
      }
    }
  });
};

export const get = (url, { headers = {} } = {}) =>
  request(url, { method: "GET", headers });

export const post = (url, { headers = {}, body } = {}) =>
  request(url, { method: "POST", headers, body });

export const put = (url, { headers = {}, body } = {}) =>
  request(url, { method: "PUT", headers, body });

export const del = (url, { headers = {}, body } = {}) =>
  request(url, { method: "DELETE", headers, body });

export default request;
