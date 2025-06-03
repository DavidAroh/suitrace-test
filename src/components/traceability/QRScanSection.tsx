import React, { useState } from 'react';
import { QrCode, Scan, Check } from 'lucide-react';
import Button from '../ui/Button';

interface QRScanSectionProps {
  onScanComplete: (code: string) => void;
  type: 'pickup' | 'delivery';
}

const QRScanSection: React.FC<QRScanSectionProps> = ({ onScanComplete, type }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [qrCode, setQrCode] = useState('');

  const startScanning = () => {
    setIsScanning(true);
    
    // Simulate scanning (in a real app, this would use a camera API)
    setTimeout(() => {
      const mockQrCode = `SUI-${Math.random().toString(36).substring(2, 10)}`;
      setQrCode(mockQrCode);
      setIsScanning(false);
      setScanComplete(true);
      onScanComplete(mockQrCode);
    }, 2000);
  };

  const resetScan = () => {
    setScanComplete(false);
    setQrCode('');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <QrCode className="h-6 w-6 text-green-600 mr-2" />
        <h3 className="text-lg font-medium text-gray-900">
          {type === 'pickup' ? 'Scan QR Code for Pickup' : 'Scan QR Code for Delivery'}
        </h3>
      </div>
      
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 flex flex-col items-center justify-center">
        {!isScanning && !scanComplete ? (
          <div className="text-center">
            <div className="mb-4">
              <QrCode className="h-20 w-20 text-gray-400 mx-auto" />
            </div>
            <p className="text-gray-600 mb-6">
              {type === 'pickup' 
                ? 'Scan the QR code on the package to confirm pickup' 
                : 'Scan the QR code on the package to confirm delivery'}
            </p>
            <Button 
              variant="primary"
              onClick={startScanning}
              leftIcon={<Scan className="h-5 w-5" />}
            >
              Start Scanning
            </Button>
          </div>
        ) : isScanning ? (
          <div className="text-center">
            <div className="relative mb-4">
              <div className="h-48 w-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                <div className="animate-pulse text-gray-400">
                  <Scan className="h-16 w-16" />
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-1 w-full bg-green-500 animate-scan"></div>
              </div>
            </div>
            <p className="text-gray-600 animate-pulse">Scanning...</p>
          </div>
        ) : (
          <div className="text-center">
            <div className="mb-4 bg-green-100 rounded-full p-4 inline-block">
              <Check className="h-12 w-12 text-green-600" />
            </div>
            <h4 className="text-lg font-medium text-gray-900 mb-2">
              {type === 'pickup' ? 'Pickup Confirmed!' : 'Delivery Confirmed!'}
            </h4>
            <p className="text-gray-600 mb-2">QR Code: {qrCode}</p>
            <p className="text-gray-500 text-sm mb-6">
              {type === 'pickup' 
                ? 'This action has been recorded on the blockchain for traceability' 
                : 'This action has been recorded on the blockchain for traceability and funds will be released from escrow'}
            </p>
            <Button 
              variant="outline"
              onClick={resetScan}
            >
              Scan Again
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRScanSection;