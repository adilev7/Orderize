import http from "./httpService";
import { apiUrl } from "../config.json";

export function getAllStarred() {
  return http.get(`${apiUrl}/starred`);
}

export async function getStarredByUser(userId) {
  const starred = await http.get(`${apiUrl}/starred/${userId}`);
  return starred;
}

export function createStarred(starred) {
  return http.post(`${apiUrl}/starred`, starred);
}

export function editStarred(starred) {
  const { _id: starredId } = starred;
  return http.put(`${apiUrl}/starred/${starredId}`, starred);
}

export default {
  createStarred,
  getAllStarred,
  getStarredByUser,
  editStarred,
};
