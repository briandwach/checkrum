import AssignedReportCard from '../AssignedReportCard';

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
          <h1 className="ml-3 text-3xl font-bold text-center">Assigned Inspections</h1>

            {assignedReportsByStaff.length < 1 ? (
                <div>
                <p  className="m-3">You currently have no assigned inspections.</p>
                </div>
            ) : (
          <div className="">
              {assignedReportsByStaff.map((report) => (
                  <AssignedReportCard
                      key={report._id}
                      id={report._id}
                      name={report.roomId.roomName}
                      client={report.roomId.location.client.businessName}
                      location={report.roomId.location.locationName}
                      address={report.roomId.location.address}
                      cycle={report.roomId.inspectionCycleLength}
                      lastInspected={report.roomId.lastInspectionDate}
                      dateTimeProperties={report.roomId.dateTimeProperties}
                      completed={false}
                  />
              ))}
          </div>
            )}
      </div>
  );
}

export default AssignedReports;