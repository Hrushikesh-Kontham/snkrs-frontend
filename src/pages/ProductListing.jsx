import { useState, useEffect } from 'react';
import { getAllSneakers, getSneakersByBrand, getSneakersByCategory } from '../api/sneakerApi';
import SneakerGrid from '../components/sneakers/SneakerGrid';

const brands = ['All', 'Nike', 'Adidas', 'New Balance', 'Puma', 'Converse'];
const categories = ['All', 'Basketball', 'Running', 'Lifestyle', 'Skateboarding'];

const ProductListing = () => {
    const [sneakers, setSneakers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedBrand, setSelectedBrand] = useState('All');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortBy, setSortBy] = useState('default');

    useEffect(() => {
        fetchSneakers();
    }, [selectedBrand, selectedCategory]);

    const fetchSneakers = async () => {
        setLoading(true);
        try {
            let res;
            if (selectedBrand !== 'All') {
                res = await getSneakersByBrand(selectedBrand);
            } else if (selectedCategory !== 'All') {
                res = await getSneakersByCategory(selectedCategory);
            } else {
                res = await getAllSneakers();
            }
            setSneakers(res.data);
        } catch (err) {
            console.error('Failed to fetch sneakers', err);
        } finally {
            setLoading(false);
        }
    };

    const sortedSneakers = [...sneakers].sort((a, b) => {
        if (sortBy === 'low-high') return a.price - b.price;
        if (sortBy === 'high-low') return b.price - a.price;
        return 0;
    });

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-black text-white py-12 px-8">
                <div className="max-w-7xl mx-auto">
                    <p className="text-xs tracking-widest text-gray-400 uppercase mb-2">
                        Collection
                    </p>
                    <h1 className="text-4xl font-black tracking-tight">All Sneakers</h1>
                    <p className="text-gray-400 mt-2 text-sm">
                        {sneakers.length} styles available
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-8 py-8">
                {/* Filters */}
                <div className="flex flex-wrap gap-6 mb-8 items-center justify-between">
                    {/* Brand Filter */}
                    <div className="flex gap-2 flex-wrap">
                        {brands.map((brand) => (
                            <button
                                key={brand}
                                onClick={() => {
                                    setSelectedBrand(brand);
                                    setSelectedCategory('All');
                                }}
                                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide uppercase transition-all border
                                    ${selectedBrand === brand
                                        ? 'bg-black text-white border-black'
                                        : 'bg-white text-gray-600 border-gray-200 hover:border-black'}`}>
                                {brand}
                            </button>
                        ))}
                    </div>

                    {/* Sort */}
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-black bg-white">
                        <option value="default">Sort: Default</option>
                        <option value="low-high">Price: Low to High</option>
                        <option value="high-low">Price: High to Low</option>
                    </select>
                </div>

                {/* Category Filter */}
                <div className="flex gap-2 flex-wrap mb-8">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => {
                                setSelectedCategory(cat);
                                setSelectedBrand('All');
                            }}
                            className={`px-4 py-1.5 rounded-full text-xs tracking-wide transition-all border
                                ${selectedCategory === cat
                                    ? 'bg-gray-900 text-white border-gray-900'
                                    : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'}`}>
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <SneakerGrid sneakers={sortedSneakers} loading={loading} />
            </div>
        </div>
    );
};

export default ProductListing;