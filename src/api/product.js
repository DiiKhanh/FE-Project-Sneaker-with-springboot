import axios from "../axiosConfig";

export const getAllProducts = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/api/product/all",
        method: "get",
      });
      resolve(response);
    } catch (error) {
      reject(error.message);
    }
  });

export const getProduct = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: `/api/product/detail/${id}`,
        method: "get",
      });
      resolve(response);
    } catch (error) {
      reject(error.message);
    }
  });

export const addProduct = (data, token) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: `/api/product/add`,
        method: "post",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data,
      });
      resolve(response);
    } catch (error) {
      reject(error.message);
    }
  });

export const deleteProduct = (id, token) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: `/api/product/${id}`,
        method: "delete",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      resolve(response);
    } catch (error) {
      reject(error.message);
    }
  });

export const updateProduct = (id, data, token) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: `/api/product/${id}`,
        method: "put",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data,
      });
      resolve(response);
    } catch (error) {
      reject(error.message);
    }
  });

export const getProductsPage = (page) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: `/api/all-products?page=${page}`,
        method: "get",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Credentials": "true",
        },
      });
      resolve(response);
    } catch (error) {
      reject(error.message);
    }
  });
