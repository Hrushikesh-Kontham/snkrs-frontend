import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBlogBySlug } from '../api/blogApi';

const BlogDetail = () => {
    const { slug } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await getBlogBySlug(slug);
                setBlog(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [slug]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
        </div>
    );

    if (!blog) return (
        <div className="min-h-screen flex items-center justify-center">
            <p className="text-gray-400">Blog not found.</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Cover Image */}
            {blog.coverImage && (
                <div className="w-full h-96 overflow-hidden">
                    <img
                        src={blog.coverImage}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                        onError={(e) => e.target.src = 'https://placehold.co/1200x400?text=SNKRS'}
                    />
                </div>
            )}

            <div className="max-w-3xl mx-auto px-8 py-12">
                {/* Category */}
                {blog.category && (
                    <Link to="/blogs" className="text-xs font-semibold text-gray-400 uppercase tracking-widest hover:text-black transition-colors">
                        ← {blog.category}
                    </Link>
                )}

                {/* Title */}
                <h1 className="text-4xl font-black text-gray-900 leading-tight mt-4 mb-6">
                    {blog.title}
                </h1>

                {/* Meta */}
                <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-100">
                    <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-black">
                        {blog.author?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <p className="font-semibold text-gray-900 text-sm">{blog.author}</p>
                        <div className="flex items-center gap-3 text-xs text-gray-400 mt-0.5">
                            <span>{new Date(blog.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                            {blog.readTime && <span>·</span>}
                            {blog.readTime && <span>{blog.readTime} min read</span>}
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="prose prose-gray max-w-none">
                    {blog.content?.split('\n').map((para, i) => (
                        para.trim() ? (
                            <p key={i} className="text-gray-700 text-base leading-relaxed mb-4">
                                {para}
                            </p>
                        ) : <br key={i} />
                    ))}
                </div>

                {/* Back */}
                <div className="mt-12 pt-8 border-t border-gray-100">
                    <Link to="/blogs" className="text-sm font-semibold text-gray-900 hover:underline">
                        ← Back to Blogs
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;