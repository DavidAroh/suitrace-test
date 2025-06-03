import React from 'react';
import { Truck, Clock, Package, ShoppingBag, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Order } from '../../types';
import { Card, CardHeader, CardContent, CardFooter } from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { Link } from 'react-router-dom';

interface OrderStatusCardProps {
  order: Order;
  userRole: 'farmer' | 'buyer' | 'transporter';
  onActionClick?: () => void;
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'pending':
      return <Badge variant="warning">Pending</Badge>;
    case 'processing':
      return <Badge variant="info">Processing</Badge>;
    case 'in-transit':
      return <Badge variant="primary">In Transit</Badge>;
    case 'delivered':
      return <Badge variant="secondary">Delivered</Badge>;
    case 'completed':
      return <Badge variant="success">Completed</Badge>;
    case 'disputed':
      return <Badge variant="danger">Disputed</Badge>;
    default:
      return <Badge variant="default">{status}</Badge>;
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'pending':
      return <Clock className="h-6 w-6 text-amber-500" />;
    case 'processing':
      return <Package className="h-6 w-6 text-blue-500" />;
    case 'in-transit':
      return <Truck className="h-6 w-6 text-green-500" />;
    case 'delivered':
      return <ShoppingBag className="h-6 w-6 text-orange-500" />;
    case 'completed':
      return <CheckCircle2 className="h-6 w-6 text-green-600" />;
    case 'disputed':
      return <AlertTriangle className="h-6 w-6 text-red-500" />;
    default:
      return <Clock className="h-6 w-6 text-gray-500" />;
  }
};

const getActionButton = (order: Order, userRole: string, onClick?: () => void) => {
  switch (userRole) {
    case 'farmer':
      if (order.status === 'pending') {
        return (
          <Button variant="primary\" onClick={onClick}>
            Accept Order
          </Button>
        );
      } else if (order.status === 'processing') {
        return (
          <Button variant="primary" onClick={onClick}>
            Mark Ready for Pickup
          </Button>
        );
      }
      break;
    case 'buyer':
      if (order.status === 'delivered') {
        return (
          <Button variant="primary" onClick={onClick}>
            Confirm Receipt
          </Button>
        );
      }
      break;
    case 'transporter':
      if (order.status === 'processing') {
        return (
          <Button variant="primary" onClick={onClick}>
            Accept Delivery Job
          </Button>
        );
      } else if (order.status === 'in-transit') {
        return (
          <Button variant="primary" onClick={onClick}>
            Mark Delivered
          </Button>
        );
      }
      break;
  }
  
  return null;
};

const OrderStatusCard: React.FC<OrderStatusCardProps> = ({ order, userRole, onActionClick }) => {
  const actionButton = getActionButton(order, userRole, onActionClick);
  
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="bg-gray-100 p-2 rounded-full">
            {getStatusIcon(order.status)}
          </div>
          <div>
            <h3 className="text-lg font-medium">Order #{order.id.substring(6)}</h3>
            <div className="text-sm text-gray-500">
              {new Date(order.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>
        {getStatusBadge(order.status)}
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="text-sm font-medium text-gray-500">Products</div>
            <ul className="mt-1 space-y-2">
              {order.products.map((product) => (
                <li key={product.productId} className="flex justify-between items-center">
                  <span className="text-sm">{product.name}</span>
                  <span className="text-sm">
                    {product.quantity} x ${product.price.toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex justify-between pt-2 border-t border-gray-100">
            <span className="font-medium">Total Amount:</span>
            <span className="font-bold">${order.totalAmount.toFixed(2)}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Buyer</p>
              <p className="font-medium">{order.buyerName}</p>
            </div>
            
            {order.transporterId && (
              <div>
                <p className="text-gray-500">Transporter</p>
                <p className="font-medium">{order.transporterName}</p>
              </div>
            )}
            
            <div className="col-span-2">
              <p className="text-gray-500">Delivery Address</p>
              <p className="font-medium">{order.deliveryAddress}</p>
            </div>
            
            {order.estimatedDelivery && (
              <div className="col-span-2">
                <p className="text-gray-500">Estimated Delivery</p>
                <p className="font-medium">{new Date(order.estimatedDelivery).toLocaleDateString()}</p>
              </div>
            )}
            
            {order.escrowId && (
              <div className="col-span-2">
                <p className="text-gray-500">Escrow Status</p>
                <p className="font-medium flex items-center">
                  {order.status === 'completed' ? (
                    <span className="text-green-600 flex items-center">
                      <CheckCircle2 className="h-4 w-4 mr-1" /> Released
                    </span>
                  ) : (
                    <span className="text-amber-600 flex items-center">
                      <Clock className="h-4 w-4 mr-1" /> In Escrow
                    </span>
                  )}
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      
      {(actionButton || order.traceabilityId) && (
        <CardFooter className="flex justify-between border-t border-gray-100 pt-4">
          <Link 
            to={`/traceability/${order.traceabilityId}`}
            className="text-green-600 hover:text-green-700 text-sm flex items-center"
          >
            View Traceability
          </Link>
          
          {actionButton}
        </CardFooter>
      )}
    </Card>
  );
};

export default OrderStatusCard;