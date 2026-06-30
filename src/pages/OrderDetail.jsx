import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getOrderById } from '../api/orderApi';

const statusSteps = ['PLACED', 'CONFIRMED', 'SHIPPED', 'DELIVERED'];

const statusStyles = {
    PLACED: 'bg-blue-50 text-blue-600',
    CONFIRMED: 'bg-yellow-50 text-yellow-600',
    SHIPPED: 'bg-purple-50 text-purple-600',
    DELIVERED: 'bg-green-50 text-green-600',
};

const OrderDetail = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await getOrderById(id);
                setOrder(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [id]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
        </div>
    );

    if (!order) return (
        <div className="min-h-screen flex items-center justify-center">
            <p className="text-gray-400">Order not found.</p>
        </div>
    );

    const currentStep = statusSteps.indexOf(order.status);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-black text-white py-10 px-8">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <div>
                        <p className="text-xs tracking-widest text-gray-400 uppercase mb-1">Order</p>
                        <h1 className="text-3xl font-black tracking-tight">#{order.id}</h1>
                    </div>
                    <span className={`text-xs font-semibold px-4 py-2 rounded-full uppercase tracking-wide ${statusStyles[order.status]}`}>
                        {order.status}
                    </span>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-8 py-8 space-y-6">
                {/* Status Stepper */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <h2 className="font-bold text-gray-900 mb-6">Order Tracking</h2>
                    <div className="flex items-center justify-between relative">
                        <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-100 z-0" />
                        <div
                            className="absolute top-4 left-0 h-0.5 bg-black z-0 transition-all duration-500"
                            style={{ width: `${(currentStep / (statusSteps.length - 1)) * 100}%` }}
                        />
                        {statusSteps.map((step, index) => (
                            <div key={step} className="flex flex-col items-center z-10">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all
                                    ${index <= currentStep
                                        ? 'bg-black text-white'
                                        : 'bg-white border-2 border-gray-200 text-gray-300'}`}>
                                    {index < currentStep ? '✓' : index + 1}
                                </div>
                                <span className={`text-xs mt-2 font-medium tracking-wide uppercase
                                    ${index <= currentStep ? 'text-gray-900' : 'text-gray-300'}`}>
                                    {step}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Order Items */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <h2 className="font-bold text-gray-900 mb-4">Items</h2>
                    <div className="space-y-4">
                        {order.orderItems?.map((item) => (
                            <div key={item.id} className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                                    <img
                                        src={item.sneaker?.imageUrl || 'https://placehold.co/100?text=No+Image'}
                                        alt={item.sneaker?.name || 'Sneaker'}
                                        className="w-full h-full object-contain p-2"
                                        onError={(e) => e.target.src = 'https://placehold.co/100?text=No+Image'}
                                    />
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold text-gray-900 text-sm">{item.sneaker?.name || 'Sneaker unavailable'}</p>
                                    <p className="text-xs text-gray-400 mt-0.5">Qty: {item.quantity}</p>
                                </div>
                                <p className="font-bold text-gray-900">
                                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-gray-100 mt-6 pt-4 flex justify-between">
                        <span className="font-bold text-gray-900">Total</span>
                        <span className="font-bold text-gray-900 text-lg">
                            ₹{order.totalPrice.toLocaleString('en-IN')}
                        </span>
                    </div>
                </div>

                {/* Address */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <h2 className="font-bold text-gray-900 mb-3">Delivery Address</h2>
                    <p className="text-gray-500 text-sm leading-relaxed">📍 {order.address}</p>
                </div>
            </div>
        </div>
    );
};

export default OrderDetail;