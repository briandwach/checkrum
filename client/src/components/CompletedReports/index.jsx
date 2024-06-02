import { useQuery } from "@apollo/client";
import { COMPLETED_REPORTS, ALL_STAFF, QUERY_CLIENT } from "../../utils/queries";

import { useState, useEffect } from 'react';

import RecentReportCard from '../RecentReportCard/index.jsx';

const CompletedReports = () => {

    const { loading, data, refetch } = useQuery(COMPLETED_REPORTS);
    const { loading: staffLoading, data: staffData, refetch: refetchAllStaff } = useQuery(ALL_STAFF);
    const { loading: clientLoading, data: clientData, refetch: refetchAllClients } = useQuery(QUERY_CLIENT);

    const [staffFilter, setStaffFilter] = useState('');
    const [clientFilter, setClientFilter] = useState('');
    const [reportsArr, setReportsArr] = useState([]);

    // Call the `refetch` function whenever the component loads
    useEffect(() => {
        refetch();
        refetchAllStaff();
        refetchAllClients();
    }, []);

    useEffect(() => {
        if (data) {
            setReportsArr(data.completedReports);
        }
    }, [data]);

    if (loading || staffLoading || clientLoading) {
        return <div>Loading...</div>;
    }

    const allReportsArr = data.completedReports;

    const clientChange = (e) => {
        setClientFilter(e.target.value);

        const filters = [
            { property: 'roomId.location.client._id', value: e.target.value },
            { property: 'assignedStaff._id', value: staffFilter }
        ];

        let filteredReports = allReportsArr;

        filters.forEach(filter => {
            if (filter.value !== '') {
                const properties = filter.property.split('.');
                filteredReports = filteredReports.filter(item => {
                    let valueToCompare = item;
                    for (let prop of properties) {
                        valueToCompare = valueToCompare[prop]; 
                    }
                    return valueToCompare === filter.value;
                });
            }
        });
        setReportsArr(filteredReports);
    }

    const staffChange = (e) => {
        setStaffFilter(e.target.value);

        const filters = [
            { property: 'roomId.location.client._id', value: clientFilter },
            { property: 'assignedStaff._id', value: e.target.value }
        ];

        let filteredReports = allReportsArr;

        filters.forEach(filter => {
            if (filter.value !== '') {
                const properties = filter.property.split('.');
                filteredReports = filteredReports.filter(item => {
                    let valueToCompare = item;
                    for (let prop of properties) {
                        valueToCompare = valueToCompare[prop]; 
                    }
                    return valueToCompare === filter.value;
                });
            }
        });
        setReportsArr(filteredReports);
    }


    return (
        <div>
            <h1 className="mb-3 text-3xl font-bold text-center">Completed Inspections</h1>
            <div className="flex flex-col">
                <p className="font-bold text-center mb-2">Choose filtering options:</p>
                <div className="grid grid-cols-2 lg:grid-cols-4 mr-auto ml-auto">
                    <select
                        className="select-sm select-bordered w-fit"
                        id="client"
                        name="client"
                        value={clientFilter}
                        onChange={(e) => clientChange(e)}
                    >
                        <option value=''>All Clients</option>
                        {clientData.clients.map((client) => (
                            <option key={client._id} value={client._id}>
                                {client.businessName}
                            </option>
                        ))}
                    </select>
                    <select
                        className="select-sm select-bordered w-fit"
                        id="staff"
                        name="staff"
                        value={staffFilter}
                        onChange={(e) => staffChange(e)}
                    >
                        <option value=''>All Staff</option>
                        {staffData.allStaff.map((staff) => (
                            <option key={staff._id} value={staff._id}>
                                {staff.username}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div>
                {reportsArr < 1 ? (
                    <div>
                        <p className="m-3">No inspection reports could be found.</p>
                    </div>
                ) : (
                    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {reportsArr.map((report) => (
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
        </div>
    )
}


export default CompletedReports;