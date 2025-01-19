import axios, { AxiosError } from 'axios';

const foodApi = axios.create({
  baseURL: '/api/v1/dishes',
});

export interface Dish{
    name: string;
    price: number;
    quantity: number;
    description?: string;
    image?: File| undefined;
    category: string;
}

const getAllDishes = async () => {
    try {
        const response = await foodApi.get("/");
        return response.data?.data;
    } catch (error) {
        console.error(error)
        if (error instanceof AxiosError){
            throw new Error(error.response?.data?.message)
        }
    }
};

const getDishById = async (dishId:string) => {
    try {
        const response = await foodApi.get(`/get-dish/${dishId}`);
        return response.data;
    } catch (error) {
        console.error(error)
        if (error instanceof AxiosError){
            throw new Error(error.response?.data?.message)
        }        
    }
};

const addDish = async (dishData:any) => {
    try {
        const response = await foodApi.post('/add-dish/', dishData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
        return response.data;
    } catch (error) {
        console.error(error);
        if (error instanceof AxiosError){
            throw new Error(error.response?.data?.message)
        }
        if (error instanceof Error){
            throw new Error(error?.message)
        }
    }
};

const updateDish = async (dishId: string, dishData: any) => {
    try {
        console.log("dishData")
        console.log(dishData)
        const response = await foodApi.patch(`/update-dish/${dishId}`, dishData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
        return response.data;
    } catch (error) {
        console.error(error)
        if (error instanceof AxiosError){
            throw new Error(error.response?.data?.message)
        }        
    }
};

const deleteDish = async (dishId: string) => {
    try {
        await foodApi.delete(`/delete-dish/${dishId}`);
    } catch (error) {
        console.error(error)
        if (error instanceof AxiosError){
            throw new Error(error.response?.data?.message)
        }        
    }
};

const searchDish = async (s:string)=>{
    try{
        const response = await foodApi.get(`/search-dish/s=?q=${s}`);
        return response.data;
    }catch(error){
        console.error(error)
        if (error instanceof AxiosError){
            throw new Error(error.response?.data?.message)
        }
    }
}

export { getAllDishes, getDishById, addDish, updateDish, deleteDish, searchDish };
