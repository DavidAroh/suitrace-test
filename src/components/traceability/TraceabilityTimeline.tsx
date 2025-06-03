import React from 'react';
import { CheckCircle2, Truck, Package, Plane as Plant, Factory, ShoppingBag } from 'lucide-react';
import { TraceabilityEvent } from '../../types';
import Badge from '../ui/Badge';

interface TraceabilityTimelineProps {
  events: TraceabilityEvent[];
}

const getEventIcon = (type: string) => {
  switch (type) {
    case 'harvest':
      return <Plant className="h-5 w-5 text-green-600" />;
    case 'processing':
      return <Factory className="h-5 w-5 text-blue-600" />;
    case 'packaging':
      return <Package className="h-5 w-5 text-orange-600" />;
    case 'shipping':
      return <Truck className="h-5 w-5 text-purple-600" />;
    case 'delivered':
      return <ShoppingBag className="h-5 w-5 text-green-600" />;
    default:
      return <CheckCircle2 className="h-5 w-5 text-gray-600" />;
  }
};

const getEventTitle = (type: string) => {
  switch (type) {
    case 'harvest':
      return 'Harvested';
    case 'processing':
      return 'Processed';
    case 'packaging':
      return 'Packaged';
    case 'shipping':
      return 'Shipped';
    case 'delivered':
      return 'Delivered';
    default:
      return type.charAt(0).toUpperCase() + type.slice(1);
  }
};

const TraceabilityTimeline: React.FC<TraceabilityTimelineProps> = ({ events }) => {
  // Sort events by timestamp
  const sortedEvents = [...events].sort((a, b) => 
    new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  return (
    <div className="flow-root">
      <ul role="list\" className="-mb-8">
        {sortedEvents.map((event, eventIdx) => {
          const date = new Date(event.timestamp);
          const formattedDate = date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          });
          const formattedTime = date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
          });

          return (
            <li key={event.id}>
              <div className="relative pb-8">
                {eventIdx !== sortedEvents.length - 1 ? (
                  <span
                    className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
                    aria-hidden="true"
                  />
                ) : null}
                <div className="relative flex items-start space-x-3">
                  <div className="relative">
                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center ring-8 ring-white">
                      {getEventIcon(event.type)}
                    </div>
                  </div>
                  <div className="min-w-0 flex-1 py-1.5">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-gray-900">
                        {getEventTitle(event.type)}
                        {event.verifiedOnChain && (
                          <Badge variant="success\" className="ml-2">Verified On-Chain</Badge>
                        )}
                      </div>
                      <div className="text-right text-xs text-gray-500">
                        <time dateTime={event.timestamp}>{formattedDate}</time>
                        <div>{formattedTime}</div>
                      </div>
                    </div>
                    <div className="mt-1 text-sm text-gray-700">
                      <p>
                        <span className="font-medium">{event.handledBy}</span> ({event.handledByRole}) at{' '}
                        <span className="font-medium">{event.location}</span>
                      </p>
                      {event.notes && <p className="mt-1 text-gray-500">{event.notes}</p>}
                      {event.transactionId && (
                        <a
                          href={`https://explorer.sui.io/txblock/${event.transactionId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 inline-flex items-center text-xs text-green-600 hover:text-green-800"
                        >
                          View on Sui Explorer: {event.transactionId.substring(0, 8)}...
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TraceabilityTimeline;