import axiosInstance from "../utils/axiosInstance";


export const getUserProfile = () => axiosInstance.get('/user/profile');
export const updateProfile = (data) => axiosInstance.patch('/user/profile', data);