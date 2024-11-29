import axios from 'axios';

const foodApi = axios.create({
  baseURL: '/api/v1/dishes',
});

export interface Dish{
    name: string;
    price: number;
    description?: string;
    image?: string;
    category: string;
}

const getAllDishes = async () => {
    try {
        const response = await foodApi.get("/get-all-dishes");
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch dishes: ${error}`);        
    }
};

const getDishById = async (dishId:string) => {
    try {
        const response = await foodApi.get(`/get-dish/${dishId}`);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch dish with id ${dishId}: ${error}`);        
    }
};

const addDish = async ({...dishData}:Dish) => {
    try {
        const response = await foodApi.post('/add-dish/', dishData);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to add dish: ${error}`);        
    }
};

const updateDish = async (dishId: string, dishData: any) => {
    try {
        const response = await foodApi.put(`/update-dish/${dishId}`, dishData);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to update dish with id ${dishId}: ${error}`);        
    }
};

const deleteDish = async (dishId: string) => {
    try {
        await foodApi.delete(`/delete-dish/${dishId}`);
    } catch (error) {
        throw new Error(`Failed to delete dish with id ${dishId}: ${error}`);        
    }
};

const searchDish = async (s:string)=>{
    try{
        const response = await foodApi.get(`/search-dish/s=${s}`);
        return response.data;
    }catch(error){
        throw new Error(`Failed to search the dish: ${error}`);
    }
}

export { getAllDishes, getDishById, addDish, updateDish, deleteDish, searchDish };
