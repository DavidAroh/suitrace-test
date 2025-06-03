import React from 'react';
import { X, ShoppingCart, Trash2 } from 'lucide-react';
import Button from '../ui/Button';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="relative w-screen max-w-md">
          <div className="h-full flex flex-col bg-white shadow-xl overflow-y-auto">
            <div className="flex items-center justify-between px-4 py-6 sm:px-6 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900 flex items-center">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Your Cart
              </h2>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-500"
                onClick={onClose}
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="flex-1 px-4 py-6 sm:px-6 overflow-y-auto">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <ShoppingCart className="h-16 w-16 text-gray-300 mb-4" />
                  <p className="text-gray-500">Your cart is empty</p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={onClose}
                  >
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <ul role="list" className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <li key={item.product.id} className="py-4 flex">
                      <div className="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="ml-4 flex-1 flex flex-col">
                        <div className="flex justify-between">
                          <h3 className="text-sm font-medium text-gray-900">
                            <Link to={`/product/${item.product.id}`} className="hover:text-green-600">
                              {item.product.name}
                            </Link>
                          </h3>
                          <p className="text-sm font-medium text-gray-900">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                        
                        <p className="mt-1 text-sm text-gray-500">
                          ${item.product.price.toFixed(2)} per {item.product.unit}
                        </p>
                        
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center border border-gray-300 rounded-md">
                            <button
                              type="button"
                              className="p-1 text-gray-500 hover:text-gray-700"
                              onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                            >
                              <span className="px-2">-</span>
                            </button>
                            <span className="px-2 py-1 text-sm">{item.quantity}</span>
                            <button
                              type="button"
                              className="p-1 text-gray-500 hover:text-gray-700"
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            >
                              <span className="px-2">+</span>
                            </button>
                          </div>
                          
                          <button
                            type="button"
                            className="text-red-500 hover:text-red-600"
                            onClick={() => removeFromCart(item.product.id)}
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            
            {cartItems.length > 0 && (
              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                  <p>Subtotal</p>
                  <p>${totalAmount.toFixed(2)}</p>
                </div>
                
                <p className="text-sm text-gray-500 mb-6">
                  Shipping and taxes calculated at checkout.
                </p>
                
                <div className="space-y-3">
                  <Button
                    variant="primary"
                    fullWidth
                    onClick={() => {
                      onClose();
                      // Navigate to checkout
                    }}
                  >
                    Checkout
                  </Button>
                  
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={clearCart}
                  >
                    Clear Cart
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;