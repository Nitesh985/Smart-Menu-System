import { createSlice } from "@reduxjs/toolkit";

type FetchUserType = {
    _id:string;
    username: string;
    email:string;
    address?:string;
    contactNo:string;
}

import axios from 'axios';
import store from './store'; // Import your Redux store

const api = axios.create({
  baseURL: '/api/v1/users', // Your backend API URL
});




export interface AuthState{
    status: boolean;
    user: null | FetchUserType;
    token: null | string;
}

const initialState:AuthState = {
    status : false,
    user: null,
    token: null
}


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.user = action.payload.userData;
        },

        logout: (state) => {
            state.status = false;
            state.user = null;
        },
        setToken: (state, action)=>{
            state.token = action.payload
        }
    }
})





export const {login, logout, setToken} = authSlice.actions;

export default authSlice.reducer;