import axiosInstance from '../utils/axiosInstance';

export const getCart = () => axiosInstance.get('/cart');
export const addToCart = (data) => axiosInstance.post('/cart/add', data);
export const removeFromCart = (sneakerId) => axiosInstance.delete(`/cart/remove/${sneakerId}`);