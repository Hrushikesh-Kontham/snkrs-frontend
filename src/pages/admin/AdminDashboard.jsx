import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllSneakers, deleteSneaker } from '../../api/sneakerApi';
import { getAllOrders, updateOrderStatus } from '../../api/orderApi';
import { getAllBlogsAdmin, deleteBlog } from '../../api/blogApi';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('sneakers');
    const [sneakerTab, setSneakerTab] = useState('all');
    const [blogTab, setBlogTab] = useState('published');

    const [sneakers, setSneakers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        fetchAll();
    }, []);

    const fetchAll = async () => {
        setLoading(true);
        try {
            const [sneakersRes, ordersRes, blogsRes] = await Promise.all([
                getAllSneakers(),
                getAllOrders(),
                getAllBlogsAdmin(),
            ]);
            setSneakers(sneakersRes.data);
            setOrders(ordersRes.data);
            setBlogs(blogsRes.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteSneaker = async (id) => {
        if (!window.confirm('Delete this sneaker?')) return;
        await deleteSneaker(id);
        setSneakers(sneakers.filter(s => s.id !== id));
    };

    const handleDeleteBlog = async (id) => {
        if (!window.confirm('Delete this blog post?')) return;
        await deleteBlog(id);
        setBlogs(blogs.filter(b => b.id !== id));
    };

    const handleStatusChange = async (id, status) => {
        await updateOrderStatus(id, status);
        setOrders(orders.map(o => o.id === id ? { ...o, status } : o));
    };

    const statusOptions = ['PLACED', 'CONFIRMED', 'SHIPPED', 'DELIVERED'];
    const statusStyles = {
        PLACED: 'bg-blue-50 text-blue-600',
        CONFIRMED: 'bg-yellow-50 text-yellow-600',
        SHIPPED: 'bg-purple-50 text-purple-600',
        DELIVERED: 'bg-green-50 text-green-600',
    };

    const mainTabs = ['dashboard', 'sneakers', 'orders', 'blogs'];

    const filteredBlogs = blogs.filter(b =>
        blogTab === 'published' ? b.status === 'PUBLISHED' : b.status === 'DRAFT'
    );

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-black text-white px-8 pt-10 pb-0">
                <div className="max-w-7xl mx-auto">
                    <p className="text-xs tracking-widest text-gray-400 uppercase mb-1">Admin Panel</p>
                    <h1 className="text-3xl font-black tracking-tight mb-6">Admin Dashboard</h1>

                    {/* Main Tabs */}
                    <div className="flex gap-8">
                        {mainTabs.map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`pb-4 text-sm font-semibold capitalize tracking-wide border-b-2 transition-all
                                    ${activeTab === tab
                                        ? 'border-white text-white'
                                        : 'border-transparent text-gray-400 hover:text-gray-200'}`}>
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-8 py-8">

                {/* Dashboard Overview */}
                {activeTab === 'dashboard' && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { label: 'Total Sneakers', value: sneakers.length, color: 'bg-black text-white' },
                            { label: 'Total Orders', value: orders.length, color: 'bg-white text-black' },
                            { label: 'Published Blogs', value: blogs.filter(b => b.status === 'PUBLISHED').length, color: 'bg-white text-black' },
                            { label: 'Draft Blogs', value: blogs.filter(b => b.status === 'DRAFT').length, color: 'bg-white text-black' },
                        ].map(stat => (
                            <div key={stat.label} className={`${stat.color} rounded-2xl border border-gray-100 shadow-sm p-6`}>
                                <p className="text-3xl font-black mb-1">{stat.value}</p>
                                <p className="text-xs uppercase tracking-widest opacity-60">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Sneakers Tab */}
                {activeTab === 'sneakers' && (
                    <div>
                        {/* Sub tabs */}
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex gap-6 border-b border-gray-200 w-full">
                                {['all', 'add'].map(tab => (
                                    <button
                                        key={tab}
                                        onClick={() => tab === 'add' ? navigate('/admin/sneakers/add') : setSneakerTab(tab)}
                                        className={`pb-3 text-sm font-semibold capitalize border-b-2 transition-all -mb-px
                                            ${sneakerTab === tab && tab !== 'add'
                                                ? 'border-black text-black'
                                                : 'border-transparent text-gray-400 hover:text-black'}`}>
                                        {tab === 'all' ? 'All Sneakers' : '+ New Sneaker'}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Sneakers Table */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-100">
                                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-widest">Sneaker</th>
                                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-widest">Brand</th>
                                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-widest">Category</th>
                                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-widest">Price</th>
                                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-widest">Stock</th>
                                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-widest">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sneakers.map(sneaker => (
                                        <tr key={sneaker.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-12 h-12 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                                                        <img src={sneaker.imageUrl} alt={sneaker.name}
                                                            className="w-full h-full object-contain p-1"
                                                            onError={(e) => e.target.src = 'https://placehold.co/50'} />
                                                    </div>
                                                    <span className="font-semibold text-gray-900 text-sm">{sneaker.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">{sneaker.brand}</td>
                                            <td className="px-6 py-4 text-sm text-gray-500">{sneaker.category}</td>
                                            <td className="px-6 py-4 text-sm font-semibold text-gray-900">₹{sneaker.price.toLocaleString('en-IN')}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap
                                                    ${sneaker.stock > 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>
                                                    {sneaker.stock > 0 ? `${sneaker.stock} left` : 'Out of Stock'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex gap-2">
                                                    <Link to={`/admin/sneakers/edit/${sneaker.id}`}
                                                        className="text-xs px-3 py-1.5 border border-gray-200 rounded-lg hover:border-black transition-colors font-medium">
                                                        Edit
                                                    </Link>
                                                    <button onClick={() => handleDeleteSneaker(sneaker.id)}
                                                        className="text-xs px-3 py-1.5 border border-red-100 text-red-500 rounded-lg hover:bg-red-50 transition-colors font-medium">
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {sneakers.length === 0 && (
                                <div className="text-center py-16 text-gray-400">
                                    <p className="text-4xl mb-3">👟</p>
                                    <p className="text-sm">No sneakers added yet.</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Orders Tab */}
                {activeTab === 'orders' && (
                    <div>
                        <div className="flex gap-6 border-b border-gray-200 mb-6">
                            <span className="pb-3 text-sm font-semibold border-b-2 border-black text-black -mb-px">
                                Manage Orders
                            </span>
                        </div>

                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-gray-100 text-left">
                                        <th className="px-6 py-4 font-semibold text-gray-400 text-xs uppercase tracking-wide">Order</th>
                                        <th className="px-6 py-4 font-semibold text-gray-400 text-xs uppercase tracking-wide">Customer</th>
                                        <th className="px-6 py-4 font-semibold text-gray-400 text-xs uppercase tracking-wide">Total</th>
                                        <th className="px-6 py-4 font-semibold text-gray-400 text-xs uppercase tracking-wide">Date</th>
                                        <th className="px-6 py-4 font-semibold text-gray-400 text-xs uppercase tracking-wide">Status</th>
                                        <th className="px-6 py-4 font-semibold text-gray-400 text-xs uppercase tracking-wide">Update</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map(order => (
                                        <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 font-semibold text-gray-900">#{order.id}</td>
                                            <td className="px-6 py-4 text-gray-600">{order.user?.email}</td>
                                            <td className="px-6 py-4 font-semibold text-gray-900">₹{order.totalPrice?.toLocaleString('en-IN')}</td>
                                            <td className="px-6 py-4 text-gray-500 text-xs">{new Date(order.createdAt).toLocaleDateString('en-IN')}</td>
                                            <td className="px-6 py-4">
                                                <span className={`text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wide ${statusStyles[order.status]}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <select
                                                    value={order.status}
                                                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                                    className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:border-black">
                                                    {statusOptions.map(s => (
                                                        <option key={s} value={s}>{s}</option>
                                                    ))}
                                                </select>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {orders.length === 0 && (
                                <p className="text-center text-gray-400 py-12 text-sm">No orders yet.</p>
                            )}
                        </div>
                    </div>
                )}

                {/* Blogs Tab */}
                {activeTab === 'blogs' && (
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex gap-6 border-b border-gray-200 flex-1">
                                {['published', 'drafts', 'add'].map(tab => (
                                    <button
                                        key={tab}
                                        onClick={() => tab === 'add' ? navigate('/admin/blogs/add') : setBlogTab(tab)}
                                        className={`pb-3 text-sm font-semibold capitalize border-b-2 transition-all -mb-px
                                            ${blogTab === tab && tab !== 'add'
                                                ? 'border-black text-black'
                                                : 'border-transparent text-gray-400 hover:text-black'}`}>
                                        {tab === 'add' ? '+ New Blog' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-gray-100 text-left">
                                        <th className="px-6 py-4 font-semibold text-gray-400 text-xs uppercase tracking-wide">Title</th>
                                        <th className="px-6 py-4 font-semibold text-gray-400 text-xs uppercase tracking-wide">Category</th>
                                        <th className="px-6 py-4 font-semibold text-gray-400 text-xs uppercase tracking-wide">Status</th>
                                        <th className="px-6 py-4 font-semibold text-gray-400 text-xs uppercase tracking-wide">Date</th>
                                        <th className="px-6 py-4 font-semibold text-gray-400 text-xs uppercase tracking-wide">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredBlogs.map(blog => (
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
                                                    className="text-xs px-3 py-1.5 border border-gray-200 rounded-lg hover:border-black transition-colors font-medium">
                                                    Edit
                                                </Link>
                                                <button onClick={() => handleDeleteBlog(blog.id)}
                                                    className="text-xs px-3 py-1.5 border border-red-100 text-red-500 rounded-lg hover:bg-red-50 transition-colors font-medium">
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {filteredBlogs.length === 0 && (
                                <p className="text-center text-gray-400 py-12 text-sm">
                                    No {blogTab} posts yet.
                                </p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;