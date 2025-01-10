import axios from 'axios';
import { Dish } from './dish';

const orderApi = axios.create({
  baseURL: '/api/v1/orders',
});

export interface OrderType {
    table_no: string;
    orderType: {
        type: string;
        enum: ["Delivery", "Take Away", "Dine-In"]
    };
    note:string;
    orderItems: Dish[];
    total: number;
}
    
const makeOrder = async (orderData: OrderType) => {
    try {
        const response = await orderApi.post(`make-order`, orderData);
        return response.data;
    } catch (error) {
        console.log(error)
        console.log(error?.response?.data.message)
        if (error instanceof axios.AxiosError) {
        throw new Error(`Error creating order: ${error.message}`);
        }
    }
}

const getOrders = async () => {
    try {
        const response = await orderApi.get('/');
        return response.data;
    } catch (error) {
        if (error instanceof axios.AxiosError) {
            throw new Error(`Error getting orders: ${error.message}`);
        }
        return null;
    }
}
    

export { makeOrder , getOrders };


