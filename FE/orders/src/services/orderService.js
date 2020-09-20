import http from "./httpService";
import { apiUrl } from "../config.json";

//compare the http (axios) methods to the server side endpoints

export function getOrder(orderId) {
  return http.get(`${apiUrl}/orders/${orderId}`);
}

export function editOrder(order) {
  //Destruct the parameter (order) into _id and ...rest. rename the _id (orderId).
  const { _id: orderId, ...bodyOrder } = order;
  return http.put(`${apiUrl}/orders/${orderId}`, bodyOrder);
}

export function deleteOrder(orderId) {
  alert("are you sure?");
  return http.delete(`${apiUrl}/orders/${orderId}`);
}

export function createOrder(order) {
  console.log("create order 88888888", JSON.stringify(order));
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
