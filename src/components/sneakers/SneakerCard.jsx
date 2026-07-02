import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const SneakerCard = ({ sneaker }) => {
    const { addItem } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleAddToCart = async (e) => {
        e.preventDefault();
            navigate(`/sneakers/${sneaker.id}`);
    };

    return (
        <Link to={`/sneakers/${sneaker.id}`} className="group block">
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                {/* Image */}
                <div className="relative bg-gray-50 h-56 overflow-hidden">
                    <img
                        src={sneaker.imageUrl}
                        alt={sneaker.name}
                        className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => e.target.src = 'https://placehold.co'}
                    />
                    {sneaker.stock === 0 && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <span className="text-white font-bold text-sm tracking-widest uppercase">
                                Sold Out
                            </span>
                        </div>
                    )}
                    <div className="absolute top-3 left-3">
                        <span className="bg-black text-white text-xs px-2 py-1 rounded-full tracking-wider uppercase">
                            {sneaker.brand}
                        </span>
                    </div>
                </div>

                {/* Info */}
                <div className="p-4">
                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">
                        {sneaker.category}
                    </p>
                    <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-3 line-clamp-2">
                        {sneaker.name}
                    </h3>
                    <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-gray-900">
                            ₹{sneaker.price.toLocaleString('en-IN')}
                        </span>
                        {sneaker.stock > 0 && (
                            <button
                                onClick={handleAddToCart}
                                className="bg-black text-white text-xs px-3 py-2 rounded-xl hover:bg-gray-800 transition-colors font-medium tracking-wide">
                                + Cart
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default SneakerCard;