import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

const SneakerCard = ({ sneaker }) => {
    const { addItem } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleAddToCart = (e) => {
        e.preventDefault();
        navigate(`/sneakers/${sneaker.id}`);
    };

    return (
        <Link
            to={`/sneakers/${sneaker.id}`}
            className="group block h-full"
        >
            <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

                {/* Image */}
                <div className="relative aspect-square bg-gray-50 overflow-hidden">

                    <img
                        src={sneaker.imageUrl}
                        alt={sneaker.name}
                        className="w-full h-full object-contain p-5 transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                            e.target.src = "https://placehold.co/600";
                        }}
                    />

                    {/* Brand */}
                    <div className="absolute top-3 left-3">
                        <span className="rounded-full bg-black px-3 py-1 text-[10px] sm:text-xs font-medium uppercase tracking-wider text-white">
                            {sneaker.brand}
                        </span>
                    </div>

                    {/* Sold Out */}
                    {sneaker.stock === 0 && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                            <span className="rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wider text-black">
                                Sold Out
                            </span>
                        </div>
                    )}

                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col justify-between p-4">

                    <div>

                        <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-gray-400">
                            {sneaker.category}
                        </p>

                        <h3 className="line-clamp-2 min-h-[52px] text-base font-semibold leading-6 text-gray-900">
                            {sneaker.name}
                        </h3>

                    </div>

                    <div className="mt-5 flex items-center justify-between gap-3">

                        <p className="text-xl sm:text-2xl font-bold tracking-tight text-black whitespace-nowrap">
                            ₹{sneaker.price.toLocaleString("en-IN")}
                        </p>

                        {sneaker.stock > 0 ? (
                            <button
                                onClick={handleAddToCart}
                                className="rounded-xl bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 whitespace-nowrap"
                            >
                                + Cart
                            </button>
                        ) : (
                            <button
                                disabled
                                className="rounded-xl bg-gray-200 px-4 py-2.5 text-sm font-medium text-gray-500 whitespace-nowrap"
                            >
                                Sold Out
                            </button>
                        )}

                    </div>

                </div>

            </div>
        </Link>
    );
};

export default SneakerCard;