import axiosInstance from "../utils/axiosInstance";


export const getMyOrders = () => axiosInstance.get('/orders');
export const cancelMyOrder = (orderId) => axiosInstance.patch(`/orders/${orderId}/cancel`);
export const placeOrder = (orderData) => axiosInstance.post('/orders/checkout', orderData);