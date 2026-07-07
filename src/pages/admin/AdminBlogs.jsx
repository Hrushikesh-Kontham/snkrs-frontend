import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllBlogsAdmin, deleteBlog } from '../../api/blogApi';

const AdminBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBlogs = async () => {
        try {
            const res = await getAllBlogsAdmin();
            setBlogs(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchBlogs(); }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this blog post?')) return;
        await deleteBlog(id);
        fetchBlogs();
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl font-black text-gray-900">Blog Management</h1>
                    <Link to="/admin/blogs/add"
                        className="bg-black text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-800 transition-colors">
                        + New Post
                    </Link>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-100 text-left">
                                <th className="px-6 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wide">Title</th>
                                <th className="px-6 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wide">Category</th>
                                <th className="px-6 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wide">Status</th>
                                <th className="px-6 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wide">Date</th>
                                <th className="px-6 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wide">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {blogs.map(blog => (
                                <tr key={blog.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-semibold text-gray-900">{blog.title}</td>
                                    <td className="px-6 py-4 text-gray-500">{blog.category || '—'}</td>
                                    <td className="px-6 py-4">
                                        <span className={`text-xs font-semibold px-3 py-1 rounded-full uppercase
                                            ${blog.status === 'PUBLISHED' ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'}`}>
                                            {blog.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500 text-xs">
                                        {new Date(blog.createdAt).toLocaleDateString('en-IN')}
                                    </td>
                                    <td className="px-6 py-4 flex gap-3">
                                        <Link to={`/admin/blogs/edit/${blog.id}`}
                                            className="text-sm font-semibold text-gray-700 hover:text-black">
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(blog.id)}
                                            className="text-sm font-semibold text-red-400 hover:text-red-600">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {blogs.length === 0 && (
                        <p className="text-center text-gray-400 py-12 text-sm">No blog posts yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminBlogs;