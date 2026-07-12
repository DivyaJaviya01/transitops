import React from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../../../services/api';

interface Driver {
  name: string;
}

interface Vehicle {
  name: string;
}

interface Trip {
  id: string;
  source: string;
  destination: string;
  status: string;
  driver: Driver;
  vehicle: Vehicle;
}

export default function RecentTrips() {
  const { data: trips, isLoading } = useQuery<Trip[]>({
    queryKey: ['recent-trips'],
    queryFn: async () => {
      const res = await api.get('/trips');
      return res.data;
    }
  });

  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'completed';
      case 'dispatched': return 'in-progress';
      case 'draft': return 'pending';
      default: return 'pending';
    }
  };

  return (
    <div className="recent-trips-panel">
      <h3>Recent Trips</h3>
      <div className="trips-list">
        {isLoading ? (
          <p style={{ color: 'var(--text-secondary)' }}>Loading trips...</p>
        ) : !trips || trips.length === 0 ? (
          <p style={{ color: 'var(--text-secondary)' }}>No recent trips recorded.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Route</th>
                <th>Driver</th>
                <th>Vehicle</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {trips.slice(-5).map((trip) => (
                <tr key={trip.id}>
                  <td style={{ fontWeight: 600 }}>{trip.source} → {trip.destination}</td>
                  <td>{trip.driver.name}</td>
                  <td>{trip.vehicle.name}</td>
                  <td>
                    <span className={`status-badge ${getStatusClass(trip.status)}`}>
                      {trip.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
