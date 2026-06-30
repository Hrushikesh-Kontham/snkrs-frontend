import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-8">
            <div className="text-center">
                <h1 className="text-9xl font-black text-white tracking-tighter">404</h1>
                <p className="text-zinc-500 text-lg mt-2 mb-8">
                    This page doesn't exist — maybe it sold out too.
                </p>
                <div className="flex items-center justify-center gap-4">
                    <Link
                        to="/"
                        className="bg-white text-black px-6 py-3 rounded-xl font-bold text-sm tracking-wide hover:bg-zinc-100 transition-colors">
                        Go Home
                    </Link>
                    <Link
                        to="/sneakers"
                        className="border border-zinc-700 text-white px-6 py-3 rounded-xl font-bold text-sm tracking-wide hover:border-white transition-colors">
                        Shop Sneakers
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;