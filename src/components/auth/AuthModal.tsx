import React, { useState } from 'react';
import { X, Mail, Lock, LogIn, Github } from 'lucide-react';
import Button from '../ui/Button';
import { useAuth } from '../../context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AuthView = 'login' | 'register';

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [view, setView] = useState<AuthView>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'farmer' | 'buyer' | 'transporter'>('buyer');
  const [isLoading, setIsLoading] = useState(false);

  const { login, register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (view === 'login') {
        // Demo login with one of our mock users
        await login('buyer-1');
      } else {
        // Demo register (would create a user in real app)
        await register({ name, email, role });
      }
      onClose();
    } catch (error) {
      console.error('Authentication error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4 text-center">
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose}></div>
        
        <div className="relative w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left shadow-xl transition-all">
          <div className="absolute right-4 top-4">
            <button
              type="button"
              className="text-gray-400 hover:text-gray-500"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="text-center sm:mt-0">
            <h3 className="text-xl font-semibold leading-6 text-gray-900">
              {view === 'login' ? 'Connect to SuiTrace' : 'Create an Account'}
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              {view === 'login' 
                ? 'Access your account with zkLogin or connect your Sui Wallet' 
                : 'Join the supply chain with a secure blockchain identity'}
            </p>
          </div>
          
          <div className="mt-6 space-y-4">
            <Button 
              variant="outline" 
              fullWidth 
              leftIcon={<Github className="h-5 w-5" />}
              onClick={() => {
                setIsLoading(true);
                setTimeout(() => {
                  // Demo integration with zkLogin
                  login('buyer-1');
                  onClose();
                  setIsLoading(false);
                }, 1500);
              }}
              isLoading={isLoading}
            >
              Continue with Google (zkLogin)
            </Button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">or continue with email</span>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {view === 'register' && (
                <div>
                  <label htmlFor="name\" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <div className="mt-1">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                    />
                  </div>
                </div>
              )}
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="mt-1 relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm pl-10"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm pl-10"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
              
              {view === 'register' && (
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                    I am a
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value as 'farmer' | 'buyer' | 'transporter')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                  >
                    <option value="farmer">Farmer/Producer</option>
                    <option value="buyer">Buyer/Retailer</option>
                    <option value="transporter">Transporter/Logistics</option>
                  </select>
                </div>
              )}
              
              <Button
                type="submit"
                variant="primary"
                fullWidth
                leftIcon={<LogIn className="h-5 w-5" />}
                isLoading={isLoading}
              >
                {view === 'login' ? 'Sign In' : 'Create Account'}
              </Button>
            </form>
            
            <div className="text-center mt-4">
              <button
                type="button"
                className="text-sm text-green-600 hover:text-green-700"
                onClick={() => setView(view === 'login' ? 'register' : 'login')}
              >
                {view === 'login' ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
              </button>
            </div>
            
            <div className="mt-4 text-center text-xs text-gray-500">
              By continuing, you agree to SuiTrace's Terms of Service and Privacy Policy.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;