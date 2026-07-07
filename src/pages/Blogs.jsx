import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllBlogs } from '../api/blogApi';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await getAllBlogs();
                setBlogs(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, []);

    const categories = ['All', ...new Set(blogs.map(b => b.category).filter(Boolean))];
    const filtered = selectedCategory === 'All' ? blogs : blogs.filter(b => b.category === selectedCategory);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-black text-white py-12 px-8">
                <div className="max-w-7xl mx-auto">
                    <p className="text-xs tracking-widest text-gray-400 uppercase mb-2">Editorial</p>
                    <h1 className="text-4xl font-black tracking-tight">Blogs</h1>
                    <p className="text-gray-400 mt-2 text-sm">{blogs.length} articles</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-8 py-8">
                {/* Category Filter */}
                <div className="flex gap-2 flex-wrap mb-8">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide uppercase transition-all border
                                ${selectedCategory === cat
                                    ? 'bg-black text-white border-black'
                                    : 'bg-white text-gray-600 border-gray-200 hover:border-black'}`}>
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Blog Grid */}
                {filtered.length === 0 ? (
                    <div className="text-center py-24">
                        <p className="text-gray-400 text-lg">No articles yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filtered.map(blog => (
                            <Link key={blog.id} to={`/blogs/${blog.slug}`}
                                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
                                {/* Cover Image */}
                                <div className="h-52 overflow-hidden bg-gray-100">
                                    {blog.coverImage ? (
                                        <img
                                            src={blog.coverImage}
                                            alt={blog.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            onError={(e) => e.target.src = 'https://placehold.co/600x400?text=SNKRS'}
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                                            <span className="text-white font-black text-2xl tracking-widest">SNKRS</span>
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-5">
                                    {blog.category && (
                                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                                            {blog.category}
                                        </span>
                                    )}
                                    <h2 className="font-black text-gray-900 text-lg mt-1 leading-tight group-hover:underline">
                                        {blog.title}
                                    </h2>
                                    <div className="flex items-center justify-between mt-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-7 h-7 bg-black text-white rounded-full flex items-center justify-center text-xs font-black">
                                                {blog.author?.charAt(0).toUpperCase()}
                                            </div>
                                            <span className="text-xs text-gray-500">{blog.author}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-xs text-gray-400">
                                            <span>{new Date(blog.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                            {blog.readTime && <span>{blog.readTime} min read</span>}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Blogs;