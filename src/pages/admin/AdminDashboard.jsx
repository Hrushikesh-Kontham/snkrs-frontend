import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllSneakers, deleteSneaker } from '../../api/sneakerApi';

const AdminDashboard = () => {
    const [sneakers, setSneakers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSneakers();
    }, []);

    const fetchSneakers = async () => {
        try {
            const res = await getAllSneakers();
            setSneakers(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this sneaker?')) return;
        try {
            await deleteSneaker(id);
            setSneakers(sneakers.filter((s) => s.id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-black text-white py-10 px-8">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div>
                        <p className="text-xs tracking-widest text-gray-400 uppercase mb-1">
                            Admin Panel
                        </p>
                        <h1 className="text-3xl font-black tracking-tight">Manage Sneakers</h1>
                    </div>
                    <Link
                        to="/admin/sneakers/add"
                        className="bg-white text-black px-6 py-3 rounded-xl font-semibold text-sm tracking-wide hover:bg-gray-100 transition-colors">
                        + Add Sneaker
                    </Link>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-8 py-8">
                {loading ? (
                    <div className="flex justify-center py-24">
                        <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-100">
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-widest">
                                        Sneaker
                                    </th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-widest">
                                        Brand
                                    </th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-widest">
                                        Category
                                    </th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-widest">
                                        Price
                                    </th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-widest">
                                        Stock
                                    </th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-widest">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {sneakers.map((sneaker) => (
                                    <tr key={sneaker.id}
                                        className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                                                    <img
                                                        src={sneaker.imageUrl}
                                                        alt={sneaker.name}
                                                        className="w-full h-full object-contain p-1"
                                                        onError={(e) => e.target.src = 'https://placehold.co/50'}
                                                    />
                                                </div>
                                                <span className="font-semibold text-gray-900 text-sm">
                                                    {sneaker.name}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {sneaker.brand}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {sneaker.category}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                                            ₹{sneaker.price.toLocaleString('en-IN')}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap
                                                ${sneaker.stock > 0
                                                    ? 'bg-green-50 text-green-600'
                                                    : 'bg-red-50 text-red-500'}`}>
                                                {sneaker.stock > 0 ? `${sneaker.stock} left` : 'Out of Stock'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <Link
                                                    to={`/admin/sneakers/edit/${sneaker.id}`}
                                                    className="text-xs px-3 py-1.5 border border-gray-200 rounded-lg hover:border-black transition-colors font-medium">
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(sneaker.id)}
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
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;