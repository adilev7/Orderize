import http from "./httpService";
import { apiUrl } from "../config.json";

//compare the http (axios) methods to the server side endpoints

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

export function deleteStarred(starredId) {
  return http.delete(`${apiUrl}/starred/${starredId}`);
}

export default {
  createStarred,
  getAllStarred,
  getStarredByUser,
  editStarred,
  deleteStarred,
};
