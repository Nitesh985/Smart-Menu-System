import axios, { AxiosError } from "axios";

const tableApi = axios.create({
  baseURL: "/api/v1/tables",
});


const getAllTables = async() =>{
    try {
        const response = await tableApi.get(`/`);
        return response.data;
    } catch (error) {
        console.log(error);
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data?.data?.message);
        } 
    }
}

const getTable  = async(tableId:string) => {
    try {
        const response = await tableApi.get(`/get-table/${tableId}`);
        return response.data;
    } catch (error) {
        console.log(error);
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data?.data?.message);
        } 
    }
}


const loginTable = async(tableId:string) =>{
    try {
        const response = await tableApi.post(`/login`, {
            tableId
        });
        return response.data;
    } catch (error) {
        console.log(error);
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data?.data?.message);
        }
    }
}

const logoutTable = async() =>{
    try {
        await tableApi.delete(`/logout`);
    } catch (error) {
        console.log(error);
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data?.data?.message);
        }
    }
}

const refreshAccessToken = async() =>{
    try {
        await tableApi.post(`/refresh-access-token`)
    } catch (error) {
        console.log(error);
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data?.data?.message);
        }
    }
}

export { getAllTables, getTable, loginTable, logoutTable, refreshAccessToken }