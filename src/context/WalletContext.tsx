import React, { createContext, useState, useContext, useEffect } from 'react';
import { WalletInfo } from '../types';
import { useAuth } from './AuthContext';

interface WalletContextType {
  walletInfo: WalletInfo;
  connectWallet: (type: 'zkLogin' | 'suiWallet') => Promise<void>;
  disconnectWallet: () => void;
}

const WalletContext = createContext<WalletContextType>({
  walletInfo: { connected: false, type: 'none' },
  connectWallet: async () => {},
  disconnectWallet: () => {},
});

export const useWallet = () => useContext(WalletContext);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [walletInfo, setWalletInfo] = useState<WalletInfo>({ connected: false, type: 'none' });

  useEffect(() => {
    // If user is logged in and has wallet connected, initialize the wallet info
    if (user?.walletConnected) {
      setWalletInfo({
        connected: true,
        address: `0x${Math.random().toString(36).substring(2, 12)}...${Math.random().toString(36).substring(2, 12)}`,
        balance: Math.floor(Math.random() * 100) + 1,
        type: Math.random() > 0.5 ? 'zkLogin' : 'suiWallet',
      });
    } else {
      setWalletInfo({ connected: false, type: 'none' });
    }
  }, [user]);

  const connectWallet = async (type: 'zkLogin' | 'suiWallet') => {
    try {
      // In a real app, this would connect to the actual wallet
      // For demo, we'll simulate the connection
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate connection delay
      
      setWalletInfo({
        connected: true,
        address: `0x${Math.random().toString(36).substring(2, 12)}...${Math.random().toString(36).substring(2, 12)}`,
        balance: Math.floor(Math.random() * 100) + 1,
        type,
      });
      
      return Promise.resolve();
    } catch (error) {
      console.error('Wallet connection error:', error);
      return Promise.reject(error);
    }
  };

  const disconnectWallet = () => {
    setWalletInfo({ connected: false, type: 'none' });
  };

  return (
    <WalletContext.Provider
      value={{
        walletInfo,
        connectWallet,
        disconnectWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};