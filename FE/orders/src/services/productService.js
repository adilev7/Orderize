import http from "./httpService";
import { apiUrl } from "../config.json";

export function getAllProducts() {
  return http.get(`${apiUrl}/products`);
}

export async function getProduct(productId) {
  const product = await http.get(`${apiUrl}/products/${productId}`);
  return product;
}

export function createProduct(product) {
  return http.post(`${apiUrl}/products`, product);
}

export function editProduct(product) {
  const { _id: productId } = product;
  return http.put(`${apiUrl}/products/${productId}`, product);
}

export function deleteProduct(productId) {
  return http.delete(`${apiUrl}/products/${productId}`);
}

export default {
  createProduct,
  getAllProducts,
  getProduct,
  editProduct,
  deleteProduct,
};
