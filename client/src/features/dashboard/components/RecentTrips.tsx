
export default function RecentTrips() {
  return (
    <div className="recent-trips-panel">
      <h3>Recent Trips</h3>
      <div className="trips-list">
        <table>
          <thead>
            <tr>
              <th>Trip ID</th>
              <th>Driver</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#TRP001</td>
              <td>John Doe</td>
              <td><span className="status-badge completed">Completed</span></td>
            </tr>
            <tr>
              <td>#TRP002</td>
              <td>Jane Smith</td>
              <td><span className="status-badge in-progress">In Progress</span></td>
            </tr>
            <tr>
              <td>#TRP003</td>
              <td>Mike Johnson</td>
              <td><span className="status-badge pending">Pending</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
