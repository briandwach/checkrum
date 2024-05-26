import ReportCard from '../ReportCard';

import { useQuery } from '@apollo/client';
import { COMPLETED_REPORTS_BY_STAFF } from '../../utils/queries';

const CompletedReports = ({ assignedStaff }) => {

const { loading, data } = useQuery(COMPLETED_REPORTS_BY_STAFF, {
    variables: { assignedStaff }
});

if (loading) {
    return <div>Loading...</div>;
  }

  const { completedReportsByStaff } = data;

  return (
      <div>
          <h1 className="ml-3 text-3xl font-bold text-center">Recently Completed</h1>

            {completedReportsByStaff.length < 1 ? (
                <div>
                <p  className="m-3">No inspections have recently been completed.</p>
                </div>
            ) : (
          <div className="">
              {completedReportsByStaff.map((report) => (
                  <ReportCard
                      key={report._id}
                      id={report._id}
                      name={report.roomId.roomName}
                      client={report.roomId.location.client.businessName}
                      location={report.roomId.location.locationName}
                      address={report.roomId.location.address}
                      cycle={report.roomId.inspectionCycleLength}
                      lastInspected={report.roomId.lastInspectionDate}
                      completed={true}
                  />
              ))}
          </div>
            )}
      </div>
  );
}

export default CompletedReports;