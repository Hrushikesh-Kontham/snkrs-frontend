import { Link } from 'react-router-dom';

const statusStyles = {
    PLACED: 'bg-blue-50 text-blue-600',
    CONFIRMED: 'bg-yellow-50 text-yellow-600',
    SHIPPED: 'bg-purple-50 text-purple-600',
    DELIVERED: 'bg-green-50 text-green-600',
};

const OrderCard = ({ order }) => {
    return (
        <Link to={`/orders/${order.id}`} className="block group">
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                    <div>
                        <p className="text-xs text-gray-400 uppercase tracking-widest">
                            Order ID
                        </p>
                        <p className="font-bold text-gray-900 text-sm mt-0.5">
                            #{order.id}
                        </p>
                    </div>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full tracking-wide uppercase ${statusStyles[order.status] || 'bg-gray-100 text-gray-500'}`}>
                        {order.status}
                    </span>
                </div>

                <div className="border-t border-gray-50 pt-3 flex items-center justify-between">
                    <div>
                        <p className="text-xs text-gray-400">Total</p>
                        <p className="font-bold text-gray-900">
                            ₹{order.totalPrice.toLocaleString('en-IN')}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-gray-400">Date</p>
                        <p className="text-sm text-gray-600">
                            {new Date(order.createdAt).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                            })}
                        </p>
                    </div>
                </div>

                <div className="mt-3 pt-3 border-t border-gray-50">
                    <p className="text-xs text-gray-400 truncate">
                        📍 {order.address}
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default OrderCard;