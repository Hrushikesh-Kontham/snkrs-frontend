import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllOrders, updateOrderStatus } from '../../api/orderApi';

const statusOptions = ['PLACED', 'CONFIRMED', 'SHIPPED', 'DELIVERED'];

const statusStyles = {
    PLACED: 'bg-blue-50 text-blue-600',
    CONFIRMED: 'bg-yellow-50 text-yellow-600',
    SHIPPED: 'bg-purple-50 text-purple-600',
    DELIVERED: 'bg-green-50 text-green-600',
};

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('ALL');
    const [search, setSearch] = useState('');

    const fetchOrders = async () => {
        try {
            const res = await getAllOrders();
            setOrders(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleStatusChange = async (id, newStatus) => {
        try {
            await updateOrderStatus(id, newStatus);
            setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
        } catch (err) {
            console.error(err);
        }
    };

    const filteredOrders = orders.filter(order => {
        const matchesFilter = filter === 'ALL' || order.status === filter;
        const matchesSearch = search === '' ||
            order.user?.email?.toLowerCase().includes(search.toLowerCase()) ||
            String(order.id).includes(search);
        return matchesFilter && matchesSearch;
    });

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-2xl font-black text-gray-900 mb-6">Order Management</h1>

                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <input
                        type="text"
                        placeholder="Search by email or order ID..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm flex-1 focus:outline-none focus:border-black transition-colors"
                    />
                    <div className="flex gap-2 flex-wrap">
                        {['ALL', ...statusOptions].map((s) => (
                            <button
                                key={s}
                                onClick={() => setFilter(s)}
                                className={`text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors ${
                                    filter === s ? 'bg-black text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-black'
                                }`}>
                                {s}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Orders Table */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-100 text-left">
                                <th className="px-6 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wide">Order</th>
                                <th className="px-6 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wide">Customer</th>
                                <th className="px-6 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wide">Total</th>
                                <th className="px-6 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wide">Date</th>
                                <th className="px-6 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wide">Status</th>
                                <th className="px-6 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wide">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map((order) => (
                                <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-semibold text-gray-900">#{order.id}</td>
                                    <td className="px-6 py-4 text-gray-600">{order.user?.email}</td>
                                    <td className="px-6 py-4 font-semibold text-gray-900">
                                        ₹{order.totalPrice?.toLocaleString('en-IN')}
                                    </td>
                                    <td className="px-6 py-4 text-gray-500 text-xs">
                                        {new Date(order.createdAt).toLocaleDateString('en-IN')}
                                    </td>
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
                                            {statusOptions.map((s) => (
                                                <option key={s} value={s}>{s}</option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredOrders.length === 0 && (
                        <p className="text-center text-gray-400 py-12 text-sm">No orders found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminOrders;