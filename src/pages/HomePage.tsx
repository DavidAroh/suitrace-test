import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, QrCode, Truck, LineChart, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import Layout from '../components/layout/Layout';

const HomePage: React.FC = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-900 to-green-700 text-white">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Trace and Trade Agricultural Products with Blockchain Security
            </h1>
            <p className="text-xl mb-8">
              SuiTrace combines supply chain traceability with a decentralized marketplace, 
              giving farmers, buyers, and transporters a secure and transparent platform.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                variant="secondary"
                size="lg"
                leftIcon={<ShoppingBag className="h-5 w-5" />}
                as={Link}
                to="/marketplace"
              >
                Browse Marketplace
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="text-white border-white hover:bg-white hover:text-green-700"
                as={Link}
                to="/how-it-works"
              >
                Learn How It Works
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How SuiTrace Works</h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600">
              Our platform combines blockchain traceability with marketplace functionality, creating a trusted ecosystem for agricultural trade.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-t-4 border-green-600">
              <CardContent className="pt-6">
                <div className="bg-green-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <ShoppingBag className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Farm to Marketplace</h3>
                <p className="text-gray-600">
                  Farmers list their products with full transparency about origin, farming practices, and pricing.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-t-4 border-orange-500">
              <CardContent className="pt-6">
                <div className="bg-orange-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <QrCode className="h-6 w-6 text-orange-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">QR Traceability</h3>
                <p className="text-gray-600">
                  Every product has a unique QR code that tracks its journey from farm to consumer, verified on the blockchain.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-t-4 border-blue-500">
              <CardContent className="pt-6">
                <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Truck className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Smart Delivery</h3>
                <p className="text-gray-600">
                  Transporters scan QR codes at pickup and delivery, with funds held in escrow until delivery confirmation.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-t-4 border-purple-500">
              <CardContent className="pt-6">
                <div className="bg-purple-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <LineChart className="h-6 w-6 text-purple-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Blockchain Security</h3>
                <p className="text-gray-600">
                  All transactions and supply chain events are securely recorded on the Sui blockchain.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* User Roles Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">For Every Supply Chain Participant</h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600">
              SuiTrace provides tailored experiences for each role in the agricultural supply chain.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
              <img 
                src="https://images.pexels.com/photos/2933243/pexels-photo-2933243.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="Farmer" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">For Farmers</h3>
                <ul className="mb-4 space-y-2">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>List and manage products with full transparency</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Receive secure payments through blockchain escrow</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Build reputation through verified traceability</span>
                  </li>
                </ul>
                <Link 
                  to="/farmer-dashboard"
                  className="inline-flex items-center text-green-600 hover:text-green-700"
                >
                  Farmer Dashboard
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
              <img 
                src="https://images.pexels.com/photos/8939711/pexels-photo-8939711.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="Buyer" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">For Buyers</h3>
                <ul className="mb-4 space-y-2">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Access verified product information and origins</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Secure transactions with blockchain-based escrow</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Track orders in real-time through the supply chain</span>
                  </li>
                </ul>
                <Link 
                  to="/marketplace"
                  className="inline-flex items-center text-green-600 hover:text-green-700"
                >
                  Browse Marketplace
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
              <img 
                src="https://images.pexels.com/photos/4393668/pexels-photo-4393668.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="Transporter" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">For Transporters</h3>
                <ul className="mb-4 space-y-2">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Simple QR scanning for pickup and delivery confirmation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Automatic payment release upon delivery confirmation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Build reputation through on-time, verified deliveries</span>
                  </li>
                </ul>
                <Link 
                  to="/transporter-dashboard"
                  className="inline-flex items-center text-green-600 hover:text-green-700"
                >
                  Transporter Dashboard
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-700 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Agricultural Supply Chain?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join SuiTrace today and experience the benefits of blockchain-powered traceability and trading.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              variant="secondary"
              size="lg"
              as={Link}
              to="/marketplace"
            >
              Explore Marketplace
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="text-white border-white hover:bg-white hover:text-green-700"
              as={Link}
              to="/register"
            >
              Create Account
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;