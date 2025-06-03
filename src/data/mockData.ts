import { Product, User, Order, TraceabilityRecord } from '../types';

export const mockUsers: User[] = [
  {
    id: 'farmer-1',
    name: 'Maria Rodriguez',
    role: 'farmer',
    email: 'maria@farmcoop.com',
    location: 'Jalisco, Mexico',
    walletConnected: true,
    avatar: 'https://images.pexels.com/photos/5303095/pexels-photo-5303095.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'farmer-2',
    name: 'John Harvest',
    role: 'farmer',
    email: 'john@organicfarms.com',
    location: 'California, USA',
    walletConnected: false,
    avatar: 'https://images.pexels.com/photos/8539727/pexels-photo-8539727.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'buyer-1',
    name: 'Green Foods Co.',
    role: 'buyer',
    email: 'procurement@greenfoods.com',
    location: 'Chicago, USA',
    walletConnected: true,
    avatar: 'https://images.pexels.com/photos/3735149/pexels-photo-3735149.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'transporter-1',
    name: 'FastTrack Logistics',
    role: 'transporter',
    email: 'dispatch@fasttrack.com',
    location: 'Texas, USA',
    walletConnected: false,
    avatar: 'https://images.pexels.com/photos/7706455/pexels-photo-7706455.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'admin-1',
    name: 'SuiTrace Admin',
    role: 'admin',
    email: 'admin@suitrace.com',
    location: 'San Francisco, USA',
    walletConnected: true,
    avatar: 'https://images.pexels.com/photos/927022/pexels-photo-927022.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

export const mockProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'Organic Avocados',
    description: 'Fresh, organic Hass avocados grown with sustainable practices. Perfect ripeness and rich flavor.',
    price: 2.50,
    quantity: 500,
    unit: 'kg',
    category: 'Fruits',
    farmerId: 'farmer-1',
    farmerName: 'Maria Rodriguez',
    location: 'Jalisco, Mexico',
    harvestDate: '2025-04-10',
    images: [
      'https://images.pexels.com/photos/2228553/pexels-photo-2228553.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/995043/pexels-photo-995043.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    tags: ['organic', 'sustainable', 'export-quality'],
    available: true,
    traceabilityId: 'trace-1',
  },
  {
    id: 'prod-2',
    name: 'Fair Trade Coffee Beans',
    description: 'Shade-grown Arabica coffee beans from high-altitude farms. Medium roast with notes of chocolate and citrus.',
    price: 12.99,
    quantity: 200,
    unit: 'kg',
    category: 'Coffee & Tea',
    farmerId: 'farmer-1',
    farmerName: 'Maria Rodriguez',
    location: 'Jalisco, Mexico',
    harvestDate: '2025-03-15',
    images: [
      'https://images.pexels.com/photos/2347377/pexels-photo-2347377.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/7433946/pexels-photo-7433946.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    tags: ['fair-trade', 'shade-grown', 'premium'],
    available: true,
    traceabilityId: 'trace-2',
  },
  {
    id: 'prod-3',
    name: 'Organic Strawberries',
    description: 'Sweet and juicy organic strawberries, perfect for desserts or fresh consumption.',
    price: 4.99,
    quantity: 100,
    unit: 'kg',
    category: 'Fruits',
    farmerId: 'farmer-2',
    farmerName: 'John Harvest',
    location: 'California, USA',
    harvestDate: '2025-04-18',
    images: [
      'https://images.pexels.com/photos/46174/strawberries-berries-fruit-freshness-46174.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/70746/strawberries-red-fruit-royalty-free-70746.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    tags: ['organic', 'pesticide-free', 'seasonal'],
    available: true,
    traceabilityId: 'trace-3',
  },
  {
    id: 'prod-4',
    name: 'Organic Quinoa',
    description: 'Protein-rich organic quinoa grown using traditional farming methods.',
    price: 8.50,
    quantity: 300,
    unit: 'kg',
    category: 'Grains',
    farmerId: 'farmer-2',
    farmerName: 'John Harvest',
    location: 'California, USA',
    harvestDate: '2025-02-20',
    images: [
      'https://images.pexels.com/photos/7421262/pexels-photo-7421262.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/7412078/pexels-photo-7412078.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    tags: ['organic', 'gluten-free', 'high-protein'],
    available: true,
    traceabilityId: 'trace-4',
  },
  {
    id: 'prod-5',
    name: 'Wild Honey',
    description: 'Pure, unfiltered wild honey collected from forest hives. Rich in antioxidants and natural enzymes.',
    price: 15.99,
    quantity: 50,
    unit: 'kg',
    category: 'Honey & Sweeteners',
    farmerId: 'farmer-1',
    farmerName: 'Maria Rodriguez',
    location: 'Jalisco, Mexico',
    harvestDate: '2025-03-01',
    images: [
      'https://images.pexels.com/photos/1037832/honey-pot-honey-pot-sweet-yellow-1037832.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/2327211/pexels-photo-2327211.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    tags: ['wild-harvested', 'raw', 'unfiltered'],
    available: true,
    traceabilityId: 'trace-5',
  },
  {
    id: 'prod-6',
    name: 'Heirloom Tomatoes',
    description: 'Colorful mix of heirloom tomato varieties. Perfect for salads and gourmet dishes.',
    price: 3.99,
    quantity: 150,
    unit: 'kg',
    category: 'Vegetables',
    farmerId: 'farmer-2',
    farmerName: 'John Harvest',
    location: 'California, USA',
    harvestDate: '2025-04-15',
    images: [
      'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    tags: ['heirloom', 'non-GMO', 'pesticide-free'],
    available: true,
    traceabilityId: 'trace-6',
  },
];

export const mockOrders: Order[] = [
  {
    id: 'order-1',
    buyerId: 'buyer-1',
    buyerName: 'Green Foods Co.',
    products: [
      {
        productId: 'prod-1',
        name: 'Organic Avocados',
        quantity: 100,
        price: 2.50,
        total: 250,
      },
      {
        productId: 'prod-2',
        name: 'Fair Trade Coffee Beans',
        quantity: 50,
        price: 12.99,
        total: 649.50,
      }
    ],
    status: 'in-transit',
    totalAmount: 899.50,
    escrowId: 'escrow-123',
    createdAt: '2025-04-20T10:30:00Z',
    updatedAt: '2025-04-21T08:15:00Z',
    deliveryAddress: '123 Market St, Chicago, IL',
    transporterId: 'transporter-1',
    transporterName: 'FastTrack Logistics',
    estimatedDelivery: '2025-04-25',
    traceabilityId: 'trace-order-1',
  },
  {
    id: 'order-2',
    buyerId: 'buyer-1',
    buyerName: 'Green Foods Co.',
    products: [
      {
        productId: 'prod-3',
        name: 'Organic Strawberries',
        quantity: 50,
        price: 4.99,
        total: 249.50,
      }
    ],
    status: 'pending',
    totalAmount: 249.50,
    createdAt: '2025-04-22T14:20:00Z',
    updatedAt: '2025-04-22T14:20:00Z',
    deliveryAddress: '123 Market St, Chicago, IL',
    traceabilityId: 'trace-order-2',
  },
  {
    id: 'order-3',
    buyerId: 'buyer-1',
    buyerName: 'Green Foods Co.',
    products: [
      {
        productId: 'prod-5',
        name: 'Wild Honey',
        quantity: 25,
        price: 15.99,
        total: 399.75,
      }
    ],
    status: 'completed',
    totalAmount: 399.75,
    escrowId: 'escrow-456',
    createdAt: '2025-04-10T09:45:00Z',
    updatedAt: '2025-04-15T16:30:00Z',
    deliveryAddress: '123 Market St, Chicago, IL',
    transporterId: 'transporter-1',
    transporterName: 'FastTrack Logistics',
    estimatedDelivery: '2025-04-15',
    actualDelivery: '2025-04-15T14:25:00Z',
    traceabilityId: 'trace-order-3',
  },
];

export const mockTraceabilityRecords: TraceabilityRecord[] = [
  {
    id: 'trace-1',
    productId: 'prod-1',
    events: [
      {
        id: 'event-1',
        timestamp: '2025-04-10T08:30:00Z',
        type: 'harvest',
        location: 'Jalisco, Mexico',
        handledBy: 'Maria Rodriguez',
        handledByRole: 'farmer',
        notes: 'Perfect ripeness, excellent crop this season',
        verifiedOnChain: true,
        transactionId: '0x123abc456def',
      },
      {
        id: 'event-2',
        timestamp: '2025-04-11T10:15:00Z',
        type: 'processing',
        location: 'Jalisco Packaging Facility',
        handledBy: 'Maria Rodriguez',
        handledByRole: 'farmer',
        notes: 'Sorted and packaged according to export standards',
        verifiedOnChain: true,
        transactionId: '0x789ghi101jkl',
      },
      {
        id: 'event-3',
        timestamp: '2025-04-21T09:20:00Z',
        type: 'shipping',
        location: 'Mexico City Distribution Center',
        handledBy: 'FastTrack Logistics',
        handledByRole: 'transporter',
        notes: 'Loaded for international shipping, temperature-controlled',
        verifiedOnChain: true,
        transactionId: '0xmno202pqr',
      }
    ]
  },
  {
    id: 'trace-order-1',
    productId: 'order-1',
    events: [
      {
        id: 'event-order-1-1',
        timestamp: '2025-04-20T10:30:00Z',
        type: 'processing',
        location: 'Jalisco, Mexico',
        handledBy: 'Maria Rodriguez',
        handledByRole: 'farmer',
        notes: 'Order received and confirmed',
        verifiedOnChain: true,
        transactionId: '0xstu303vwx',
      },
      {
        id: 'event-order-1-2',
        timestamp: '2025-04-21T08:15:00Z',
        type: 'shipping',
        location: 'Mexico City Distribution Center',
        handledBy: 'FastTrack Logistics',
        handledByRole: 'transporter',
        notes: 'Picked up from farmer, starting delivery',
        verifiedOnChain: true,
        transactionId: '0xyz404abc',
      }
    ]
  }
];

export const mockCategories = [
  'Fruits',
  'Vegetables',
  'Grains',
  'Coffee & Tea',
  'Dairy',
  'Meat & Poultry',
  'Honey & Sweeteners',
  'Nuts & Seeds',
  'Herbs & Spices',
  'Processed Foods',
];

export const mockRegions = [
  'North America',
  'Central America',
  'South America',
  'Europe',
  'Africa',
  'Asia',
  'Oceania',
];