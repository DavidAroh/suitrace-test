import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MarketplacePage from './pages/MarketplacePage';
import ProductDetailPage from './pages/ProductDetailPage';
import TraceabilityPage from './pages/TraceabilityPage';
import FarmerDashboard from './pages/FarmerDashboard';
import BuyerDashboard from './pages/BuyerDashboard';
import TransporterDashboard from './pages/TransporterDashboard';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WalletProvider } from './context/WalletContext';

function App() {
  return (
    <AuthProvider>
      <WalletProvider>
        <CartProvider>
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/marketplace" element={<MarketplacePage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/traceability" element={<TraceabilityPage />} />
              <Route path="/traceability/:id" element={<TraceabilityPage />} />
              <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
              <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
              <Route path="/transporter-dashboard" element={<TransporterDashboard />} />
            </Routes>
          </Router>
        </CartProvider>
      </WalletProvider>
    </AuthProvider>
  );
}

export default App;