import { useState, useEffect } from 'react';
import { getWishlist, removeFromWishlist } from '../api/wishlistApi';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addItem } = useCart();

    useEffect(() => {
        fetchWishlist();
    }, []);

    const fetchWishlist = async () => {
        try {
            const res = await getWishlist();
            setWishlist(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleRemove = async (sneakerId) => {
        await removeFromWishlist(sneakerId);
        setWishlist(wishlist.filter((w) => w.sneaker.id !== sneakerId));
    };

    const handleMoveToCart = async (sneakerId) => {
        await addItem(sneakerId, 1);
        await handleRemove(sneakerId);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-black text-white py-10 px-8">
                <div className="max-w-5xl mx-auto">
                    <p className="text-xs tracking-widest text-gray-400 uppercase mb-1">Your</p>
                    <h1 className="text-3xl font-black tracking-tight">Wishlist</h1>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-8 py-8">
                {loading ? (
                    <div className="flex justify-center py-24">
                        <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : wishlist.length === 0 ? (
                    <div className="text-center py-24">
                        <p className="text-6xl mb-4">♡</p>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Your wishlist is empty</h3>
                        <p className="text-gray-400 text-sm mb-6">Save sneakers you love for later.</p>
                        <Link
                            to="/sneakers"
                            className="bg-black text-white px-8 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors">
                            Browse Sneakers
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {wishlist.map((item) => (
                            <div key={item.id}
                                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                                <Link to={`/sneakers/${item.sneaker.id}`}>
                                    <div className="bg-gray-50 h-48 flex items-center justify-center p-4">
                                        <img
                                            src={item.sneaker.imageUrl}
                                            alt={item.sneaker.name}
                                            className="h-full object-contain"
                                            onError={(e) => e.target.src = 'https://placehold.co'}
                                        />
                                    </div>
                                </Link>
                                <div className="p-4">
                                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">
                                        {item.sneaker.brand}
                                    </p>
                                    <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-1">
                                        {item.sneaker.name}
                                    </h3>
                                    <p className="font-bold text-gray-900 mb-4">
                                        ₹{item.sneaker.price.toLocaleString('en-IN')}
                                    </p>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleMoveToCart(item.sneaker.id)}
                                            className="flex-1 bg-black text-white py-2 rounded-xl text-xs font-semibold hover:bg-gray-800 transition-colors">
                                            Move to Cart
                                        </button>
                                        <button
                                            onClick={() => handleRemove(item.sneaker.id)}
                                            className="px-3 py-2 border border-gray-200 rounded-xl hover:border-red-300 hover:text-red-500 transition-colors text-gray-400">
                                            ✕
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Wishlist;