import axios from "axios";
import { Dish } from "./dish";

const orderApi = axios.create({
  baseURL: "/api/v1/orders",
});

export interface OrderType {
  table_no: string;
  orderType: "Delivery" |"Take Away" | "Dine-In"
  note: string;
  orderItems: Dish[];
  total: number;
}

const makeOrder = async (orderData: OrderType) => {
  try {
    const response = await orderApi.post(`make-order`, orderData);
    return response.data;
  } catch (error) {
    console.log(error);
    console.log(error?.response?.data.message);
    if (error instanceof axios.AxiosError) {
      throw new Error(`Error creating order: ${error.message}`);
    }
  }
};

const getOrders = async (query:string) => {
  try {
    const response = await orderApi.get(`/?${query}`);
    return response.data;
  } catch (error) {
    if (error instanceof axios.AxiosError) {
      throw new Error(`Error getting orders: ${error.message}`);
    }
    return null;
  }
};

const getOrdersByType = async (orderType: string) => {
  try {
    const response = await orderApi.get(`/get-orders/${orderType}`);
    return response.data;
  } catch (error) {
    if (error instanceof axios.AxiosError) {
      throw new Error(`Error getting orders: ${error.message}`);
    }
    return null;
  }
};

const getTableOrder = async (tableId: string) => {
  try {
    const response = await orderApi.get(`/get-order/${tableId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    if (error instanceof axios.AxiosError) {
      throw new Error(error.response?.data?.message);
    }
  }
};

const getOrder = async (orderId: string) => {
  try {
    const response = await orderApi.get(`/get-order/${orderId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    if (error instanceof axios.AxiosError) {
      throw new Error(error.response?.data?.message);
    }
  }
};

const updateOrder = async (orderId:string, updates: object) => {
  try {
    const response = await orderApi.patch(`/update-order/${orderId}`, updates);
    return response.data;
  } catch (error) {
    console.error(error);
    if (error instanceof axios.AxiosError) {
      throw new Error(error.response?.data?.message);
    }
  }
};

const deleteOrder = async (orderId: string) => {
  try {
    await orderApi.delete(`/delete-order/${orderId}`);
  } catch (error) {
    if (error instanceof axios.AxiosError) {
      throw new Error(`Error getting orders: ${error.message}`);
    }
    return null;
  }
};

export {
  makeOrder,
  getOrders,
  getTableOrder,
  getOrder,
  updateOrder,
  deleteOrder,
  getOrdersByType,
};
