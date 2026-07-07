import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getBlogBySlug, updateBlog, getAllBlogsAdmin } from '../../api/blogApi';

const EditBlog = () => {
    const { id } = useParams();
    const [form, setForm] = useState({
        title: '', slug: '', content: '', coverImage: '',
        author: '', category: '', readTime: '', status: 'DRAFT'
    });
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await getAllBlogsAdmin();
                const blog = res.data.find(b => b.id === parseInt(id));
                if (blog) setForm(blog);
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

    const generateSlug = () => {
        const slug = form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        setForm({ ...form, slug });
    };

    const handleSubmit = async (status) => {
        setLoading(true);
        setError('');
        try {
            await updateBlog(id, { ...form, status, readTime: parseInt(form.readTime) || 3 });
            navigate('/admin/blogs');
        } catch (err) {
            setError('Failed to update blog post');
        } finally {
            setLoading(false);
        }
    };

    if (fetching) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-black text-white py-10 px-8">
                <div className="max-w-4xl mx-auto">
                    <p className="text-xs tracking-widest text-gray-400 uppercase mb-1">Admin Panel</p>
                    <h1 className="text-3xl font-black tracking-tight">Edit Blog Post</h1>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-8 py-8 space-y-6">
                {error && (
                    <div className="bg-red-50 text-red-500 text-sm px-4 py-3 rounded-xl">{error}</div>
                )}

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
                    <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest block mb-2">Title</label>
                        <input name="title" value={form.title} onChange={handleChange} onBlur={generateSlug}
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors" />
                    </div>

                    <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest block mb-2">Slug</label>
                        <div className="flex gap-2">
                            <input name="slug" value={form.slug} onChange={handleChange}
                                className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors" />
                            <button onClick={generateSlug}
                                className="px-4 py-3 border border-gray-200 rounded-xl text-xs font-semibold hover:border-black transition-colors">
                                Auto
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest block mb-2">Cover Image URL</label>
                        <input name="coverImage" value={form.coverImage || ''} onChange={handleChange}
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest block mb-2">Category</label>
                            <select name="category" value={form.category} onChange={handleChange}
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
                            <input name="readTime" type="number" value={form.readTime || ''} onChange={handleChange}
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors" />
                        </div>
                    </div>

                    <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest block mb-2">Author</label>
                        <input name="author" value={form.author} onChange={handleChange}
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors" />
                    </div>

                    <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest block mb-2">Content</label>
                        <textarea name="content" value={form.content} onChange={handleChange} rows={16}
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors resize-none font-mono" />
                        <p className="text-xs text-gray-400 mt-1">Use blank lines to separate paragraphs.</p>
                    </div>
                </div>

                <div className="flex gap-3">
                    <button onClick={() => handleSubmit('DRAFT')} disabled={loading}
                        className="px-6 py-3 border border-gray-200 rounded-xl text-sm font-semibold hover:border-black transition-colors disabled:opacity-50">
                        Save Draft
                    </button>
                    <button onClick={() => handleSubmit('PUBLISHED')} disabled={loading}
                        className="flex-1 bg-black text-white py-3 rounded-xl font-semibold tracking-wide hover:bg-gray-800 transition-colors disabled:opacity-50">
                        {loading ? 'Saving...' : 'Publish'}
                    </button>
                    <button onClick={() => navigate('/admin/blogs')}
                        className="px-6 py-3 border border-gray-200 rounded-xl text-sm font-medium hover:border-black transition-colors">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditBlog;