import request from "../utiles/request";

export async function registretion(params: any) {
  return request("/users", {
    method: "POST",
    data: params && params.data,
  });
}

export async function login(params: any) {
    return request("/auth/login", {
      method: "POST",
      data: params && params.data,
    });
  }