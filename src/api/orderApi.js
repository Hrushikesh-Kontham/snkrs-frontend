import axiosInstance from '../utils/axiosInstance';

export const createOrder = (data) => axiosInstance.post('/orders/create', data);
export const getUserOrders = () => axiosInstance.get('/orders/user');
export const getOrderById = (id) => axiosInstance.get(`/orders/${id}`);
// export const getAllOrders = () => axiosInstance.get('/admin/orders');
// export const updateOrderStatus = (id, status) => axiosInstance.put(`/admin/orders/${id}/status`, { status });

export const getAllOrders = () => axiosInstance.get('/orders/admin/orders');
export const updateOrderStatus = (id, status) => axiosInstance.put(`/orders/admin/orders/${id}/status`, { status });