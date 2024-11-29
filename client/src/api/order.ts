import axios from 'axios';
import { Dish } from './dish';

const orderApi = axios.create({
  baseURL: '/api/v1/orders',
});

export interface Order {
    table_no: string;
    orderType: {
        type: string;
        enum: ["Delivery", "Take Away", "Dine-In"]
    }
    dishes: Dish[];
    total: number;
}
    
const createOrder = async (orderId: number, orderData: Order) => {
    try {
        const response = await orderApi.post(`create-order/${orderId}`, orderData);
        return response.data;
    } catch (error) {
        if (error instanceof axios.AxiosError) {
        throw new Error(`Error creating order: ${error.message}`);
        }
    }
}

const getOrders = async () => {
    try {
        const response = await orderApi.get('/get-orders');
        return response.data;
    } catch (error) {
        if (error instanceof axios.AxiosError) {
            throw new Error(`Error getting orders: ${error.message}`);
        }
        return null;
    }
}
    

export { createOrder, getOrders };


