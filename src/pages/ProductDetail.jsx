import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSneakerById } from '../api/sneakerApi';
import { addToWishlist } from '../api/wishlistApi';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const ProductDetail = () => {
    const { id } = useParams();
    const [sneaker, setSneaker] = useState(null);
    const [loading, setLoading] = useState(true);
    const [addedToCart, setAddedToCart] = useState(false);
    const [wishlistMsg, setWishlistMsg] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [sizeError, setSizeError] = useState(false);
    const { addItem } = useCart();
    const { user } = useAuth();
    const { showToast } = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await getSneakerById(id);
                setSneaker(res.data);
                setSelectedImage(res.data.imageUrl);
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
        if (!selectedSize) {
            setSizeError(true);
            setTimeout(() => setSizeError(false), 2000);
            return;
        }
        await addItem(sneaker.id, 1, selectedSize);
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
    };

    const handleAddToWishlist = async () => {
        if (!user) return navigate('/login');
        try {
            await addToWishlist({ sneakerId: sneaker.id });
            showToast('Added to wishlist');
        } catch {
            showToast('Already in wishlist', 'error');
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

    const allImages = [
        sneaker.imageUrl,
        ...(sneaker.images?.map(img => img.imageUrl) || [])
    ].filter(Boolean);

    const sizes = sneaker.sizes
        ? sneaker.sizes.split(',').map(s => s.trim()).filter(Boolean)
        : [];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-6xl mx-auto px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Image Gallery */}
                    <div className="space-y-4">
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex items-center justify-center h-96">
                            <img
                                src={selectedImage || sneaker.imageUrl}
                                alt={sneaker.name}
                                className="w-full h-full object-contain"
                                onError={(e) => e.target.src = 'https://placehold.co/400?text=No+Image'}
                            />
                        </div>
                        {allImages.length > 1 && (
                            <div className="flex gap-3 overflow-x-auto pb-1">
                                {allImages.map((url, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(url)}
                                        className={`flex-shrink-0 w-20 h-20 rounded-xl border-2 overflow-hidden bg-white transition-all
                                            ${selectedImage === url ? 'border-black' : 'border-gray-100 hover:border-gray-300'}`}>
                                        <img
                                            src={url}
                                            alt={`${sneaker.name} ${index + 1}`}
                                            className="w-full h-full object-contain p-1"
                                            onError={(e) => e.target.src = 'https://placehold.co/80?text=No'}
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Info */}
                    <div className="flex flex-col justify-center">
                        <span className="text-xs text-gray-400 uppercase tracking-widest mb-2">
                            {sneaker.brand} · {sneaker.category}
                        </span>
                        <h1 className="text-3xl font-black text-gray-900 leading-tight mb-4">
                            {sneaker.name}
                        </h1>
                        <p className="text-3xl font-bold text-black mb-4">
                            ₹{sneaker.price.toLocaleString('en-IN')}
                        </p>
                        <p className="text-gray-500 text-sm leading-relaxed mb-6">
                            {sneaker.description}
                        </p>

                        {/* Stock */}
                        <div className="mb-6">
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

                        {/* Size Selection */}
                        {sizes.length > 0 && (
                            <div className="mb-6">
                                <div className="flex items-center justify-between mb-3">
                                    <p className={`text-xs font-semibold uppercase tracking-widest ${sizeError ? 'text-red-500' : 'text-gray-700'}`}>
                                        {sizeError ? '⚠ Please select a size' : `Select Size (UK) ${selectedSize ? `— ${selectedSize}` : ''}`}
                                    </p>
                                </div>
                                <div className="grid grid-cols-5 gap-2">
                                    {sizes.map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => {
                                                setSelectedSize(size);
                                                setSizeError(false);
                                            }}
                                            className={`py-3 rounded-xl text-sm font-semibold border-2 transition-all
                                                ${selectedSize === size
                                                    ? 'border-black bg-black text-white'
                                                    : 'border-gray-200 bg-white text-gray-700 hover:border-black'}`}>
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Size Chart */}
                        {sizes.length > 0 && (
                            <details className="mb-6 border border-gray-100 rounded-xl overflow-hidden">
                                <summary className="px-4 py-3 text-xs font-semibold uppercase tracking-widest text-gray-500 cursor-pointer hover:bg-gray-50 transition-colors">
                                    Size Guide
                                </summary>
                                <div className="p-4">
                                    <table className="w-full text-xs text-center">
                                        <thead>
                                            <tr className="border-b border-gray-100">
                                                <th className="py-2 text-gray-400 font-semibold uppercase tracking-wide">UK</th>
                                                <th className="py-2 text-gray-400 font-semibold uppercase tracking-wide">US</th>
                                                <th className="py-2 text-gray-400 font-semibold uppercase tracking-wide">EU</th>
                                                <th className="py-2 text-gray-400 font-semibold uppercase tracking-wide">CM</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {[
                                                { uk: '6', us: '7', eu: '39', cm: '24.5' },
                                                { uk: '7', us: '8', eu: '40.5', cm: '25.5' },
                                                { uk: '8', us: '9', eu: '42', cm: '26.5' },
                                                { uk: '9', us: '10', eu: '43', cm: '27.5' },
                                                { uk: '10', us: '11', eu: '44.5', cm: '28.5' },
                                                { uk: '11', us: '12', eu: '46', cm: '29.5' },
                                                { uk: '12', us: '13', eu: '47', cm: '30.5' },
                                            ].map(row => (
                                                <tr key={row.uk} className={`border-b border-gray-50 ${selectedSize === row.uk ? 'bg-gray-50 font-bold' : ''}`}>
                                                    <td className="py-2">{row.uk}</td>
                                                    <td className="py-2">{row.us}</td>
                                                    <td className="py-2">{row.eu}</td>
                                                    <td className="py-2">{row.cm}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </details>
                        )}

                        {/* Actions */}
                        <div className="flex gap-3">
                            <button
                                onClick={handleAddToCart}
                                disabled={sneaker.stock === 0}
                                className={`flex-1 py-4 rounded-2xl font-semibold tracking-wide transition-colors disabled:opacity-40 disabled:cursor-not-allowed
                                    ${sizeError
                                        ? 'bg-red-500 text-white'
                                        : 'bg-black text-white hover:bg-gray-800'}`}>
                                {sneaker.stock === 0 ? 'Sold Out' : addedToCart ? '✓ Added to Cart' : 'Add to Cart'}
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