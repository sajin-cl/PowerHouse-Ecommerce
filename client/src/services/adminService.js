import axiosInstance from "../utils/axiosInstance";


export const addCategory = (data) => axiosInstance.post('/admin/categories', data);
export const getAdminCategories = () => axiosInstance.get('/admin/categories');
export const getCategoryById = (id) => axiosInstance.get(`/admin/categories/${id}`);
export const updateCategory = (id, data) => axiosInstance.patch(`/admin/categories/${id}`, data);
export const deleteCategory = (id) => axiosInstance.delete(`/admin/categories/${id}`);

export const addBrand = (data) => axiosInstance.post('/admin/brands', data);
export const getAdminBrands = () => axiosInstance.get('/admin/brands');
export const deleteBrand = (id) => axiosInstance.get(`/admin/brands/${id}`);
export const getBrandById = (id) => axiosInstance.get(`/admin/brands/${id}`);
export const updateBrand = (id, data) => axiosInstance.patch(`/admin/brands/${id}`, data);


export const getAllUsers = () => axiosInstance.get('/admin/users');
export const deleteUser = (id) => axiosInstance.delete(`/admin/users/${id}`);
export const toggleBlockUser = (id) => axiosInstance.patch(`/admin/users/${id}/toggle-block`, null);

export const getAdminDashboard = () => axiosInstance.get('/admin/dashboard');

export const getAllSellers = () => axiosInstance.get('/admin/sellers');
export const deleteSeller = (id) => axiosInstance.delete(`/admin/sellers/${id}`);
export const toggleBlockSeller = (id) => axiosInstance.patch(`/admin/sellers/${id}/toggle-block`, null);


export const getAllOrders = () => axiosInstance.get('/admin/orders');
export const updateOrderStatus = (id, status) => axiosInstance.patch(`/admin/orders/${id}/status`, { status });

