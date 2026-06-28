import { useCart } from '../../context/CartContext';

const CartItem = ({ item }) => {
    const { removeItem } = useCart();

    return (
        <div className="flex items-center gap-4 bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
            {/* Image */}
            <div className="bg-gray-50 rounded-xl w-24 h-24 flex-shrink-0 overflow-hidden">
                <img
                    src={item.sneaker.imageUrl}
                    alt={item.sneaker.name}
                    className="w-full h-full object-contain p-2"
                    onError={(e) => e.target.src = 'https://placehold.co'}
                />
            </div>

            {/* Details */}
            <div className="flex-1 min-w-0">
                <span className="text-xs text-gray-400 uppercase tracking-widest">
                    {item.sneaker.brand}
                </span>
                <h3 className="font-semibold text-gray-900 text-sm mt-0.5 truncate">
                    {item.sneaker.name}
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                    Qty: <span className="font-medium text-gray-700">{item.quantity}</span>
                </p>
                <p className="text-sm font-bold text-gray-900 mt-1">
                    ₹{(item.sneaker.price * item.quantity).toLocaleString('en-IN')}
                </p>
            </div>

            {/* Remove */}
            <button
                onClick={() => removeItem(item.sneaker.id)}
                className="text-gray-300 hover:text-red-500 transition-colors p-2 rounded-xl hover:bg-red-50 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </button>
        </div>
    );
};

export default CartItem;