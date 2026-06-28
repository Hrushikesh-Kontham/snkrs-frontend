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
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-black tracking-widest text-black">SNKRS</h1>
                    <p className="text-gray-400 text-sm mt-2">Create your account</p>
                </div>

                {/* Card */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                    {error && (
                        <div className="bg-red-50 text-red-500 text-sm px-4 py-3 rounded-xl mb-6 text-center">
                            {error}
                        </div>
                    )}

                    <div className="space-y-5">
                        <div>
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest block mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Your name"
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                            />
                        </div>

                        <div>
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest block mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                            />
                        </div>

                        <div>
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest block mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                            />
                        </div>

                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="w-full bg-black text-white py-3 rounded-xl font-semibold tracking-wide hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                            {loading ? 'Creating account...' : 'Create Account'}
                        </button>
                    </div>

                    <p className="text-center text-sm text-gray-400 mt-6">
                        Already have an account?{' '}
                        <Link to="/login" className="text-black font-semibold hover:underline">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;