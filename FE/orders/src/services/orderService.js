import http from "./httpService";
import { apiUrl } from "../config.json";

//compare the http (axios) methods to the server side endpoints

export async function getOrder(orderId) {
  // try {
  const order = await http.get(`${apiUrl}/orders/${orderId}`);
  console.log("ddddd");
  return order;
  // } catch (err) {
  //   console.log("error", err);
  // }
}

export function editOrder(order) {
  const { _id: orderId } = order;
  return http.put(`${apiUrl}/orders/${orderId}`, order);
}

export function deleteOrder(orderId) {
  return http.delete(`${apiUrl}/orders/${orderId}`);
}

export function createOrder(order) {
  return http.post(`${apiUrl}/orders`, order);
}

export function getAllOrders() {
  return http.get(`${apiUrl}/orders`);
}

export default {
  createOrder,
  getAllOrders,
  getOrder,
  editOrder,
  deleteOrder,
};
