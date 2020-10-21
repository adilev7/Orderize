import http from "./httpService";
import { apiUrl } from "../config.json";
import jwtDecode from "jwt-decode";

const tokenKey = "token";

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (error) {
    return null;
  }
}

export async function login(email, password) {
  const { data } = await http.post(`${apiUrl}/auth`, { email, password });
  localStorage.setItem(tokenKey, data.token);
}

/* createDefaultUsers - automaticaly create the following users when envoked */
export async function createDefaultUsers() {
  await http
    .post(`${apiUrl}/users/default`, {
      email: "a@a.com",
      password: "123456",
      admin: true,
    })
    .catch((error) => console.error(error));
  await http
    .post(`${apiUrl}/users/default`, {
      email: "b@b.com",
      password: "123456",
      admin: false,
    })
    .catch((error) => console.error(error));
}

export default {
  login,
  getCurrentUser,
  logout,
  getJwt,
  createDefaultUsers,
};
