import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

const SneakerCard = ({ sneaker }) => {
    const { addItem } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleAddToCart = async (e) => {
        e.preventDefault();
        navigate(`/sneakers/${sneaker.id}`);
    };

    return (
        <Link
            to={`/sneakers/${sneaker.id}`}
            className="group block h-full"
        >
            <div className="h-full bg-white border border-gray-100 rounded-xl md:rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">

                {/* Image */}
                <div className="relative bg-gray-50 h-40 sm:h-48 md:h-56 overflow-hidden">
                    <img
                        src={sneaker.imageUrl}
                        alt={sneaker.name}
                        className="w-full h-full object-contain p-3 md:p-4 group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                            e.target.src = "https://placehold.co/400";
                        }}
                    />

                    {sneaker.stock === 0 && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <span className="text-white text-xs font-semibold uppercase tracking-wider">
                                Sold Out
                            </span>
                        </div>
                    )}

                    <div className="absolute top-2 left-2 max-w-[75%]">
                        <span className="bg-black text-white text-[10px] sm:text-xs px-2 py-1 rounded-full uppercase truncate block">
                            {sneaker.brand}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-3 md:p-4">

                    <p className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-400 mb-1">
                        {sneaker.category}
                    </p>

                    <h3 className="font-semibold text-gray-900 text-sm md:text-base leading-tight line-clamp-2 flex-1">
                        {sneaker.name}
                    </h3>

                    {/* Desktop */}
                    <div className="hidden sm:flex items-center justify-between gap-2 mt-4">
                        <span className="text-lg md:text-xl font-bold text-gray-900 whitespace-nowrap">
                            ₹{sneaker.price.toLocaleString("en-IN")}
                        </span>

                        {sneaker.stock > 0 && (
                            <button
                                onClick={handleAddToCart}
                                className="bg-black text-white text-xs md:text-sm px-4 py-2 rounded-xl hover:bg-gray-800 transition whitespace-nowrap"
                            >
                                + Cart
                            </button>
                        )}
                    </div>

                    {/* Mobile */}
                    <div className="sm:hidden mt-3">
                        <span className="block text-xl font-bold text-gray-900 mb-2">
                            ₹{sneaker.price.toLocaleString("en-IN")}
                        </span>

                        {sneaker.stock > 0 && (
                            <button
                                onClick={handleAddToCart}
                                className="w-full bg-black text-white py-2 rounded-xl text-sm font-medium hover:bg-gray-800 transition"
                            >
                                Add to Cart
                            </button>
                        )}
                    </div>

                </div>
            </div>
        </Link>
    );
};

export default SneakerCard;