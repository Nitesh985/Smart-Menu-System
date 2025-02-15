import axios, { AxiosError } from "axios";


export const userApi = axios.create({
  baseURL: "/api/v1/users",
});


const registerUser = async ({...data})=> {
    try{
        const response = await userApi.post(`/sign-up`, {...data});
        return response.data;
    } catch(error){
        console.log(error);
        if(error instanceof AxiosError){
            throw error;
        }
        return null;
    }
}

export {registerUser}