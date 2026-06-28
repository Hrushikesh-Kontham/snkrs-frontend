import axiosInstance from '../utils/axiosInstance';

export const createOrder = (data) => axiosInstance.post('/orders/create', data);
export const getUserOrders = () => axiosInstance.get('/orders/user');
export const getOrderById = (id) => axiosInstance.get(`/orders/${id}`);