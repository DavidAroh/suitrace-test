import React from 'react';
import { Wallet, Check, AlertCircle, ExternalLink } from 'lucide-react';
import Button from '../ui/Button';
import { Card, CardHeader, CardContent, CardFooter } from '../ui/Card';
import { WalletInfo as WalletInfoType } from '../../types';

interface WalletInfoProps {
  walletInfo: WalletInfoType;
  onConnectWallet: () => void;
}

const WalletInfo: React.FC<WalletInfoProps> = ({ walletInfo, onConnectWallet }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center space-x-2">
          <Wallet className="h-5 w-5 text-green-600" />
          <h3 className="text-lg font-medium">Wallet</h3>
        </div>
        
        {walletInfo.connected ? (
          <div className="flex items-center text-sm text-green-600">
            <Check className="h-4 w-4 mr-1" />
            Connected
          </div>
        ) : (
          <div className="flex items-center text-sm text-gray-500">
            <AlertCircle className="h-4 w-4 mr-1" />
            Not Connected
          </div>
        )}
      </CardHeader>
      
      <CardContent className="space-y-4">
        {walletInfo.connected ? (
          <>
            <div>
              <p className="text-sm text-gray-500">Wallet Type</p>
              <p className="font-medium">
                {walletInfo.type === 'zkLogin' ? 'zkLogin (OAuth)' : 'Sui Wallet'}
              </p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Address</p>
              <div className="flex items-center">
                <p className="font-mono text-sm truncate max-w-[200px]">
                  {walletInfo.address}
                </p>
                <a
                  href={`https://explorer.sui.io/address/${walletInfo.address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 text-green-600 hover:text-green-700"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Balance</p>
              <p className="font-medium">{walletInfo.balance} SUI</p>
            </div>
          </>
        ) : (
          <div className="text-center py-4">
            <p className="text-gray-500 mb-4">
              Connect your wallet to access the full features of SuiTrace
            </p>
            
            <Button
              variant="primary"
              onClick={onConnectWallet}
              className="mb-2"
            >
              Connect with zkLogin
            </Button>
            
            <Button
              variant="outline"
              onClick={onConnectWallet}
            >
              Connect Sui Wallet
            </Button>
          </div>
        )}
      </CardContent>
      
      {walletInfo.connected && (
        <CardFooter className="border-t border-gray-100 pt-4">
          <div className="w-full">
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => {
                // In a real app, this would disconnect the wallet
              }}
            >
              Disconnect Wallet
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default WalletInfo;