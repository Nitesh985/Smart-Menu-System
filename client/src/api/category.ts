import axios from 'axios';

const categoryApi = axios.create({
    baseURL: '/api/v1/categories'
})

export interface CategoryProps {
    name: string;
    description?: string;
}

async function getAllCategories() {
    try {
        const response = await categoryApi.get(`/`);
        return response.data?.data;
    } catch (error) {
        throw new Error(`Error fetching categories: ${error}`);
    }
}

async function getDishByCategory({categoryId}: {categoryId: string}){
    try {
        const response = await categoryApi.get(`/getDishByCategory/${categoryId}`);
        return response.data?.data;
        } catch (error) {
        throw new Error(`Error fetching dishes by category: ${error}`);
    }
}

async function createCategory({name, description}:{name:string, description:string}) {
    try {
        const response = await categoryApi.post(`/add-category`, { name, description });
        console.log(response.data?.data)
        return response.data?.data;
    } catch (error) {
        console.log(error)
        throw new Error(`Error creating category: ${error}`);
    }
}

async function updateCategory({categoryId, ...categoryAttribute}:{categoryId:string}) {
    try {
        const response = await categoryApi.patch(`/update-category/${categoryId}`, { ...categoryAttribute });
        return response.data?.data;
    } catch (error) {
        throw new Error(`Error updating category: ${error}`);
    }
}

async function deleteCategory(categoryId: number) {
    try {
        await categoryApi.delete(`/delete-category/${categoryId}`);
    } catch (error) {
        throw new Error(`Error deleting category: ${error}`);
    }
}

export { getAllCategories, getDishByCategory, createCategory, updateCategory, deleteCategory };