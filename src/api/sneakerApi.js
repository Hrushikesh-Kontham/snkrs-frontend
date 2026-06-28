import axiosInstance from '../utils/axiosInstance';

export const getAllSneakers = () => axiosInstance.get('/sneakers');
export const getSneakerById = (id) => axiosInstance.get(`/sneakers/${id}`);
export const getSneakersByBrand = (brand) => axiosInstance.get(`/sneakers/brand/${brand}`);
export const getSneakersByCategory = (category) => axiosInstance.get(`/sneakers/category/${category}`);

// Admin
export const addSneaker = (data) => axiosInstance.post('/admin/sneakers', data);
export const updateSneaker = (id, data) => axiosInstance.put(`/admin/sneakers/${id}`, data);
export const deleteSneaker = (id) => axiosInstance.delete(`/admin/sneakers/${id}`);