import axios, { AxiosError } from "axios";
import { useRevalidator } from "react-router-dom";


export const feedbackApi = axios.create({
  baseURL: "/api/v1/feedbacks",
});

const writeFeedback = async(token:string, {...data} ) => {
    try{
        const response = await feedbackApi.post(`/create-feedback`, {...data}, {
            headers:{
              Authorization: "Bearer " + token
            }
          });
        return response.data;
        } catch(error){
            console.log(error);
            if(error instanceof AxiosError){
                throw error;
            }
            return null;
        }
}


const getAllFeedbacks = async() => {
    try{
            const response = await feedbackApi.get(`/`);
            return response.data;
        } catch(error){
            console.log(error);
            if(error instanceof AxiosError){
                throw error;
            }
            return null;
        }
}



export {writeFeedback, getAllFeedbacks}