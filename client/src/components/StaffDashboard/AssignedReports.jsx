import RoomCard from '../RoomCard';

import { useQuery } from '@apollo/client';
import { ASSIGNED_REPORTS_BY_STAFF } from '../../utils/queries';

const AssignedReports = ({ assignedStaff }) => {

const { loading, data } = useQuery(ASSIGNED_REPORTS_BY_STAFF, {
    variables: { assignedStaff }
});

if (loading) {
    return <div>Loading...</div>;
  }

  const { assignedReportsByStaff } = data;

  return (
      <div>
          <h1 className="ml-3 text-3xl font-bold">Assigned Inspections</h1>
          <div className="">
              {assignedReportsByStaff.map((report) => (
                  <RoomCard
                      key={report._id}
                      id={report._id}
                      name={report.roomId.roomName}
                      client={report.roomId.location.client.businessName}
                      location={report.roomId.location.locationName}
                      address={report.roomId.location.address}
                      cycle={report.roomId.inspectionCycleLength}
                  />
              ))}
          </div>
      </div>
  );
}

export default AssignedReports;