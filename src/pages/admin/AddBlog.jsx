import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBlog } from '../../api/blogApi';

const AddBlog = () => {
    const [form, setForm] = useState({
        title: '', slug: '', content: '', coverImage: '',
        author: 'Hrushikesh Kontham', category: '', readTime: '', status: 'DRAFT'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const generateSlug = () => {
        const slug = form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        setForm({ ...form, slug });
    };

    const handleSubmit = async (status) => {
        setLoading(true);
        setError('');
        try {
            await createBlog({ ...form, status, readTime: parseInt(form.readTime) || 3 });
            navigate('/admin/blogs');
        } catch (err) {
            setError('Failed to save blog post');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-black text-white py-10 px-8">
                <div className="max-w-4xl mx-auto">
                    <p className="text-xs tracking-widest text-gray-400 uppercase mb-1">Admin Panel</p>
                    <h1 className="text-3xl font-black tracking-tight">New Blog Post</h1>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-8 py-8 space-y-6">
                {error && (
                    <div className="bg-red-50 text-red-500 text-sm px-4 py-3 rounded-xl">{error}</div>
                )}

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
                    {/* Title */}
                    <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest block mb-2">Title</label>
                        <input
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            onBlur={generateSlug}
                            placeholder="New Balance 550: Why This Shoe Changed Everything For Me"
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                        />
                    </div>

                    {/* Slug */}
                    <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest block mb-2">Slug</label>
                        <div className="flex gap-2">
                            <input
                                name="slug"
                                value={form.slug}
                                onChange={handleChange}
                                placeholder="new-balance-550-review"
                                className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                            />
                            <button
                                onClick={generateSlug}
                                className="px-4 py-3 border border-gray-200 rounded-xl text-xs font-semibold hover:border-black transition-colors">
                                Auto
                            </button>
                        </div>
                    </div>

                    {/* Cover Image */}
                    <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest block mb-2">Cover Image URL</label>
                        <input
                            name="coverImage"
                            value={form.coverImage}
                            onChange={handleChange}
                            placeholder="https://..."
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                        />
                    </div>

                    {/* Category + Read Time */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest block mb-2">Category</label>
                            <select
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors">
                                <option value="">Select category</option>
                                <option value="Sneaker Reviews">Sneaker Reviews</option>
                                <option value="Brand Stories">Brand Stories</option>
                                <option value="Buying Guides">Buying Guides</option>
                                <option value="Sneaker Care">Sneaker Care</option>
                                <option value="Style Tips">Style Tips</option>
                                <option value="News">News</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest block mb-2">Read Time (mins)</label>
                            <input
                                name="readTime"
                                type="number"
                                value={form.readTime}
                                onChange={handleChange}
                                placeholder="5"
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                            />
                        </div>
                    </div>

                    {/* Author */}
                    <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest block mb-2">Author</label>
                        <input
                            name="author"
                            value={form.author}
                            onChange={handleChange}
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                        />
                    </div>

                    {/* Content */}
                    <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest block mb-2">Content</label>
                        <textarea
                            name="content"
                            value={form.content}
                            onChange={handleChange}
                            placeholder="Write your blog post here..."
                            rows={16}
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors resize-none font-mono"
                        />
                        <p className="text-xs text-gray-400 mt-1">Use blank lines to separate paragraphs.</p>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                    <button
                        onClick={() => handleSubmit('DRAFT')}
                        disabled={loading}
                        className="px-6 py-3 border border-gray-200 rounded-xl text-sm font-semibold hover:border-black transition-colors disabled:opacity-50">
                        Save Draft
                    </button>
                    <button
                        onClick={() => handleSubmit('PUBLISHED')}
                        disabled={loading}
                        className="flex-1 bg-black text-white py-3 rounded-xl font-semibold tracking-wide hover:bg-gray-800 transition-colors disabled:opacity-50">
                        {loading ? 'Publishing...' : 'Publish'}
                    </button>
                    <button
                        onClick={() => navigate('/admin/blogs')}
                        className="px-6 py-3 border border-gray-200 rounded-xl text-sm font-medium hover:border-black transition-colors">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddBlog;