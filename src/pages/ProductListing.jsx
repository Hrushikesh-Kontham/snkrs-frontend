import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getAllSneakers } from '../api/sneakerApi';
import SneakerGrid from '../components/sneakers/SneakerGrid';

const ProductListing = () => {
    const [sneakers, setSneakers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedBrand, setSelectedBrand] = useState('All');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortBy, setSortBy] = useState('default');
    const [priceRange, setPriceRange] = useState([0, 200000]);
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('search') || '';

    useEffect(() => {
        fetchSneakers();
    }, []);

    const fetchSneakers = async () => {
        setLoading(true);
        try {
            const res = await getAllSneakers();
            setSneakers(res.data);
        } catch (err) {
            console.error('Failed to fetch sneakers', err);
        } finally {
            setLoading(false);
        }
    };

    // Derive brands and categories dynamically from data
    const brands = ['All', ...new Set(sneakers.map(s => s.brand))].sort();
    const categories = ['All', ...new Set(sneakers.map(s => s.category).filter(Boolean))].sort();

    // Filter + sort all on frontend
    const filteredSneakers = sneakers
        .filter(s => selectedBrand === 'All' || s.brand.toLowerCase() === selectedBrand.toLowerCase())
        .filter(s => selectedCategory === 'All' || s.category?.toLowerCase() === selectedCategory.toLowerCase())
        .filter(s => s.price >= priceRange[0] && s.price <= priceRange[1])
        .filter(s => searchQuery === '' ||
            s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.brand.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => {
            if (sortBy === 'low-high') return a.price - b.price;
            if (sortBy === 'high-low') return b.price - a.price;
            return 0;
        });

    const maxPrice = Math.max(...sneakers.map(s => Number(s.price)), 200000);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-black text-white py-12 px-8">
                <div className="max-w-7xl mx-auto">
                    <p className="text-xs tracking-widest text-gray-400 uppercase mb-2">Collection</p>
                    <h1 className="text-4xl font-black tracking-tight">
                        {searchQuery ? `Search: "${searchQuery}"` : 'All Sneakers'}
                    </h1>
                    <p className="text-gray-400 mt-2 text-sm">
                        {filteredSneakers.length} styles available
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-8 py-8">
                {/* Top Row — Brand + Sort */}
                <div className="flex flex-wrap gap-4 mb-6 items-center justify-between">
                    <div className="flex gap-2 flex-wrap">
                        {brands.map((brand) => (
                            <button
                                key={brand}
                                onClick={() => setSelectedBrand(brand)}
                                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide uppercase transition-all border
                                    ${selectedBrand === brand
                                        ? 'bg-black text-white border-black'
                                        : 'bg-white text-gray-600 border-gray-200 hover:border-black'}`}>
                                {brand}
                            </button>
                        ))}
                    </div>
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
                <div className="flex gap-2 flex-wrap mb-6">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-1.5 rounded-full text-xs tracking-wide transition-all border
                                ${selectedCategory === cat
                                    ? 'bg-gray-900 text-white border-gray-900'
                                    : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'}`}>
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Price Range */}
                <div className="mb-8 flex items-center gap-4">
                    <span className="text-xs text-gray-500 uppercase tracking-widest font-semibold whitespace-nowrap">Price Range</span>
                    <input
                        type="range"
                        min={0}
                        max={maxPrice}
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                        className="w-48 accent-black"
                    />
                    <span className="text-xs font-semibold text-gray-700">
                        Up to ₹{priceRange[1].toLocaleString('en-IN')}
                    </span>
                    {priceRange[1] < maxPrice && (
                        <button
                            onClick={() => setPriceRange([0, maxPrice])}
                            className="text-xs text-gray-400 hover:text-black underline">
                            Reset
                        </button>
                    )}
                </div>

                {/* Active filters summary */}
                {(selectedBrand !== 'All' || selectedCategory !== 'All' || searchQuery) && (
                    <div className="flex gap-2 mb-6 flex-wrap">
                        {searchQuery && (
                            <span className="bg-gray-900 text-white text-xs px-3 py-1 rounded-full">
                                Search: {searchQuery}
                            </span>
                        )}
                        {selectedBrand !== 'All' && (
                            <button
                                onClick={() => setSelectedBrand('All')}
                                className="bg-gray-900 text-white text-xs px-3 py-1 rounded-full hover:bg-gray-700">
                                {selectedBrand} ✕
                            </button>
                        )}
                        {selectedCategory !== 'All' && (
                            <button
                                onClick={() => setSelectedCategory('All')}
                                className="bg-gray-900 text-white text-xs px-3 py-1 rounded-full hover:bg-gray-700">
                                {selectedCategory} ✕
                            </button>
                        )}
                    </div>
                )}

                {/* Grid */}
                <SneakerGrid sneakers={filteredSneakers} loading={loading} />
            </div>
        </div>
    );
};

export default ProductListing;