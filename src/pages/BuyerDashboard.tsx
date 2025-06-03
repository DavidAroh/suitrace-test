import React, { useState } from 'react';
import { ShoppingBag, CheckCircle2, Truck, ShoppingCart } from 'lucide-react';
import Layout from '../components/layout/Layout';
import OrderStatusCard from '../components/delivery/OrderStatusCard';
import WalletInfo from '../components/wallet/WalletInfo';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { mockOrders } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { WalletInfo as WalletInfoType } from '../types';
import { Link } from 'react-router-dom';

const BuyerDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');
  const [walletInfo, setWalletInfo] = useState<WalletInfoType>({
    connected: user?.walletConnected || false,
    type: 'suiWallet',
    address: user?.walletConnected ? '0x456...abc' : undefined,
    balance: user?.walletConnected ? 562.89 : undefined,
  });

  // Filter orders for the current buyer
  const buyerOrders = mockOrders.filter(o => o.buyerId === user?.id);
  
  const activeOrders = buyerOrders.filter(o => 
    o.status === 'pending' || 
    o.status === 'processing' || 
    o.status === 'in-transit' ||
    o.status === 'delivered'
  );
  
  const completedOrders = buyerOrders.filter(o => 
    o.status === 'completed' || 
    o.status === 'disputed'
  );

  if (!user || user.role !== 'buyer') {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <p>You need to be logged in as a buyer to view this page.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Buyer Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user.name}</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      <ShoppingBag className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Active Orders</p>
                      <p className="text-xl font-bold">{activeOrders.length}</p>
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
                      <p className="text-xl font-bold">
                        {activeOrders.filter(o => o.status === 'in-transit').length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <div className="bg-green-100 p-3 rounded-full mr-4">
                      <CheckCircle2 className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Completed</p>
                      <p className="text-xl font-bold">{completedOrders.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab('active')}
                  className={`px-4 py-3 text-sm font-medium ${
                    activeTab === 'active'
                      ? 'text-green-600 border-b-2 border-green-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Active Orders
                </button>
                <button
                  onClick={() => setActiveTab('completed')}
                  className={`px-4 py-3 text-sm font-medium ${
                    activeTab === 'completed'
                      ? 'text-green-600 border-b-2 border-green-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Order History
                </button>
              </div>
              
              <div className="p-4">
                {activeTab === 'active' && (
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-medium text-gray-900">Active Orders</h2>
                      <Link to="/marketplace">
                        <Button 
                          variant="outline" 
                          size="sm"
                          leftIcon={<ShoppingCart className="h-4 w-4" />}
                        >
                          Shop More
                        </Button>
                      </Link>
                    </div>
                    
                    {activeOrders.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-gray-500">No active orders</p>
                        <Link to="/marketplace">
                          <Button 
                            variant="primary"
                            className="mt-4"
                          >
                            Browse Marketplace
                          </Button>
                        </Link>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {activeOrders.map(order => (
                          <OrderStatusCard 
                            key={order.id} 
                            order={order} 
                            userRole="buyer" 
                            onActionClick={() => {
                              // In a real app, this would handle order confirmation
                              console.log('Confirming order receipt:', order.id);
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}
                
                {activeTab === 'completed' && (
                  <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Order History</h2>
                    
                    {completedOrders.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-gray-500">No completed orders</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {completedOrders.map(order => (
                          <OrderStatusCard 
                            key={order.id} 
                            order={order} 
                            userRole="buyer"
                          />
                        ))}
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
                  balance: 500 + Math.random() * 500,
                });
              }}
            />
            
            <Card className="mt-4">
              <CardHeader>
                <h3 className="text-lg font-medium text-gray-900">Payment Summary</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Spent</span>
                    <span className="font-medium">
                      ${completedOrders.reduce((sum, o) => sum + o.totalAmount, 0).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">In Escrow</span>
                    <span className="font-medium">
                      ${activeOrders.reduce((sum, o) => sum + o.totalAmount, 0).toFixed(2)}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-gray-100">
                    <Button
                      variant="outline"
                      fullWidth
                    >
                      View Transaction History
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-4">
              <CardHeader>
                <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link to="/marketplace">
                  <Button
                    variant="primary"
                    fullWidth
                    leftIcon={<ShoppingCart className="h-4 w-4" />}
                  >
                    Browse Marketplace
                  </Button>
                </Link>
                <Button variant="outline" fullWidth>
                  View Saved Products
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BuyerDashboard;