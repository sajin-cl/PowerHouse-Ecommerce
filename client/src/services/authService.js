import axiosInstance from '../utils/axiosInstance';


export const login = (data) => axiosInstance.post('/auth/login', data);

export const register = (data) => axiosInstance.post('/auth/register', data);

export const logout = () => axiosInstance.get('/auth/logout');

export const checkSession = () => axiosInstance.get('/auth/check-session');


export const forgotPassword = (email) => axiosInstance.post('/auth/forgot-password', { email });
export const verifyOtp = (email, otp) => axiosInstance.post('/auth/verify-otp', { email, otp });
export const resetPassword = (email, password) => axiosInstance.post('/auth/reset-password', { email, password });