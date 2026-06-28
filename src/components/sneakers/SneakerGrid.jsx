import SneakerCard from './SneakerCard';

const SneakerGrid = ({ sneakers, loading }) => {
    if (loading) {
        return (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 animate-pulse">
                        <div className="bg-gray-200 h-56" />
                        <div className="p-4 space-y-3">
                            <div className="h-3 bg-gray-200 rounded w-1/3" />
                            <div className="h-4 bg-gray-200 rounded w-3/4" />
                            <div className="h-4 bg-gray-200 rounded w-1/2" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (!sneakers || sneakers.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-24 text-center">
                <p className="text-6xl mb-4">👟</p>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No sneakers found</h3>
                <p className="text-gray-400 text-sm">Try a different filter or check back later.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sneakers.map((sneaker) => (
                <SneakerCard key={sneaker.id} sneaker={sneaker} />
            ))}
        </div>
    );
};

export default SneakerGrid;