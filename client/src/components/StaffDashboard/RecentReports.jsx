import RecentReportCard from '../RecentReportCard/index.jsx';
import React, { useEffect } from 'react';

import { useQuery } from '@apollo/client';
import { COMPLETED_REPORTS_BY_STAFF } from '../../utils/queries.js';

import { calculateClosedReport } from '../../utils/dateTimeTools.js';

const CompletedReports = ({ assignedStaff }) => {

  const { loading, data, refetch } = useQuery(COMPLETED_REPORTS_BY_STAFF, {
    variables: { assignedStaff }
  });

  useEffect(() => {
    refetch();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const { completedReportsByStaff } = data;

  // Creates an array of recent reports following the conditional set in the calculateClosedReports function in dateTimeTools
  const recentReports = completedReportsByStaff
    .map((report) => {
      if (calculateClosedReport(report.inspectionDate)) {
        return report;
      }
      return null; // Return null for reports that do not meet the condition
    })
    .filter((report) => report !== null);

  return (
    <div>
      <h1 className="ml-3 text-3xl font-bold text-center">Past 48 Hours</h1>

      {recentReports.length < 1 ? (
        <div>
          <p className="m-3">No inspections have been completed recently.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {recentReports.map((report) => (
            <RecentReportCard
              key={report._id}
              id={report._id}
              name={report.roomId.roomName}
              client={report.roomId.location.client.businessName}
              location={report.roomId.location.locationName}
              cycle={report.roomId.inspectionCycleLength}
              inspectionDate={report.inspectionDate}
              assignedBy={report.assignedBy.username}
              assignedStaff={report.assignedStaff.username}
              results={report.results}
              generalComments={report.generalComments}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default CompletedReports;