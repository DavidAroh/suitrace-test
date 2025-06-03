import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, ShoppingCart, Info, Award, MapPin, Calendar, Tag, User, ArrowRight } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { Card, CardContent } from '../components/ui/Card';
import { mockProducts, mockTraceabilityRecords } from '../data/mockData';
import { Product, TraceabilityRecord } from '../types';
import { useCart } from '../context/CartContext';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [traceRecord, setTraceRecord] = useState<TraceabilityRecord | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const { addToCart } = useCart();

  useEffect(() => {
    // In a real app, this would be an API call
    if (id) {
      const foundProduct = mockProducts.find(p => p.id === id);
      if (foundProduct) {
        setProduct(foundProduct);
        
        // Find trace record
        const foundTraceRecord = mockTraceabilityRecords.find(
          t => t.id === foundProduct.traceabilityId
        );
        if (foundTraceRecord) {
          setTraceRecord(foundTraceRecord);
        }
      }
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <p>Product not found</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link to="/marketplace" className="inline-flex items-center text-green-600 hover:text-green-700">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Marketplace
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div>
            <div className="bg-white rounded-lg overflow-hidden shadow-md mb-4">
              <img 
                src={product.images[activeImage]} 
                alt={product.name} 
                className="w-full h-96 object-cover"
              />
            </div>
            
            {product.images.length > 1 && (
              <div className="flex space-x-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`w-20 h-20 rounded-md overflow-hidden ${
                      activeImage === index ? 'ring-2 ring-green-500' : 'opacity-70'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Details */}
          <div>
            <div className="flex flex-wrap gap-2 mb-2">
              {product.tags.map(tag => (
                <Badge key={tag} variant={tag === 'organic' ? 'success' : tag === 'fair-trade' ? 'info' : 'default'}>
                  {tag.replace('-', ' ')}
                </Badge>
              ))}
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold text-green-700">${product.price.toFixed(2)}</span>
              <span className="text-gray-500 ml-2">per {product.unit}</span>
            </div>
            
            <p className="text-gray-600 mb-6">{product.description}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-start">
                <User className="h-5 w-5 text-gray-500 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Farmer</p>
                  <p className="font-medium">{product.farmerName}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-500 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Origin</p>
                  <p className="font-medium">{product.location}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Harvest Date</p>
                  <p className="font-medium">{new Date(product.harvestDate).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Tag className="h-5 w-5 text-gray-500 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Category</p>
                  <p className="font-medium">{product.category}</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center border border-gray-300 rounded-md">
                <button
                  type="button"
                  className="p-2 text-gray-500 hover:text-gray-700"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <span className="px-2">-</span>
                </button>
                <span className="px-4 py-2">{quantity}</span>
                <button
                  type="button"
                  className="p-2 text-gray-500 hover:text-gray-700"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <span className="px-2">+</span>
                </button>
              </div>
              
              <Button
                variant="primary"
                onClick={handleAddToCart}
                className="flex-1"
                rightIcon={<ShoppingCart className="h-5 w-5" />}
              >
                Add to Cart
              </Button>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4 flex items-start">
              <Award className="h-6 w-6 text-green-600 mr-3 mt-1" />
              <div>
                <h3 className="font-medium text-green-800 mb-1">Blockchain Verified</h3>
                <p className="text-green-700 text-sm">
                  This product's journey is verified on the Sui blockchain, ensuring authenticity and transparency.
                </p>
                <Link 
                  to={`/traceability/${product.traceabilityId}`}
                  className="mt-2 inline-flex items-center text-green-700 hover:text-green-800 text-sm font-medium"
                >
                  View Complete Traceability
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Traceability Preview */}
        {traceRecord && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Journey</h2>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="h-1 w-full bg-gray-200"></div>
              </div>
              
              <div className="relative flex justify-between">
                {traceRecord.events.slice(0, 3).map((event, index) => {
                  const date = new Date(event.timestamp);
                  const formattedDate = date.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  });
                  
                  return (
                    <div key={event.id} className="flex flex-col items-center">
                      <div className="bg-white h-8 w-8 rounded-full border-2 border-green-600 flex items-center justify-center">
                        <span className="text-xs font-bold text-green-600">{index + 1}</span>
                      </div>
                      <div className="mt-2 text-center">
                        <div className="text-sm font-medium text-gray-900">
                          {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                        </div>
                        <div className="text-xs text-gray-500">{formattedDate}</div>
                      </div>
                    </div>
                  );
                })}
                
                <div className="flex flex-col items-center">
                  <div className="bg-white h-8 w-8 rounded-full border-2 border-gray-300 flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-400">...</span>
                  </div>
                  <div className="mt-2 text-center">
                    <div className="text-sm font-medium text-gray-700">
                      <Link 
                        to={`/traceability/${product.traceabilityId}`}
                        className="text-green-600 hover:text-green-700"
                      >
                        View Full Journey
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockProducts
              .filter(p => p.id !== product.id && p.category === product.category)
              .slice(0, 4)
              .map(relatedProduct => (
                <Card key={relatedProduct.id} className="h-full">
                  <Link to={`/product/${relatedProduct.id}`}>
                    <img 
                      src={relatedProduct.images[0]} 
                      alt={relatedProduct.name} 
                      className="w-full h-48 object-cover"
                    />
                  </Link>
                  <CardContent>
                    <h3 className="font-medium text-gray-900">
                      <Link to={`/product/${relatedProduct.id}`} className="hover:text-green-600">
                        {relatedProduct.name}
                      </Link>
                    </h3>
                    <div className="flex justify-between items-center mt-2">
                      <span className="font-bold text-green-700">${relatedProduct.price.toFixed(2)}</span>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => addToCart(relatedProduct)}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetailPage;