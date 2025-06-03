import React, { useState, useEffect } from 'react';
import { Package, FileText, TrendingUp, Truck, Plus } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import OrderStatusCard from '../components/delivery/OrderStatusCard';
import WalletInfo from '../components/wallet/WalletInfo';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { mockOrders, mockProducts } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { WalletInfo as WalletInfoType } from '../types';

const FarmerDashboard: React.FC = () => {
  const { user } = useAuth();
  const [farmerOrders, setFarmerOrders] = useState(mockOrders);
  const [farmerProducts, setFarmerProducts] = useState(mockProducts);
  const [walletInfo, setWalletInfo] = useState<WalletInfoType>({
    connected: user?.walletConnected || false,
    type: 'zkLogin',
    address: user?.walletConnected ? '0x123...abc' : undefined,
    balance: user?.walletConnected ? 245.75 : undefined,
  });
  
  const [activeTab, setActiveTab] = useState('orders');

  useEffect(() => {
    if (user) {
      // Filter orders based on farmer products
      const farmerProductIds = mockProducts
        .filter(p => p.farmerId === user.id)
        .map(p => p.id);
      
      const filteredOrders = mockOrders.filter(order => 
        order.products.some(p => farmerProductIds.includes(p.productId))
      );
      
      setFarmerOrders(filteredOrders);
      setFarmerProducts(mockProducts.filter(p => p.farmerId === user.id));
    }
  }, [user]);

  if (!user || user.role !== 'farmer') {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <p>You need to be logged in as a farmer to view this page.</p>
        </div>
      </Layout>
    );
  }

  const pendingOrders = farmerOrders.filter(o => o.status === 'pending' || o.status === 'processing');
  const completedOrders = farmerOrders.filter(o => o.status === 'completed');
  const inTransitOrders = farmerOrders.filter(o => o.status === 'in-transit');
  
  const totalSales = farmerOrders
    .filter(o => o.status === 'completed')
    .reduce((sum, order) => sum + order.totalAmount, 0);
  
  const totalProducts = farmerProducts.length;
  
  const productsAvailable = farmerProducts.filter(p => p.available).length;

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Farmer Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user.name}</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <div className="bg-green-100 p-3 rounded-full mr-4">
                      <FileText className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Pending Orders</p>
                      <p className="text-xl font-bold">{pendingOrders.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <div className="bg-orange-100 p-3 rounded-full mr-4">
                      <Truck className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">In Transit</p>
                      <p className="text-xl font-bold">{inTransitOrders.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      <Package className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Products</p>
                      <p className="text-xl font-bold">{productsAvailable}/{totalProducts}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <div className="bg-purple-100 p-3 rounded-full mr-4">
                      <TrendingUp className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total Sales</p>
                      <p className="text-xl font-bold">${totalSales.toFixed(2)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`px-4 py-3 text-sm font-medium ${
                    activeTab === 'orders'
                      ? 'text-green-600 border-b-2 border-green-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Orders
                </button>
                <button
                  onClick={() => setActiveTab('products')}
                  className={`px-4 py-3 text-sm font-medium ${
                    activeTab === 'products'
                      ? 'text-green-600 border-b-2 border-green-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  My Products
                </button>
              </div>
              
              <div className="p-4">
                {activeTab === 'orders' ? (
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-medium text-gray-900">Recent Orders</h2>
                    </div>
                    
                    {farmerOrders.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-gray-500">No orders yet</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {farmerOrders.slice(0, 4).map(order => (
                          <OrderStatusCard 
                            key={order.id} 
                            order={order} 
                            userRole="farmer" 
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-medium text-gray-900">My Products</h2>
                      <Button 
                        variant="outline" 
                        size="sm"
                        leftIcon={<Plus className="h-4 w-4" />}
                      >
                        Add New Product
                      </Button>
                    </div>
                    
                    {farmerProducts.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-gray-500">No products listed yet</p>
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Product
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Price
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Quantity
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {farmerProducts.map(product => (
                              <tr key={product.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10">
                                      <img className="h-10 w-10 rounded-md object-cover" src={product.images[0]} alt={product.name} />
                                    </div>
                                    <div className="ml-4">
                                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                      <div className="text-sm text-gray-500">{product.category}</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">${product.price.toFixed(2)}</div>
                                  <div className="text-sm text-gray-500">per {product.unit}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">{product.quantity} {product.unit}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    product.available 
                                      ? 'bg-green-100 text-green-800' 
                                      : 'bg-gray-100 text-gray-800'
                                  }`}>
                                    {product.available ? 'Available' : 'Unavailable'}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  <button className="text-green-600 hover:text-green-900 mr-3">Edit</button>
                                  <button className="text-red-600 hover:text-red-900">Delete</button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div>
            <WalletInfo 
              walletInfo={walletInfo} 
              onConnectWallet={() => {
                // In a real app, this would connect to a wallet
                setWalletInfo({
                  ...walletInfo,
                  connected: true,
                  address: '0x' + Math.random().toString(36).substring(2, 10),
                  balance: 100 + Math.random() * 300,
                });
              }}
            />
            
            <Card className="mt-4">
              <CardHeader>
                <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" fullWidth leftIcon={<Plus className="h-4 w-4" />}>
                  Add New Product
                </Button>
                <Button variant="outline" fullWidth>
                  Download Sales Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FarmerDashboard;