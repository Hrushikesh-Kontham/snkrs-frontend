import axiosInstance from '../utils/axiosInstance';

export const getWishlist = () => axiosInstance.get('/wishlist');
export const addToWishlist = (data) => axiosInstance.post('/wishlist/add', data);
export const removeFromWishlist = (sneakerId) => axiosInstance.delete(`/wishlist/remove/${sneakerId}`);