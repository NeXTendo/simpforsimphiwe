import React, { useState } from 'react';
import { Search, Filter, Clock, TrendingUp as Trending } from 'lucide-react';

const AdultSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('newest');

  const trendingSearches = [
    'passionate moments',
    'intimate evening',
    'bedroom games',
    'shower time',
    'romantic dinner',
    'weekend getaway',
    'morning passion',
    'candlelit night'
  ];

  const recentSearches = [
    'steamy shower',
    'romantic evening',
    'playful moments',
    'intimate massage'
  ];

  const filters = [
    { id: 'duration', name: 'Duration', options: ['Under 10 min', '10-20 min', '20+ min'] },
    { id: 'category', name: 'Category', options: ['Intimate', 'Passionate', 'Romantic', 'Playful', 'Explicit'] },
    { id: 'mood', name: 'Mood', options: ['Gentle', 'Intense', 'Playful', 'Romantic', 'Wild'] },
    { id: 'setting', name: 'Setting', options: ['Bedroom', 'Bathroom', 'Living Room', 'Outdoor', 'Hotel'] }
  ];

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    // Implement search logic here
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Search
          </h1>
          <p className="text-red-300 text-xl">
            Find exactly what you're looking for 🔍
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
          <input
            type="text"
            placeholder="Search our private collection..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-black/40 border border-red-500/30 rounded-xl text-white placeholder-red-400/50 focus:outline-none focus:ring-2 focus:ring-red-500 text-lg"
          />
          <button
            onClick={() => handleSearch(searchTerm)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
          >
            Search
          </button>
        </div>

        {/* Quick Filters */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Filter className="text-red-400" size={20} />
            <span className="text-white font-medium">Quick Filters:</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {['All', 'New', 'Popular', 'Favorites', 'Long Videos', 'Short Videos'].map((filter) => (
              <button
                key={filter}
                className="px-4 py-2 bg-black/40 border border-red-500/30 text-red-300 hover:bg-red-600/20 rounded-lg transition-colors duration-200"
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Advanced Filters */}
        <div className="mb-8">
          <h3 className="text-white font-semibold text-lg mb-4">Advanced Filters</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filters.map((filter) => (
              <div key={filter.id} className="bg-black/40 border border-red-500/30 rounded-xl p-4">
                <h4 className="text-red-400 font-medium mb-3">{filter.name}</h4>
                <div className="space-y-2">
                  {filter.options.map((option) => (
                    <label key={option} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-red-600 bg-black border-red-500 rounded focus:ring-red-500"
                      />
                      <span className="text-gray-300 text-sm">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trending Searches */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Trending className="text-red-400" size={20} />
            <h3 className="text-white font-semibold text-lg">Trending Searches</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {trendingSearches.map((search, index) => (
              <button
                key={index}
                onClick={() => handleSearch(search)}
                className="px-4 py-2 bg-red-600/20 text-red-300 hover:bg-red-600/30 rounded-full text-sm transition-colors duration-200"
              >
                🔥 {search}
              </button>
            ))}
          </div>
        </div>

        {/* Recent Searches */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Clock className="text-red-400" size={20} />
            <h3 className="text-white font-semibold text-lg">Recent Searches</h3>
          </div>
          <div className="space-y-2">
            {recentSearches.map((search, index) => (
              <button
                key={index}
                onClick={() => handleSearch(search)}
                className="flex items-center justify-between w-full px-4 py-3 bg-black/40 border border-red-500/30 text-gray-300 hover:bg-red-600/20 hover:text-white rounded-lg transition-colors duration-200"
              >
                <span>{search}</span>
                <Search size={16} className="text-red-400" />
              </button>
            ))}
          </div>
        </div>

        {/* Search Stats */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-8 bg-black/40 backdrop-blur-md border border-red-500/30 rounded-2xl p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-400">127</div>
              <div className="text-sm text-gray-400 mt-1">Total Videos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-400">24</div>
              <div className="text-sm text-gray-400 mt-1">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-400">∞</div>
              <div className="text-sm text-gray-400 mt-1">Possibilities</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdultSearch;