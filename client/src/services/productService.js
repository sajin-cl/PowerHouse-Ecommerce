import axiosInstance from "../utils/axiosInstance";

// Public Data (For dropdowns and lists)
export const getAllProducts = () => axiosInstance.get('/products');
export const getAllCategories = () => axiosInstance.get('/categories');
export const getAllBrands = () => axiosInstance.get('/brands');

export const getProductById = (id) => axiosInstance.get(`/products/${id}`);


// Seller Actions(CRUD) 
export const deleteProduct = (id) => axiosInstance.delete(`/products/${id}`);
export const addProduct = (formData) => axiosInstance.post('/products', formData);
export const updateProduct = (id, formData) => axiosInstance.patch(`/products/${id}`, formData);
