import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Search, QrCode, Info, ArrowLeft } from 'lucide-react';
import Layout from '../components/layout/Layout';
import TraceabilityTimeline from '../components/traceability/TraceabilityTimeline';
import Button from '../components/ui/Button';
import { mockTraceabilityRecords, mockProducts, mockOrders } from '../data/mockData';
import { TraceabilityRecord, Product, Order } from '../types';
import { Link } from 'react-router-dom';

const TraceabilityPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [traceRecord, setTraceRecord] = useState<TraceabilityRecord | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [order, setOrder] = useState<Order | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<TraceabilityRecord | null>(null);

  useEffect(() => {
    if (id) {
      // Find the trace record
      const foundRecord = mockTraceabilityRecords.find(record => record.id === id);
      if (foundRecord) {
        setTraceRecord(foundRecord);
        
        // Check if this is a product trace or an order trace
        const foundProduct = mockProducts.find(p => p.id === foundRecord.productId);
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          const foundOrder = mockOrders.find(o => o.id === foundRecord.productId);
          if (foundOrder) {
            setOrder(foundOrder);
          }
        }
      }
    }
  }, [id]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) return;
    
    // In a real app, this would make an API call
    // For demo, we'll search through our mock data
    const foundRecord = mockTraceabilityRecords.find(
      record => record.id === searchQuery || record.id.includes(searchQuery)
    );
    
    setSearchResult(foundRecord || null);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            {(product || order) ? (
              <div className="mb-4">
                {product ? (
                  <Link to={`/product/${product.id}`} className="text-green-600 hover:text-green-700 flex items-center">
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Back to {product.name}
                  </Link>
                ) : order && (
                  <Link to={order.buyerId.includes('buyer') ? '/buyer-dashboard' : '/farmer-dashboard'} className="text-green-600 hover:text-green-700 flex items-center">
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Back to Dashboard
                  </Link>
                )}
              </div>
            ) : null}
            
            <div className="flex items-center space-x-3">
              <QrCode className="h-8 w-8 text-green-600" />
              <h1 className="text-2xl font-bold text-gray-900">Supply Chain Traceability</h1>
            </div>
          </div>
          
          {/* Search Form */}
          {!id && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Trace a Product</h2>
              <form onSubmit={handleSearch} className="space-y-4">
                <div>
                  <label htmlFor="traceId" className="block text-sm font-medium text-gray-700 mb-1">
                    Enter Traceability ID or Scan QR Code
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      id="traceId"
                      placeholder="e.g., trace-1, trace-order-1"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 rounded-l-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    />
                    <Button
                      type="submit"
                      variant="primary"
                      className="rounded-l-none"
                    >
                      <Search className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </form>
              
              {searchResult === null && searchQuery && (
                <div className="mt-4 p-4 bg-red-50 rounded-md">
                  <p className="text-red-700">No traceability record found for "{searchQuery}"</p>
                </div>
              )}
              
              {searchResult && (
                <div className="mt-6">
                  <div className="border-l-4 border-green-500 pl-4 py-2">
                    <h3 className="text-lg font-medium text-gray-900">Traceability Record Found!</h3>
                    <p className="text-gray-600">ID: {searchResult.id}</p>
                    <Link
                      to={`/traceability/${searchResult.id}`}
                      className="mt-2 inline-flex items-center text-green-600 hover:text-green-700"
                    >
                      <Info className="h-4 w-4 mr-1" />
                      View Complete Traceability
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* Traceability Timeline */}
          {traceRecord && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="mb-6">
                <h2 className="text-lg font-medium text-gray-900 mb-2">
                  {product 
                    ? `Traceability for ${product.name}` 
                    : order 
                      ? `Traceability for Order #${order.id.substring(6)}` 
                      : 'Traceability Record'}
                </h2>
                <p className="text-gray-600 text-sm">
                  Trace ID: {traceRecord.id}
                </p>
                {product && (
                  <div className="mt-2">
                    <img 
                      src={product.images[0]} 
                      alt={product.name} 
                      className="w-24 h-24 object-cover rounded-md"
                    />
                  </div>
                )}
              </div>
              
              <TraceabilityTimeline events={traceRecord.events} />
              
              <div className="mt-8 bg-green-50 rounded-lg p-4">
                <h3 className="font-medium text-green-800 mb-2">Blockchain Verification</h3>
                <p className="text-green-700 text-sm">
                  All events in this timeline are verified and immutably stored on the Sui blockchain, 
                  providing tamper-proof evidence of this product's journey through the supply chain.
                </p>
              </div>
            </div>
          )}
          
          {/* Demo Trace Records */}
          {!id && !searchResult && (
            <div className="mt-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Demo Trace Records</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {mockTraceabilityRecords.map(record => {
                  const isProductTrace = mockProducts.some(p => p.id === record.productId);
                  const isOrderTrace = mockOrders.some(o => o.id === record.productId);
                  
                  let title = 'Trace Record';
                  let subtitle = '';
                  
                  if (isProductTrace) {
                    const product = mockProducts.find(p => p.id === record.productId);
                    title = product?.name || 'Product';
                    subtitle = `Product ID: ${record.productId}`;
                  } else if (isOrderTrace) {
                    title = `Order #${record.productId.substring(6)}`;
                    subtitle = 'Order Traceability';
                  }
                  
                  return (
                    <div key={record.id} className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 hover:border-green-500 transition-colors">
                      <h3 className="font-medium text-gray-900">{title}</h3>
                      <p className="text-sm text-gray-500">{subtitle}</p>
                      <p className="text-xs text-gray-400 mt-1">Trace ID: {record.id}</p>
                      <p className="text-sm mt-2">
                        {record.events.length} verified events
                      </p>
                      <Link 
                        to={`/traceability/${record.id}`}
                        className="mt-2 inline-flex items-center text-green-600 hover:text-green-700 text-sm"
                      >
                        View Timeline
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default TraceabilityPage;