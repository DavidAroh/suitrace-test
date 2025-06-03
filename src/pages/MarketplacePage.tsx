import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, Filter } from 'lucide-react';
import Layout from '../components/layout/Layout';
import ProductCard from '../components/marketplace/ProductCard';
import ProductFilters, { FilterState } from '../components/marketplace/ProductFilters';
import CartDrawer from '../components/marketplace/CartDrawer';
import Button from '../components/ui/Button';
import { mockProducts, mockCategories } from '../data/mockData';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

const MarketplacePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const { cartItems } = useCart();

  const handleFilterChange = (filters: FilterState) => {
    let filtered = [...products];
    
    // Apply category filters
    if (filters.categories.length > 0) {
      filtered = filtered.filter(product => 
        filters.categories.includes(product.category)
      );
    }
    
    // Apply region filters
    if (filters.regions.length > 0) {
      filtered = filtered.filter(product => {
        // Map product location to region (simplified for demo)
        const productRegion = product.location.includes('Mexico') 
          ? 'Central America'
          : product.location.includes('USA') 
            ? 'North America' 
            : 'Other';
        
        return filters.regions.some(region => productRegion.includes(region));
      });
    }
    
    // Apply price range filter
    filtered = filtered.filter(product => 
      product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    );
    
    // Apply organic filter
    if (filters.isOrganic) {
      filtered = filtered.filter(product => 
        product.tags.includes('organic')
      );
    }
    
    // Apply fair trade filter
    if (filters.isFairTrade) {
      filtered = filtered.filter(product => 
        product.tags.includes('fair-trade')
      );
    }
    
    // Apply search query if exists
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    setFilteredProducts(filtered);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleFilterChange({
      categories: [],
      regions: [],
      priceRange: [0, 100],
      isOrganic: false,
      isFairTrade: false,
    });
  };

  useEffect(() => {
    // Reset filtered products when products change
    setFilteredProducts(products);
  }, [products]);

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Marketplace</h1>
          
          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-64 rounded-full text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </form>
            
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative text-gray-700 hover:text-green-600"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </button>
            
            <button
              className="md:hidden text-gray-700 hover:text-green-600"
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            >
              <Filter className="h-6 w-6" />
            </button>
          </div>
        </div>
        
        <div className="md:hidden mb-6">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full rounded-full text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </form>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Mobile Filters */}
          {isFiltersOpen && (
            <div className="md:hidden">
              <ProductFilters onFilterChange={handleFilterChange} isMobile />
            </div>
          )}
          
          {/* Desktop Filters */}
          <div className="hidden md:block md:w-64 flex-shrink-0">
            <ProductFilters onFilterChange={handleFilterChange} />
          </div>
          
          {/* Products */}
          <div className="flex-1">
            {/* Category Quick Filters */}
            <div className="mb-6 overflow-x-auto pb-2">
              <div className="flex space-x-2">
                {mockCategories.slice(0, 6).map(category => (
                  <Button
                    key={category}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      // Filter by this category
                      handleFilterChange({
                        categories: [category],
                        regions: [],
                        priceRange: [0, 100],
                        isOrganic: false,
                        isFairTrade: false,
                      });
                    }}
                    className="whitespace-nowrap"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
            
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </Layout>
  );
};

export default MarketplacePage;