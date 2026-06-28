import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { cartCount } = useCart();
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (search.trim()) {
            navigate(`/sneakers?search=${search.trim()}`);
            setSearch('');
            setShowSearch(false);
        }
    };

    return (
        <nav className="bg-black text-white sticky top-0 z-50 border-b border-gray-900">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
                {/* Logo */}
                <Link to="/" className="text-xl font-black tracking-widest flex-shrink-0">
                    SNKRS
                </Link>

                {/* Center Links */}
                <div className="hidden md:flex items-center gap-8">
                    <Link to="/sneakers" className="text-sm text-gray-300 hover:text-white transition-colors tracking-wide">
                        Shop
                    </Link>
                    {user && (
                        <>
                            <Link to="/wishlist" className="text-sm text-gray-300 hover:text-white transition-colors tracking-wide">
                                Wishlist
                            </Link>
                            <Link to="/orders" className="text-sm text-gray-300 hover:text-white transition-colors tracking-wide">
                                Orders
                            </Link>
                        </>
                    )}
                    {user?.role === 'ADMIN' && (
                        <Link to="/admin" className="text-sm text-gray-300 hover:text-white transition-colors tracking-wide">
                            Admin
                        </Link>
                    )}
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-4">
                    {/* Search */}
                    <div className="flex items-center">
                        {showSearch ? (
                            <form onSubmit={handleSearch} className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search sneakers..."
                                    autoFocus
                                    className="bg-gray-900 border border-gray-700 rounded-xl px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-400 w-52 transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowSearch(false)}
                                    className="text-gray-400 hover:text-white transition-colors text-lg">
                                    ✕
                                </button>
                            </form>
                        ) : (
                            <button
                                onClick={() => setShowSearch(true)}
                                className="text-gray-300 hover:text-white transition-colors p-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        )}
                    </div>

                    {user ? (
                        <>
                            {/* Cart Icon */}
                            <Link to="/cart" className="relative text-gray-300 hover:text-white transition-colors p-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-white text-black text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>

                            {/* User Initial */}
                            <div className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center text-xs font-black flex-shrink-0">
                                {user.name?.charAt(0).toUpperCase()}
                            </div>

                            {/* Logout */}
                            <button
                                onClick={handleLogout}
                                className="text-xs border border-gray-700 px-4 py-2 rounded-xl hover:border-white transition-colors tracking-wide hidden md:block">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login"
                                className="text-sm text-gray-300 hover:text-white transition-colors tracking-wide">
                                Login
                            </Link>
                            <Link to="/register"
                                className="bg-white text-black px-4 py-2 rounded-xl text-sm font-semibold hover:bg-gray-100 transition-colors tracking-wide">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;