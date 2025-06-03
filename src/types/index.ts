export type UserRole = 'farmer' | 'buyer' | 'transporter' | 'admin';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  location: string;
  walletConnected: boolean;
  avatar?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  unit: string;
  category: string;
  farmerId: string;
  farmerName: string;
  location: string;
  harvestDate: string;
  images: string[];
  tags: string[];
  available: boolean;
  traceabilityId: string;
}

export interface TraceabilityRecord {
  id: string;
  productId: string;
  events: TraceabilityEvent[];
}

export interface TraceabilityEvent {
  id: string;
  timestamp: string;
  type: 'harvest' | 'processing' | 'packaging' | 'shipping' | 'delivered';
  location: string;
  handledBy: string;
  handledByRole: UserRole;
  notes?: string;
  verifiedOnChain: boolean;
  transactionId?: string;
}

export interface Order {
  id: string;
  buyerId: string;
  buyerName: string;
  products: OrderProduct[];
  status: 'pending' | 'processing' | 'in-transit' | 'delivered' | 'completed' | 'disputed';
  totalAmount: number;
  escrowId?: string;
  createdAt: string;
  updatedAt: string;
  deliveryAddress: string;
  transporterId?: string;
  transporterName?: string;
  estimatedDelivery?: string;
  actualDelivery?: string;
  traceabilityId: string;
}

export interface OrderProduct {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface WalletInfo {
  connected: boolean;
  address?: string;
  balance?: number;
  type: 'zkLogin' | 'suiWallet' | 'none';
}