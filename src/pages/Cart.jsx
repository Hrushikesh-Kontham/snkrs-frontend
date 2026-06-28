import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/cart/CartItem';

const Cart = () => {
    const { cartItems } = useCart();
    const navigate = useNavigate();

    const total = cartItems.reduce(
        (acc, item) => acc + item.sneaker.price * item.quantity, 0
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-black text-white py-10 px-8">
                <div className="max-w-5xl mx-auto">
                    <p className="text-xs tracking-widest text-gray-400 uppercase mb-1">Your</p>
                    <h1 className="text-3xl font-black tracking-tight">Cart</h1>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-8 py-8">
                {cartItems.length === 0 ? (
                    <div className="text-center py-24">
                        <p className="text-6xl mb-4">🛒</p>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Your cart is empty</h3>
                        <p className="text-gray-400 text-sm mb-6">Add some sneakers to get started.</p>
                        <Link
                            to="/sneakers"
                            className="bg-black text-white px-8 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors">
                            Shop Now
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {cartItems.map((item) => (
                                <CartItem key={item.id} item={item} />
                            ))}
                        </div>

                        {/* Summary */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 h-fit sticky top-24">
                            <h2 className="font-bold text-gray-900 text-lg mb-6">Order Summary</h2>

                            <div className="space-y-3 mb-6">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex justify-between text-sm">
                                        <span className="text-gray-500 truncate mr-2">
                                            {item.sneaker.name} x{item.quantity}
                                        </span>
                                        <span className="font-medium text-gray-900 flex-shrink-0">
                                            ₹{(item.sneaker.price * item.quantity).toLocaleString('en-IN')}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-gray-100 pt-4 mb-6">
                                <div className="flex justify-between">
                                    <span className="font-bold text-gray-900">Total</span>
                                    <span className="font-bold text-gray-900 text-lg">
                                        ₹{total.toLocaleString('en-IN')}
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={() => navigate('/checkout')}
                                className="w-full bg-black text-white py-3 rounded-xl font-semibold tracking-wide hover:bg-gray-800 transition-colors">
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;