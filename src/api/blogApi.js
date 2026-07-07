import axiosInstance from '../utils/axiosInstance';

export const getAllBlogs = () => axiosInstance.get('/blogs');
export const getBlogBySlug = (slug) => axiosInstance.get(`/blogs/${slug}`);
export const getAllBlogsAdmin = () => axiosInstance.get('/admin/blogs');
export const createBlog = (data) => axiosInstance.post('/admin/blogs', data);
export const updateBlog = (id, data) => axiosInstance.put(`/admin/blogs/${id}`, data);
export const deleteBlog = (id) => axiosInstance.delete(`/admin/blogs/${id}`);