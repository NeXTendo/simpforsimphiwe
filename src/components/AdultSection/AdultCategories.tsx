import React, { useState } from 'react';
import { Heart, Siren as Fire, Star, Crown, Zap, Moon } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  count: number;
  description: string;
  color: string;
  preview: string[];
}

const AdultCategories: React.FC = () => {
  const [, setSelectedCategory] = useState<string | null>(null);

  const categories: Category[] = [
    {
      id: 'intimate',
      name: 'Intimate',
      icon: <Heart size={32} fill="currentColor" />,
      count: 24,
      description: 'Our most tender and intimate moments together',
      color: 'from-pink-600 to-red-600',
      preview: ['Gentle touches', 'Soft whispers', 'Close embraces']
    },
    {
      id: 'passionate',
      name: 'Passionate',
      icon: <Fire size={32} />,
      count: 18,
      description: 'Fiery passion and intense desire',
      color: 'from-red-600 to-orange-600',
      preview: ['Burning desire', 'Intense moments', 'Wild passion']
    },
    {
      id: 'romantic',
      name: 'Romantic',
      icon: <Star size={32} fill="currentColor" />,
      count: 15,
      description: 'Romantic evenings and sweet moments',
      color: 'from-purple-600 to-pink-600',
      preview: ['Candlelit dinners', 'Sunset views', 'Love letters']
    },
    {
      id: 'playful',
      name: 'Playful',
      icon: <Zap size={32} />,
      count: 21,
      description: 'Fun, teasing, and playful interactions',
      color: 'from-yellow-600 to-red-600',
      preview: ['Teasing games', 'Playful banter', 'Fun moments']
    },
    {
      id: 'explicit',
      name: 'Explicit',
      icon: <Crown size={32} />,
      count: 12,
      description: 'Our most explicit and raw moments',
      color: 'from-red-700 to-black',
      preview: ['Raw passion', 'Unfiltered desire', 'Pure ecstasy']
    },
    {
      id: 'midnight',
      name: 'Midnight',
      icon: <Moon size={32} />,
      count: 9,
      description: 'Late night adventures and secret moments',
      color: 'from-indigo-600 to-purple-600',
      preview: ['Late night calls', 'Secret meetings', 'Midnight passion']
    }
  ];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Categories
          </h1>
          <p className="text-red-300 text-xl">
            Explore our collection by category 🔥
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group relative bg-black/40 backdrop-blur-md border border-red-500/30 rounded-2xl p-8 hover:bg-black/60 transition-all duration-300 cursor-pointer transform hover:scale-105"
              onClick={() => setSelectedCategory(category.id)}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-10 rounded-2xl group-hover:opacity-20 transition-opacity duration-300`} />
              
              {/* Content */}
              <div className="relative z-10">
                {/* Icon and Count */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`text-transparent bg-gradient-to-r ${category.color} bg-clip-text`}>
                    {category.icon}
                  </div>
                  <div className="bg-red-600/20 text-red-300 px-3 py-1 rounded-full text-sm font-medium">
                    {category.count} videos
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-4">
                  {category.name}
                </h3>

                {/* Description */}
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {category.description}
                </p>

                {/* Preview Tags */}
                <div className="space-y-2">
                  <p className="text-red-400 text-sm font-medium">Preview:</p>
                  <div className="flex flex-wrap gap-2">
                    {category.preview.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-red-600/20 text-red-300 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-red-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
              </div>
            </div>
          ))}
        </div>

        {/* Featured Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Most Popular This Week
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.slice(0, 3).map((category, index) => (
              <div
                key={category.id}
                className="relative bg-black/40 backdrop-blur-md border border-red-500/30 rounded-xl p-6 hover:bg-black/60 transition-all duration-300"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="text-red-400">
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">{category.name}</h3>
                    <p className="text-gray-400 text-sm">{category.count} videos</p>
                  </div>
                </div>
                
                <div className="absolute top-4 right-4">
                  <div className="bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                    #{index + 1}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-8 bg-black/40 backdrop-blur-md border border-red-500/30 rounded-2xl p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-400">
                {categories.reduce((sum, cat) => sum + cat.count, 0)}
              </div>
              <div className="text-sm text-gray-400 mt-1">Total Videos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-400">{categories.length}</div>
              <div className="text-sm text-gray-400 mt-1">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-400">🔥</div>
              <div className="text-sm text-gray-400 mt-1">Heat Level</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdultCategories;