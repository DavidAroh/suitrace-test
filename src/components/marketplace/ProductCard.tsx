import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Info, Award } from 'lucide-react';
import { Product } from '../../types';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative">
        <Link to={`/product/${product.id}`}>
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-48 object-cover"
          />
        </Link>
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          {product.tags.includes('organic') && (
            <Badge variant="success\" className="mb-1">Organic</Badge>
          )}
          {product.tags.includes('fair-trade') && (
            <Badge variant="info">Fair Trade</Badge>
          )}
        </div>
        {product.verifiedOnChain && (
          <div className="absolute bottom-2 left-2">
            <div className="bg-green-700 text-white text-xs px-2 py-1 rounded-full flex items-center">
              <Award className="h-3 w-3 mr-1" />
              Verified
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            <Link to={`/product/${product.id}`} className="hover:text-green-600">
              {product.name}
            </Link>
          </h3>
          <span className="text-lg font-bold text-green-700">${product.price.toFixed(2)}</span>
        </div>
        
        <div className="text-sm text-gray-500 mb-3">
          <span className="flex items-center text-xs text-gray-600">
            <span>{product.farmerName}</span>
            <span className="mx-1">•</span>
            <span>{product.location}</span>
          </span>
        </div>
        
        <p className="text-sm text-gray-700 mb-4 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex justify-between items-center">
          <Link 
            to={`/traceability/${product.traceabilityId}`}
            className="flex items-center text-sm text-green-600 hover:text-green-700"
          >
            <Info className="h-4 w-4 mr-1" />
            View Trace
          </Link>
          
          <Button
            variant="primary"
            size="sm"
            onClick={handleAddToCart}
            rightIcon={<ShoppingCart className="h-4 w-4" />}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;