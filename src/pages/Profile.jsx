import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getCurrentUser } from '../api/authApi';
import { getUserOrders } from '../api/orderApi';

const Profile = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [orderCount, setOrderCount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const profileRes = await getCurrentUser();
                setProfile(profileRes.data);
                const ordersRes = await getUserOrders();
                setOrderCount(ordersRes.data.length);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (!profile) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-8">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Sidebar */}
                <div className="md:col-span-1 space-y-4">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-black text-lg">
                                {profile.name?.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <p className="font-bold text-gray-900">Hey, {profile.name}</p>
                                <p className="text-xs text-gray-400">{profile.email}</p>
                            </div>
                        </div>
                        <div className="border-t border-gray-100 mt-4 pt-4">
                            <Link to="/orders" className="text-sm font-semibold text-gray-900 hover:underline">
                                {orderCount} Total Orders →
                            </Link>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-100">
                        <Link to="/orders" className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                            <div>
                                <p className="font-semibold text-gray-900 text-sm">My Orders</p>
                                <p className="text-xs text-gray-400">Track your recent purchases</p>
                            </div>
                            <span className="text-gray-300">→</span>
                        </Link>
                        <Link to="/wishlist" className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                            <div>
                                <p className="font-semibold text-gray-900 text-sm">Wishlist</p>
                                <p className="text-xs text-gray-400">Your saved sneakers</p>
                            </div>
                            <span className="text-gray-300">→</span>
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="flex items-center justify-between p-4 hover:bg-red-50 transition-colors w-full text-left">
                            <p className="font-semibold text-red-500 text-sm">Logout</p>
                        </button>
                    </div>
                </div>

                {/* Profile Details */}
                <div className="md:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <h2 className="text-xl font-black text-gray-900 mb-6">Profile</h2>
                    <div className="space-y-5">
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Name</p>
                            <p className="font-semibold text-gray-900">{profile.name}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Email</p>
                            <p className="font-semibold text-gray-900">{profile.email}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Role</p>
                            <p className="font-semibold text-gray-900">{profile.role}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Member Since</p>
                            <p className="font-semibold text-gray-900">
                                {new Date(profile.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;