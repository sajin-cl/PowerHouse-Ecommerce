import axiosInstance from "../utils/axiosInstance";

export const getCart = () => axiosInstance.get('/cart');
export const addToCart = (productId, quantity) => axiosInstance.post('/cart', { productId, quantity });
export const updateCartItem = (id, quantity) => axiosInstance.patch(`/cart/${id}`, { quantity });
export const removeFromCart = (id) => axiosInstance.delete(`/cart/${id}`);

