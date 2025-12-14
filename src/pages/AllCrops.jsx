import { useState, useEffect, useCallback } from 'react';
import { HiSearch, HiFilter, HiX } from 'react-icons/hi';
import CropCard from '../components/crops/CropCard';
import SectionTitle from '../components/ui/SectionTitle';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorMessage from '../components/ui/ErrorMessage';
import EmptyState from '../components/ui/EmptyState';
import { cropsAPI } from '../services/api';
import { FaSeedling } from 'react-icons/fa';

const AllCrops = () => {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);

  const cropTypes = [
    'All Types',
    'Vegetables',
    'Fruits',
    'Grains',
    'Pulses',
    'Spices',
    'Rice',
    'Others'
  ];

  const fetchCrops = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {};
      if (searchTerm) params.search = searchTerm;
      if (selectedType && selectedType !== 'All Types') params.type = selectedType;
      if (sortBy) params.sort = sortBy;

      const response = await cropsAPI.getAll(params);
      setCrops(response.data);
    } catch (err) {
      setError('Failed to fetch crops. Please try again.');
      console.error('Error fetching crops:', err);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, selectedType, sortBy]);

  useEffect(() => {
    fetchCrops();
  }, [fetchCrops]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchCrops();
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedType('');
    setSortBy('newest');
  };

  const hasActiveFilters = searchTerm || selectedType || sortBy !== 'newest';

  return (
    <div className="min-h-screen bg-gray-50 py-10 animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="All Crops"
          subtitle="Browse and discover crops from farmers across the country"
        />

        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex gap-4 mb-4">
            <div className="relative flex-1">
              <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search crops by name, location..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Search
            </button>
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-lg font-medium transition-colors md:hidden"
            >
              <HiFilter />
            </button>
          </form>

          {/* Filter Options */}
          <div className={`${showFilters ? 'block' : 'hidden'} md:block`}>
            <div className="flex flex-wrap gap-4 items-center">
              {/* Crop Type Filter */}
              <div className="flex-1 min-w-50">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Crop Type
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  {cropTypes.map((type) => (
                    <option key={type} value={type === 'All Types' ? '' : type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort By */}
              <div className="flex-1 min-w-50">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1 text-red-600 hover:text-red-700 font-medium mt-6"
                >
                  <HiX />
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results Count */}
        {!loading && !error && crops.length > 0 && (
          <p className="text-gray-600 mb-6">
            Showing <span className="font-semibold">{crops.length}</span> crops
          </p>
        )}

        {/* Content */}
        {loading ? (
          <LoadingSpinner fullScreen={false} />
        ) : error ? (
          <ErrorMessage message={error} onRetry={fetchCrops} />
        ) : crops.length === 0 ? (
          <EmptyState
            title="No Crops Found"
            description="We couldn't find any crops matching your criteria. Try adjusting your filters or search term."
            icon={FaSeedling}
            actionLabel="Clear Filters"
            actionLink="/crops"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {crops.map((crop) => (
              <CropCard key={crop._id} crop={crop} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllCrops;
