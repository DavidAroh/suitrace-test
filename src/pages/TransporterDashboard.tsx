import React, { useState } from 'react';
import { Truck, CheckCircle2, Clock, Package } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import OrderStatusCard from '../components/delivery/OrderStatusCard';
import QRScanSection from '../components/traceability/QRScanSection';
import WalletInfo from '../components/wallet/WalletInfo';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { mockOrders } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { WalletInfo as WalletInfoType } from '../types';

const TransporterDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'available' | 'in-transit' | 'completed'>('available');
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [walletInfo, setWalletInfo] = useState<WalletInfoType>({
    connected: user?.walletConnected || false,
    type: 'zkLogin',
    address: user?.walletConnected ? '0x789...def' : undefined,
    balance: user?.walletConnected ? 123.45 : undefined,
  });

  // Filter orders
  const availableOrders = mockOrders.filter(o => o.status === 'processing' && !o.transporterId);
  const inTransitOrders = mockOrders.filter(o => o.status === 'in-transit' && o.transporterId === user?.id);
  const completedOrders = mockOrders.filter(o => 
    (o.status === 'delivered' || o.status === 'completed') && 
    o.transporterId === user?.id
  );

  if (!user || user.role !== 'transporter') {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <p>You need to be logged in as a transporter to view this page.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Transporter Dashboard</h1>
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
                      <Package className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Available Jobs</p>
                      <p className="text-xl font-bold">{availableOrders.length}</p>
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
            
            {/* QR Scan Section (conditional) */}
            {selectedOrder && (
              <div className="mb-6">
                <QRScanSection 
                  onScanComplete={(code) => {
                    // In a real app, this would process the QR code
                    console.log('QR Code scanned:', code);
                    
                    // Reset selected order after scanning
                    setTimeout(() => {
                      setSelectedOrder(null);
                    }, 3000);
                  }}
                  type={inTransitOrders.some(o => o.id === selectedOrder) ? 'delivery' : 'pickup'}
                />
              </div>
            )}
            
            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab('available')}
                  className={`px-4 py-3 text-sm font-medium ${
                    activeTab === 'available'
                      ? 'text-green-600 border-b-2 border-green-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Available Jobs
                </button>
                <button
                  onClick={() => setActiveTab('in-transit')}
                  className={`px-4 py-3 text-sm font-medium ${
                    activeTab === 'in-transit'
                      ? 'text-green-600 border-b-2 border-green-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  In Transit
                </button>
                <button
                  onClick={() => setActiveTab('completed')}
                  className={`px-4 py-3 text-sm font-medium ${
                    activeTab === 'completed'
                      ? 'text-green-600 border-b-2 border-green-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Completed
                </button>
              </div>
              
              <div className="p-4">
                {activeTab === 'available' && (
                  <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Available Delivery Jobs</h2>
                    
                    {availableOrders.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-gray-500">No available jobs at the moment</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {availableOrders.map(order => (
                          <OrderStatusCard 
                            key={order.id} 
                            order={order} 
                            userRole="transporter"
                            onActionClick={() => setSelectedOrder(order.id)}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}
                
                {activeTab === 'in-transit' && (
                  <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Orders In Transit</h2>
                    
                    {inTransitOrders.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-gray-500">No orders in transit</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {inTransitOrders.map(order => (
                          <OrderStatusCard 
                            key={order.id} 
                            order={order} 
                            userRole="transporter"
                            onActionClick={() => setSelectedOrder(order.id)}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}
                
                {activeTab === 'completed' && (
                  <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Completed Deliveries</h2>
                    
                    {completedOrders.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-gray-500">No completed deliveries</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {completedOrders.map(order => (
                          <OrderStatusCard 
                            key={order.id} 
                            order={order} 
                            userRole="transporter"
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
                  balance: 100 + Math.random() * 300,
                });
              }}
            />
            
            <Card className="mt-4">
              <CardHeader>
                <h3 className="text-lg font-medium text-gray-900">Delivery Schedule</h3>
              </CardHeader>
              <CardContent>
                {inTransitOrders.length === 0 ? (
                  <p className="text-gray-500 text-sm">No scheduled deliveries</p>
                ) : (
                  <div className="space-y-4">
                    {inTransitOrders.map(order => (
                      <div key={order.id} className="flex items-start">
                        <div className="mr-3 mt-1">
                          <Clock className="h-5 w-5 text-gray-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            Delivery to {order.buyerName}
                          </p>
                          <p className="text-xs text-gray-500">
                            {order.deliveryAddress}
                          </p>
                          <p className="text-xs text-gray-500">
                            Est. delivery: {new Date(order.estimatedDelivery || '').toLocaleDateString()}
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-2"
                            onClick={() => setSelectedOrder(order.id)}
                          >
                            Scan to Deliver
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TransporterDashboard;