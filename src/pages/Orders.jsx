import { useState, useEffect } from 'react';
import { getUserOrders } from '../api/orderApi';
import OrderCard from '../components/orders/OrderCard';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await getUserOrders();
                setOrders(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-black text-white py-10 px-8">
                <div className="max-w-4xl mx-auto">
                    <p className="text-xs tracking-widest text-gray-400 uppercase mb-1">Your</p>
                    <h1 className="text-3xl font-black tracking-tight">Orders</h1>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-8 py-8">
                {loading ? (
                    <div className="flex justify-center py-24">
                        <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : orders.length === 0 ? (
                    <div className="text-center py-24">
                        <p className="text-6xl mb-4">📦</p>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">No orders yet</h3>
                        <p className="text-gray-400 text-sm">Your order history will appear here.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {orders.map((order) => (
                            <OrderCard key={order.id} order={order} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;