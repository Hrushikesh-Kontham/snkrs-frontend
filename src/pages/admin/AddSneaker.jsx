import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addSneaker } from '../../api/sneakerApi';

const AddSneaker = () => {
    const [form, setForm] = useState({
        name: '', brand: '', price: '', description: '',
        category: '', imageUrl: '', stock: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await addSneaker({
                ...form,
                price: parseFloat(form.price),
                stock: parseInt(form.stock)
            });
            navigate('/admin');
        } catch (err) {
            setError('Failed to add sneaker');
        } finally {
            setLoading(false);
        }
    };

    const fields = [
        { name: 'name', label: 'Sneaker Name', placeholder: 'Air Jordan 1 Retro High OG', type: 'text' },
        { name: 'brand', label: 'Brand', placeholder: 'Nike', type: 'text' },
        { name: 'price', label: 'Price (₹)', placeholder: '12999', type: 'number' },
        { name: 'category', label: 'Category', placeholder: 'Basketball', type: 'text' },
        { name: 'stock', label: 'Stock', placeholder: '10', type: 'number' },
        { name: 'imageUrl', label: 'Image URL', placeholder: 'https://...', type: 'text' },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-black text-white py-10 px-8">
                <div className="max-w-3xl mx-auto">
                    <p className="text-xs tracking-widest text-gray-400 uppercase mb-1">Admin Panel</p>
                    <h1 className="text-3xl font-black tracking-tight">Add New Sneaker</h1>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-8 py-8">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                    {error && (
                        <div className="bg-red-50 text-red-500 text-sm px-4 py-3 rounded-xl mb-6">
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {fields.map((field) => (
                            <div key={field.name}>
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest block mb-2">
                                    {field.label}
                                </label>
                                <input
                                    type={field.type}
                                    name={field.name}
                                    value={form[field.name]}
                                    onChange={handleChange}
                                    placeholder={field.placeholder}
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                                />
                            </div>
                        ))}

                        <div className="md:col-span-2">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest block mb-2">
                                Description
                            </label>
                            <textarea
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                placeholder="Describe the sneaker..."
                                rows={4}
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors resize-none"
                            />
                        </div>
                    </div>

                    <div className="flex gap-3 mt-8">
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="flex-1 bg-black text-white py-3 rounded-xl font-semibold tracking-wide hover:bg-gray-800 transition-colors disabled:opacity-50">
                            {loading ? 'Adding...' : 'Add Sneaker'}
                        </button>
                        <button
                            onClick={() => navigate('/admin')}
                            className="px-6 py-3 border border-gray-200 rounded-xl text-sm font-medium hover:border-black transition-colors">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddSneaker;