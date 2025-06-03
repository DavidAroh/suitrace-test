import React, { useState } from 'react';
import { Menu, X, ShoppingCart, User, Search } from 'lucide-react';
import Button from '../ui/Button';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AuthModal from '../auth/AuthModal';
import { useCart } from '../../context/CartContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { cartItems } = useCart();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openAuthModal = () => {
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-green-700">SuiTrace</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/marketplace" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium">
              Marketplace
            </Link>
            <Link to="/traceability" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium">
              Traceability
            </Link>
            {isAuthenticated && user?.role === 'farmer' && (
              <Link to="/farmer-dashboard" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium">
                Farmer Dashboard
              </Link>
            )}
            {isAuthenticated && user?.role === 'buyer' && (
              <Link to="/buyer-dashboard" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium">
                Buyer Dashboard
              </Link>
            )}
            {isAuthenticated && user?.role === 'transporter' && (
              <Link to="/transporter-dashboard" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium">
                Transporter Dashboard
              </Link>
            )}
          </nav>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 rounded-full text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link to="/cart" className="text-gray-700 hover:text-green-600 relative">
                  <ShoppingCart className="h-6 w-6" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItems.length}
                    </span>
                  )}
                </Link>
                <div className="flex items-center">
                  <Link to="/profile" className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      {user?.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                      ) : (
                        <User className="h-5 w-5 text-green-700" />
                      )}
                    </div>
                    <span className="text-sm font-medium text-gray-700">{user?.name}</span>
                  </Link>
                  <button
                    onClick={logout}
                    className="ml-4 text-sm text-gray-500 hover:text-gray-700"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Button 
                variant="primary"
                size="sm"
                onClick={openAuthModal}
              >
                Connect Wallet / Sign In
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link to="/cart" className="text-gray-700 hover:text-green-600 relative">
              <ShoppingCart className="h-6 w-6" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-green-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/marketplace"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Marketplace
            </Link>
            <Link
              to="/traceability"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Traceability
            </Link>
            {isAuthenticated && user?.role === 'farmer' && (
              <Link
                to="/farmer-dashboard"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Farmer Dashboard
              </Link>
            )}
            {isAuthenticated && user?.role === 'buyer' && (
              <Link
                to="/buyer-dashboard"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Buyer Dashboard
              </Link>
            )}
            {isAuthenticated && user?.role === 'transporter' && (
              <Link
                to="/transporter-dashboard"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Transporter Dashboard
              </Link>
            )}
            <div className="pt-4 pb-3 border-t border-gray-200">
              {isAuthenticated ? (
                <div className="flex items-center px-3">
                  <div className="flex-shrink-0">
                    {user?.avatar ? (
                      <img className="h-10 w-10 rounded-full\" src={user.avatar} alt={user.name} />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                        <User className="h-6 w-6 text-green-700" />
                      </div>
                    )}
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">{user?.name}</div>
                    <div className="text-sm font-medium text-gray-500">{user?.email}</div>
                  </div>
                  <button
                    onClick={logout}
                    className="ml-auto flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-gray-500"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="px-3">
                  <Button
                    variant="primary"
                    fullWidth
                    onClick={() => {
                      setIsMenuOpen(false);
                      openAuthModal();
                    }}
                  >
                    Connect Wallet / Sign In
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />
    </header>
  );
};

export default Header;