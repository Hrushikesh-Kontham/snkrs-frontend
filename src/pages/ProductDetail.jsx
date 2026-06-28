import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSneakerById } from '../api/sneakerApi';
import { addToWishlist } from '../api/wishlistApi';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const ProductDetail = () => {
    const { id } = useParams();
    const [sneaker, setSneaker] = useState(null);
    const [loading, setLoading] = useState(true);
    const [addedToCart, setAddedToCart] = useState(false);
    const [wishlistMsg, setWishlistMsg] = useState('');
    const { addItem } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await getSneakerById(id);
                setSneaker(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [id]);

    const handleAddToCart = async () => {
        if (!user) return navigate('/login');
        await addItem(sneaker.id, 1);
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
    };

    const handleAddToWishlist = async () => {
        if (!user) return navigate('/login');
        try {
            await addToWishlist({ sneakerId: sneaker.id });
            setWishlistMsg('Added to wishlist');
        } catch {
            setWishlistMsg('Already in wishlist');
        }
        setTimeout(() => setWishlistMsg(''), 2000);
    };

    if (loading) return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
        </div>
    );

    if (!sneaker) return (
        <div className="min-h-screen flex items-center justify-center">
            <p className="text-gray-400">Sneaker not found.</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-6xl mx-auto px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Image */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex items-center justify-center">
                        <img
                            src={sneaker.imageUrl}
                            alt={sneaker.name}
                            className="w-full max-h-96 object-contain"
                            onError={(e) => e.target.src = 'https://placehold.co/400?text=No+Image'}
                        />
                    </div>

                    {/* Info */}
                    <div className="flex flex-col justify-center">
                        <span className="text-xs text-gray-400 uppercase tracking-widest mb-2">
                            {sneaker.brand} · {sneaker.category}
                        </span>
                        <h1 className="text-3xl font-black text-gray-900 leading-tight mb-4">
                            {sneaker.name}
                        </h1>
                        <p className="text-3xl font-bold text-black mb-6">
                            ₹{sneaker.price.toLocaleString('en-IN')}
                        </p>
                        <p className="text-gray-500 text-sm leading-relaxed mb-8">
                            {sneaker.description}
                        </p>

                        {/* Stock */}
                        <div className="mb-8">
                            {sneaker.stock > 0 ? (
                                <span className="text-green-600 text-xs font-semibold uppercase tracking-widest bg-green-50 px-3 py-1 rounded-full">
                                    In Stock ({sneaker.stock} left)
                                </span>
                            ) : (
                                <span className="text-red-500 text-xs font-semibold uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full">
                                    Sold Out
                                </span>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                            <button
                                onClick={handleAddToCart}
                                disabled={sneaker.stock === 0}
                                className="flex-1 bg-black text-white py-4 rounded-2xl font-semibold tracking-wide hover:bg-gray-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                                {addedToCart ? '✓ Added to Cart' : 'Add to Cart'}
                            </button>
                            <button
                                onClick={handleAddToWishlist}
                                className="px-5 py-4 border-2 border-gray-200 rounded-2xl hover:border-black transition-colors text-xl">
                                ♡
                            </button>
                        </div>

                        {wishlistMsg && (
                            <p className="text-sm text-gray-500 mt-3 text-center">{wishlistMsg}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;