import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="min-h-screen bg-black text-white">
            {/* Hero */}
            <div className="max-w-7xl mx-auto px-8 py-32 flex flex-col items-center text-center">
                <p className="text-xs tracking-widest text-gray-500 uppercase mb-6">
                    New Collection Available
                </p>
                <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-6">
                    STEP INTO
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-white">
                        CULTURE
                    </span>
                </h1>
                <p className="text-gray-400 text-lg max-w-md mb-12">
                    The most exclusive sneakers, curated for those who know.
                </p>
                <div className="flex gap-4">
                    <Link
                        to="/sneakers"
                        className="bg-white text-black px-8 py-4 rounded-2xl font-bold tracking-wide hover:bg-gray-100 transition-colors">
                        Shop Now
                    </Link>
                    <Link
                        to="/register"
                        className="border border-gray-700 text-white px-8 py-4 rounded-2xl font-bold tracking-wide hover:border-gray-400 transition-colors">
                        Join Us
                    </Link>
                </div>
            </div>

            {/* Stats */}
            <div className="border-t border-gray-900 py-16">
                <div className="max-w-7xl mx-auto px-8 grid grid-cols-3 gap-8 text-center">
                    <div>
                        <p className="text-4xl font-black mb-2">500+</p>
                        <p className="text-gray-500 text-sm uppercase tracking-widest">Styles</p>
                    </div>
                    <div>
                        <p className="text-4xl font-black mb-2">10+</p>
                        <p className="text-gray-500 text-sm uppercase tracking-widest">Brands</p>
                    </div>
                    <div>
                        <p className="text-4xl font-black mb-2">100%</p>
                        <p className="text-gray-500 text-sm uppercase tracking-widest">Authentic</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;