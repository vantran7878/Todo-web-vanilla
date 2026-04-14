import {request} from "./base.js"

export function login(email, password){
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email, password
    })
  });
}


export function register(data) {
  return request("/auth/register",{
    method: "POST",
    body: JSON.stringify(data)
  });
}
