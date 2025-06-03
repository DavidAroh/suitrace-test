import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-green-700">SuiTrace</span>
            </Link>
            <p className="mt-2 text-sm text-gray-600">
              A traceability-powered Farming Supply Chain Marketplace combining commerce and blockchain technology.
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-gray-700">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Marketplace</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/marketplace" className="text-sm text-gray-600 hover:text-green-600">
                  Browse Products
                </Link>
              </li>
              <li>
                <Link to="/marketplace?category=fruits" className="text-sm text-gray-600 hover:text-green-600">
                  Fruits & Vegetables
                </Link>
              </li>
              <li>
                <Link to="/marketplace?category=grains" className="text-sm text-gray-600 hover:text-green-600">
                  Grains & Cereals
                </Link>
              </li>
              <li>
                <Link to="/marketplace?category=coffee" className="text-sm text-gray-600 hover:text-green-600">
                  Coffee & Tea
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">For Users</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/farmer-dashboard" className="text-sm text-gray-600 hover:text-green-600">
                  Farmer Dashboard
                </Link>
              </li>
              <li>
                <Link to="/buyer-dashboard" className="text-sm text-gray-600 hover:text-green-600">
                  Buyer Dashboard
                </Link>
              </li>
              <li>
                <Link to="/transporter-dashboard" className="text-sm text-gray-600 hover:text-green-600">
                  Transporter Dashboard
                </Link>
              </li>
              <li>
                <Link to="/traceability" className="text-sm text-gray-600 hover:text-green-600">
                  Traceability
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/about" className="text-sm text-gray-600 hover:text-green-600">
                  About SuiTrace
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-sm text-gray-600 hover:text-green-600">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/blockchain" className="text-sm text-gray-600 hover:text-green-600">
                  Blockchain Integration
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-sm text-gray-600 hover:text-green-600">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            &copy; {new Date().getFullYear()} SuiTrace. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;