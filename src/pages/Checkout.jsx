import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../api/orderApi';
import { useCart } from '../context/CartContext';

const Checkout = () => {
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { cartItems, clearCart } = useCart();
    const navigate = useNavigate();

    const total = cartItems.reduce(
        (acc, item) => acc + item.sneaker.price * item.quantity, 0
    );

    const handlePlaceOrder = async () => {
        if (!address.trim()) {
            setError('Please enter a delivery address');
            return;
        }
        setLoading(true);
        setError('');
        try {
            const res = await createOrder({ address });
            clearCart();
            navigate(`/orders/${res.data.id}`);
        } catch (err) {
            setError('Failed to place order. Try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-black text-white py-10 px-8">
                <div className="max-w-5xl mx-auto">
                    <p className="text-xs tracking-widest text-gray-400 uppercase mb-1">Almost there</p>
                    <h1 className="text-3xl font-black tracking-tight">Checkout</h1>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Address Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                            <h2 className="font-bold text-gray-900 text-lg mb-6">Delivery Address</h2>

                            {error && (
                                <div className="bg-red-50 text-red-500 text-sm px-4 py-3 rounded-xl mb-6">
                                    {error}
                                </div>
                            )}

                            <textarea
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="Enter your full delivery address..."
                                rows={5}
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors resize-none"
                            />

                            <p className="text-xs text-gray-400 mt-2">
                                Include flat/house number, street, city, state, and pincode.
                            </p>
                        </div>
                    </div>

                    {/* Order Summary */}
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
                            onClick={handlePlaceOrder}
                            disabled={loading}
                            className="w-full bg-black text-white py-3 rounded-xl font-semibold tracking-wide hover:bg-gray-800 transition-colors disabled:opacity-50">
                            {loading ? 'Placing Order...' : 'Place Order'}
                        </button>

                        <p className="text-xs text-gray-400 text-center mt-4">
                            This is a mock checkout. No real payment is processed.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;