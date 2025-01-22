import axios, { AxiosError } from "axios";

const paymentApi = axios.create({
  baseURL: "/api/v1/payment",
});


const initiatePayment = async (amount:number, productId:string) => {
    try {
        const response = await paymentApi.post(`/initiate-payment`, {
            amount,
            productId
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