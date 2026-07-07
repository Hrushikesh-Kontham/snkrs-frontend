import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getAllSneakers } from '../api/sneakerApi';
import SneakerGrid from '../components/sneakers/SneakerGrid';

const ProductListing = () => {
    const [sneakers, setSneakers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedBrand, setSelectedBrand] = useState('All');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedGender, setSelectedGender] = useState('All');
    const [selectedSize, setSelectedSize] = useState('All');
    const [sortBy, setSortBy] = useState('default');
    const [priceRange, setPriceRange] = useState([0, 200000]);
    const [showFilter, setShowFilter] = useState(false);
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

    const brandList = [...new Set(sneakers.map(s => s.brand).filter(Boolean))].sort((a, b) => a.localeCompare(b));
    const brands = ['All', ...brandList];
    
    const categoryList = [...new Set(sneakers.map(s => s.category).filter(Boolean))].sort((a, b) => a.localeCompare(b));
    const categories = ['All', ...categoryList];
    
    const genders = ['All', 'Male', 'Female', 'Unisex'];
    const sizes = ['All', '6', '7', '8', '9', '10', '11', '12'];
    const maxPrice = Math.max(...sneakers.map(s => Number(s.price)), 200000);

    const filteredSneakers = sneakers
        .filter(s => selectedBrand === 'All' || s.brand?.toLowerCase() === selectedBrand.toLowerCase())
        .filter(s => selectedCategory === 'All' || s.category?.toLowerCase() === selectedCategory.toLowerCase())
        .filter(s => selectedGender === 'All' || s.gender?.toLowerCase() === selectedGender.toLowerCase())
        .filter(s => selectedSize === 'All' || s.sizes?.split(',').map(x => x.trim()).includes(selectedSize))
        .filter(s => Number(s.price) >= priceRange[0] && Number(s.price) <= priceRange[1])
        .filter(s => searchQuery === '' ||
            s.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.brand?.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => {
            if (sortBy === 'low-high') return a.price - b.price;
            if (sortBy === 'high-low') return b.price - a.price;
            return 0;
        });

    const activeFilterCount = [
        selectedBrand !== 'All',
        selectedCategory !== 'All',
        selectedGender !== 'All',
        selectedSize !== 'All',
        priceRange[1] < maxPrice,
    ].filter(Boolean).length;

    const resetFilters = () => {
        setSelectedBrand('All');
        setSelectedCategory('All');
        setSelectedGender('All');
        setSelectedSize('All');
        setPriceRange([0, maxPrice]);
    };

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
                {/* Top Bar */}
                <div className="flex items-center justify-between mb-6 gap-4">
                    {/* Filter Button */}
                    <button
                        onClick={() => setShowFilter(!showFilter)}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-semibold transition-all
                            ${showFilter || activeFilterCount > 0
                                ? 'bg-black text-white border-black'
                                : 'bg-white text-gray-700 border-gray-200 hover:border-black'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
                        </svg>
                        Filter
                        {activeFilterCount > 0 && (
                            <span className="bg-white text-black text-xs font-black rounded-full w-5 h-5 flex items-center justify-center">
                                {activeFilterCount}
                            </span>
                        )}
                    </button>

                    {/* Sort */}
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-black bg-white font-medium">
                        <option value="default">Sort: Default</option>
                        <option value="low-high">Price: Low to High</option>
                        <option value="high-low">Price: High to Low</option>
                    </select>
                </div>

                {/* Filter Panel */}
                {showFilter && (
                    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 mb-8">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-black text-gray-900 text-sm uppercase tracking-widest">Filters</h3>
                            {activeFilterCount > 0 && (
                                <button
                                    onClick={resetFilters}
                                    className="text-xs text-gray-400 hover:text-black underline font-medium">
                                    Clear all
                                </button>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* Brand */}
                            <div>
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Brand</p>
                                <div className="flex flex-wrap gap-2">
                                    {brands.map(brand => (
                                        <button
                                            key={brand}
                                            onClick={() => setSelectedBrand(brand)}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all
                                                ${selectedBrand === brand
                                                    ? 'bg-black text-white border-black'
                                                    : 'bg-white text-gray-600 border-gray-200 hover:border-black'}`}>
                                            {brand}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Product Type */}
                            <div>
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Product Type</p>
                                <div className="flex flex-wrap gap-2">
                                    {categories.map(cat => (
                                        <button
                                            key={cat}
                                            onClick={() => setSelectedCategory(cat)}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all
                                                ${selectedCategory === cat
                                                    ? 'bg-black text-white border-black'
                                                    : 'bg-white text-gray-600 border-gray-200 hover:border-black'}`}>
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Gender */}
                            <div>
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Gender</p>
                                <div className="flex flex-wrap gap-2">
                                    {genders.map(gender => (
                                        <button
                                            key={gender}
                                            onClick={() => setSelectedGender(gender)}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all
                                                ${selectedGender === gender
                                                    ? 'bg-black text-white border-black'
                                                    : 'bg-white text-gray-600 border-gray-200 hover:border-black'}`}>
                                            {gender}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Size */}
                            <div>
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Size (UK)</p>
                                <div className="flex flex-wrap gap-2">
                                    {sizes.map(size => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`w-12 h-10 rounded-lg text-xs font-semibold border transition-all
                                                ${selectedSize === size
                                                    ? 'bg-black text-white border-black'
                                                    : 'bg-white text-gray-600 border-gray-200 hover:border-black'}`}>
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Price */}
                            <div>
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
                                    Price — Up to ₹{priceRange[1].toLocaleString('en-IN')}
                                </p>
                                <input
                                    type="range"
                                    min={0}
                                    max={maxPrice}
                                    value={priceRange[1]}
                                    onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                                    className="w-full accent-black"
                                />
                                <div className="flex justify-between text-xs text-gray-400 mt-1">
                                    <span>₹0</span>
                                    <span>₹{maxPrice.toLocaleString('en-IN')}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Active Filter Tags */}
                {activeFilterCount > 0 && (
                    <div className="flex gap-2 mb-6 flex-wrap">
                        {searchQuery && (
                            <span className="bg-gray-900 text-white text-xs px-3 py-1.5 rounded-full">
                                Search: {searchQuery}
                            </span>
                        )}
                        {selectedBrand !== 'All' && (
                            <button onClick={() => setSelectedBrand('All')}
                                className="bg-gray-900 text-white text-xs px-3 py-1.5 rounded-full hover:bg-gray-700 flex items-center gap-1">
                                {selectedBrand} ✕
                            </button>
                        )}
                        {selectedCategory !== 'All' && (
                            <button onClick={() => setSelectedCategory('All')}
                                className="bg-gray-900 text-white text-xs px-3 py-1.5 rounded-full hover:bg-gray-700 flex items-center gap-1">
                                {selectedCategory} ✕
                            </button>
                        )}
                        {selectedGender !== 'All' && (
                            <button onClick={() => setSelectedGender('All')}
                                className="bg-gray-900 text-white text-xs px-3 py-1.5 rounded-full hover:bg-gray-700 flex items-center gap-1">
                                {selectedGender} ✕
                            </button>
                        )}
                        {selectedSize !== 'All' && (
                            <button onClick={() => setSelectedSize('All')}
                                className="bg-gray-900 text-white text-xs px-3 py-1.5 rounded-full hover:bg-gray-700 flex items-center gap-1">
                                Size {selectedSize} ✕
                            </button>
                        )}
                        {priceRange[1] < maxPrice && (
                            <button onClick={() => setPriceRange([0, maxPrice])}
                                className="bg-gray-900 text-white text-xs px-3 py-1.5 rounded-full hover:bg-gray-700 flex items-center gap-1">
                                Up to ₹{priceRange[1].toLocaleString('en-IN')} ✕
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