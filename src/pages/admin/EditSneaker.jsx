import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getSneakerById, updateSneaker } from '../../api/sneakerApi';

const EditSneaker = () => {
    const { id } = useParams();
    const [form, setForm] = useState({
        name: '', brand: '', price: '', description: '',
        category: '', imageUrl: '', stock: '', sizes: ''
    });
    const [imageUrls, setImageUrls] = useState(['']);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await getSneakerById(id);
                setForm(res.data);
                if (res.data.images && res.data.images.length > 0) {
                    setImageUrls(res.data.images.map(img => img.imageUrl));
                }
            } catch (err) {
                console.error(err);
            } finally {
                setFetching(false);
            }
        };
        fetch();
    }, [id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleImageUrlChange = (index, value) => {
        const updated = [...imageUrls];
        updated[index] = value;
        setImageUrls(updated);
    };

    const addImageField = () => setImageUrls([...imageUrls, '']);

    const removeImageField = (index) => {
        setImageUrls(imageUrls.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await updateSneaker(id, {
                ...form,
                price: parseFloat(form.price),
                stock: parseInt(form.stock),
                imageUrls: imageUrls.filter(url => url.trim() !== '')
            });
            navigate('/admin');
        } catch (err) {
            setError('Failed to update sneaker');
        } finally {
            setLoading(false);
        }
    };

    const fields = [
        { name: 'name', label: 'Sneaker Name', type: 'text' },
        { name: 'brand', label: 'Brand', type: 'text' },
        { name: 'price', label: 'Price (₹)', type: 'number' },
        { name: 'category', label: 'Category', type: 'text' },
        { name: 'stock', label: 'Stock', type: 'number' },
        { name: 'imageUrl', label: 'Primary Image URL', type: 'text' },
    ];

    if (fetching) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-black text-white py-10 px-8">
                <div className="max-w-3xl mx-auto">
                    <p className="text-xs tracking-widest text-gray-400 uppercase mb-1">Admin Panel</p>
                    <h1 className="text-3xl font-black tracking-tight">Edit Sneaker</h1>
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
                                    value={form[field.name] || ''}
                                    onChange={handleChange}
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                                />
                            </div>
                        ))}

                        {/* Sizes */}
                        <div className="md:col-span-2">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest block mb-2">
                                Available Sizes (UK — comma separated)
                            </label>
                            <input
                                type="text"
                                name="sizes"
                                value={form.sizes || ''}
                                onChange={handleChange}
                                placeholder="6,7,8,9,10,11,12"
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                            />
                            <p className="text-xs text-gray-400 mt-1">e.g. 6,7,8,9,10,11,12</p>
                        </div>

                        <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest block mb-2">
                            Gender
                        </label>
                        <select
                            name="gender"
                            value={form.gender || ''}
                            onChange={handleChange}
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors">
                            <option value="">Select Gender</option>
                            <option value="Unisex">Unisex</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>

                        {/* Description */}
                        <div className="md:col-span-2">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest block mb-2">
                                Description
                            </label>
                            <textarea
                                name="description"
                                value={form.description || ''}
                                onChange={handleChange}
                                rows={4}
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors resize-none"
                            />
                        </div>

                        {/* Multiple Images */}
                        <div className="md:col-span-2">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest block mb-2">
                                Additional Images
                            </label>
                            <div className="space-y-3">
                                {imageUrls.map((url, index) => (
                                    <div key={index} className="flex gap-2">
                                        <input
                                            type="text"
                                            value={url}
                                            onChange={(e) => handleImageUrlChange(index, e.target.value)}
                                            placeholder={`Image URL ${index + 1}`}
                                            className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                                        />
                                        {imageUrls.length > 1 && (
                                            <button
                                                onClick={() => removeImageField(index)}
                                                className="px-3 py-3 text-red-400 hover:text-red-600 border border-gray-200 rounded-xl hover:border-red-300 transition-colors">
                                                ✕
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    onClick={addImageField}
                                    className="text-xs font-semibold text-gray-500 hover:text-black transition-colors border border-dashed border-gray-300 rounded-xl px-4 py-2.5 w-full hover:border-black">
                                    + Add Another Image
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3 mt-8">
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="flex-1 bg-black text-white py-3 rounded-xl font-semibold tracking-wide hover:bg-gray-800 transition-colors disabled:opacity-50">
                            {loading ? 'Updating...' : 'Update Sneaker'}
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

export default EditSneaker;