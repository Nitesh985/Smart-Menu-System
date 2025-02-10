import axios, { AxiosError } from "axios";

const paymentApi = axios.create({
  baseURL: "/api/v1/payment",
});


const initiatePayment = async (amount:number, orderId:string, paymentMethod:"ESEWA" | "CASH") => {
    try {
        const response = await paymentApi.post(`/initiate-payment`, {
            amount,
            orderId,
            paymentMethod
        });
        return response.data;
    } catch (error) {
        console.error(error)
        if (error instanceof AxiosError){
            throw new Error(error.response?.data?.message)
        }
    }
}


export { initiatePayment }