import React, { useState } from 'react';
import { Filter, X } from 'lucide-react';
import Button from '../ui/Button';
import { mockCategories, mockRegions } from '../../data/mockData';

interface ProductFiltersProps {
  onFilterChange: (filters: FilterState) => void;
  isMobile?: boolean;
}

export interface FilterState {
  categories: string[];
  regions: string[];
  priceRange: [number, number];
  isOrganic: boolean;
  isFairTrade: boolean;
}

const initialFilters: FilterState = {
  categories: [],
  regions: [],
  priceRange: [0, 100],
  isOrganic: false,
  isFairTrade: false,
};

const ProductFilters: React.FC<ProductFiltersProps> = ({ onFilterChange, isMobile = false }) => {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [isOpen, setIsOpen] = useState(!isMobile);

  const handleCategoryChange = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    
    const newFilters = { ...filters, categories: newCategories };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleRegionChange = (region: string) => {
    const newRegions = filters.regions.includes(region)
      ? filters.regions.filter(r => r !== region)
      : [...filters.regions, region];
    
    const newFilters = { ...filters, regions: newRegions };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = parseInt(e.target.value);
    const newPriceRange = [...filters.priceRange] as [number, number];
    newPriceRange[index] = value;
    
    const newFilters = { ...filters, priceRange: newPriceRange };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleCheckboxChange = (name: 'isOrganic' | 'isFairTrade') => {
    const newFilters = { ...filters, [name]: !filters[name] };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    setFilters(initialFilters);
    onFilterChange(initialFilters);
  };

  const toggleFilters = () => {
    setIsOpen(!isOpen);
  };

  const filterCount = 
    filters.categories.length + 
    filters.regions.length + 
    (filters.isOrganic ? 1 : 0) + 
    (filters.isFairTrade ? 1 : 0) +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 100 ? 1 : 0);

  return (
    <div className={`bg-white rounded-lg shadow-md ${isMobile ? 'mb-4' : ''}`}>
      {isMobile && (
        <div className="p-4 border-b border-gray-200">
          <button
            onClick={toggleFilters}
            className="flex items-center justify-between w-full"
          >
            <span className="flex items-center font-medium text-gray-700">
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {filterCount > 0 && (
                <span className="ml-2 bg-green-100 text-green-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                  {filterCount}
                </span>
              )}
            </span>
            <span className="text-gray-500">
              {isOpen ? <X className="h-4 w-4" /> : <span>+</span>}
            </span>
          </button>
        </div>
      )}

      {(!isMobile || isOpen) && (
        <div className="p-4">
          {!isMobile && (
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-gray-700 flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Filters
                {filterCount > 0 && (
                  <span className="ml-2 bg-green-100 text-green-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                    {filterCount}
                  </span>
                )}
              </h3>
              {filterCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-green-600 hover:text-green-700"
                >
                  Clear all
                </button>
              )}
            </div>
          )}

          <div className="space-y-6">
            {/* Categories */}
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Categories</h4>
              <div className="space-y-2 max-h-44 overflow-y-auto pr-2">
                {mockCategories.map((category) => (
                  <label key={category} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.categories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                      className="rounded text-green-600 focus:ring-green-500 h-4 w-4"
                    />
                    <span className="ml-2 text-sm text-gray-700">{category}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Regions */}
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Regions</h4>
              <div className="space-y-2 max-h-44 overflow-y-auto pr-2">
                {mockRegions.map((region) => (
                  <label key={region} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.regions.includes(region)}
                      onChange={() => handleRegionChange(region)}
                      className="rounded text-green-600 focus:ring-green-500 h-4 w-4"
                    />
                    <span className="ml-2 text-sm text-gray-700">{region}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Price Range</h4>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">${filters.priceRange[0]}</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={filters.priceRange[0]}
                  onChange={(e) => handlePriceChange(e, 0)}
                  className="flex-grow accent-green-600"
                />
                <span className="text-sm text-gray-600">${filters.priceRange[1]}</span>
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Certifications</h4>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.isOrganic}
                    onChange={() => handleCheckboxChange('isOrganic')}
                    className="rounded text-green-600 focus:ring-green-500 h-4 w-4"
                  />
                  <span className="ml-2 text-sm text-gray-700">Organic</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.isFairTrade}
                    onChange={() => handleCheckboxChange('isFairTrade')}
                    className="rounded text-green-600 focus:ring-green-500 h-4 w-4"
                  />
                  <span className="ml-2 text-sm text-gray-700">Fair Trade</span>
                </label>
              </div>
            </div>

            {isMobile && (
              <div className="pt-4 flex space-x-2">
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="flex-1"
                >
                  Clear
                </Button>
                <Button 
                  variant="primary"
                  onClick={() => setIsOpen(false)}
                  className="flex-1"
                >
                  Apply Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductFilters;