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
// api.interceptors.request.use(async (config) => {
//   const accessToken = store.getState().auth.token;
//   if (accessToken && config.headers) {
//     config.headers['Authorization'] = `Bearer ${accessToken}`;
//   }
//   return config;
// });

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         const refreshResponse = await axios.post('/refresh-access-token');
//         const newAccessToken = refreshResponse.data.token;
//         store.dispatch(authSlice.actions.setToken(newAccessToken));
//         originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
//         return api(originalRequest);
//       } catch (refreshError) {
//         console.error('Failed to refresh token:', refreshError);
//         return Promise.reject(refreshError);
//       }
//     }
//     return Promise.reject(error);
//   }
// );


export const {login, logout, setToken} = authSlice.actions;

export default authSlice.reducer;