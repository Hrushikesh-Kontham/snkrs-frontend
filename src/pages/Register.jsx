import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../api/authApi';
import { useAuth } from '../context/AuthContext';

const Register = () => {
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await registerUser(form);
            login(res.data);
            navigate('/sneakers');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex">
            {/* Left Side - Branding */}
            <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 bg-zinc-950 border-r border-zinc-900">
                <Link to="/" className="text-2xl font-black tracking-widest text-white">
                    SNKRS
                </Link>
                <div>
                    <h2 className="text-5xl font-black text-white leading-tight mb-4">
                        JOIN THE
                        <br />
                        <span className="text-zinc-500">CULTURE.</span>
                    </h2>
                    <p className="text-zinc-500 text-sm">
                        Create your account and get access to exclusive drops and collections.
                    </p>
                </div>
                <div className="flex gap-8">
                    <div>
                        <p className="text-2xl font-black text-white">500+</p>
                        <p className="text-zinc-600 text-xs uppercase tracking-widest">Styles</p>
                    </div>
                    <div>
                        <p className="text-2xl font-black text-white">10+</p>
                        <p className="text-zinc-600 text-xs uppercase tracking-widest">Brands</p>
                    </div>
                    <div>
                        <p className="text-2xl font-black text-white">100%</p>
                        <p className="text-zinc-600 text-xs uppercase tracking-widest">Authentic</p>
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center px-8 py-12">
                <div className="w-full max-w-md">
                    {/* Mobile Logo */}
                    <Link to="/" className="lg:hidden block text-2xl font-black tracking-widest text-white mb-12">
                        SNKRS
                    </Link>

                    <div className="mb-8">
                        <h1 className="text-3xl font-black text-white mb-2">Create account</h1>
                        <p className="text-zinc-500 text-sm">Join thousands of sneaker enthusiasts</p>
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl mb-6">
                            {error}
                        </div>
                    )}

                    <div className="space-y-5">
                        <div>
                            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest block mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Your name"
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600 transition-colors"
                            />
                        </div>

                        <div>
                            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest block mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600 transition-colors"
                            />
                        </div>

                        <div>
                            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest block mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
                                placeholder="••••••••"
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600 transition-colors"
                            />
                        </div>

                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="w-full bg-white text-black py-3 rounded-xl font-bold tracking-wide hover:bg-zinc-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                            {loading ? 'Creating account...' : 'Create Account'}
                        </button>
                    </div>

                    <div className="mt-6 text-center">
                        <p className="text-zinc-500 text-sm">
                            Already have an account?{' '}
                            <Link to="/login" className="text-white font-semibold hover:underline">
                                Sign in
                            </Link>
                        </p>
                    </div>

                    <div className="mt-8 pt-8 border-t border-zinc-900">
                        <p className="text-center text-zinc-600 text-xs uppercase tracking-widest">
                            100% Authentic Sneakers
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;