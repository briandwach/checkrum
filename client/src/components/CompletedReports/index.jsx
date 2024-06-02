import { useQuery } from "@apollo/client";
import { COMPLETED_REPORTS } from "../../utils/queries";

import { useState, useEffect } from 'react';

import RecentReportCard from '../RecentReportCard/index.jsx';

const CompletedReports = () => {

    const { loading, data, refetch } = useQuery(COMPLETED_REPORTS);
   
    // Call the `refetch` function whenever the component loads
    useEffect(() => {
        refetch();
    }, []);

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <h1 className="ml-3 text-3xl font-bold text-center">Recently Completed</h1>

                    {data.completedReports.length < 1 ? (
                        <div>
                            <p className="m-3">No inspections have been completed recently.</p>
                        </div>
                    ) : (
                        <div className="">
                            {data.completedReports.map((report) => (
                                <RecentReportCard
                                    key={report._id}
                                    id={report._id}
                                    name={report.roomId.roomName}
                                    client={report.roomId.location.client.businessName}
                                    location={report.roomId.location.locationName}
                                    cycle={report.roomId.inspectionCycleLength}
                                    inspectionDate={report.inspectionDate}
                                    assignedStaff={report.assignedStaff.username}
                                    assignedBy={report.assignedBy.username}
                                    results={report.results}
                                    generalComments={report.generalComments}
                                />
                            ))}
                        </div>
                    )}

                </div>
            )
            }
        </div>
    )
}

export default CompletedReports;