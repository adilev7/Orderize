import http from "./httpService";
import { apiUrl } from "../config.json";

export async function getOrder(orderId) {
  const order = await http.get(`${apiUrl}/orders/${orderId}`);
  return order;
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
