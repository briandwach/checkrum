import { useQuery } from "@apollo/client";
import { COMPLETED_REPORTS, ALL_STAFF, QUERY_CLIENT } from "../../utils/queries";

import { calculateMonths } from "../../utils/dateTimeTools";

import { isSameMonth } from 'date-fns';

import { useState, useEffect } from 'react';

import RecentReportCard from '../RecentReportCard/index.jsx';

const CompletedReports = () => {

    const { loading, data, refetch } = useQuery(COMPLETED_REPORTS);
    const { loading: staffLoading, data: staffData, refetch: refetchAllStaff } = useQuery(ALL_STAFF);
    const { loading: clientLoading, data: clientData, refetch: refetchAllClients } = useQuery(QUERY_CLIENT);

    const [staffFilter, setStaffFilter] = useState('');
    const [clientFilter, setClientFilter] = useState('');
    const [monthFilter, setMonthFilter] = useState('');
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

    const reportsLength = allReportsArr.length;
    const monthsArray = calculateMonths(allReportsArr[reportsLength - 1].inspectionDate);

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

        if (monthFilter !== '') {
            filteredReports = filteredReports.filter(item => {
                return (isSameMonth(monthFilter, item.inspectionDate));
            });
        }

        setReportsArr(filteredReports);
    };

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

        if (monthFilter !== '') {
            filteredReports = filteredReports.filter(item => {
                return (isSameMonth(monthFilter, item.inspectionDate));
            });
        }

        setReportsArr(filteredReports);
    };


    const monthChange = (e) => {
        setMonthFilter(e.target.value);

        const filters = [
            { property: 'roomId.location.client._id', value: clientFilter },
            { property: 'assignedStaff._id', value: staffFilter },
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

        if (e.target.value !== '') {
            filteredReports = filteredReports.filter(item => {
                return (isSameMonth(e.target.value, item.inspectionDate));
            });
        }

        setReportsArr(filteredReports);
    };

    const clearFilters = () => {
        setClientFilter('');
        setStaffFilter('');
        setMonthFilter('');
        setReportsArr(allReportsArr);
    }

    return (
        <div>
            <h1 className="mb-3 text-3xl font-bold text-center">Completed Inspections</h1>
            <div className="flex flex-col">
                <p className="font-bold text-center mb-2">Choose filtering options:</p>
                <div className="grid grid-cols-2 lg:grid-cols-4 mr-auto ml-auto">
                    <select
                        className="select-sm select-bordered mb-2 mr-3"
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
                        className="select-sm select-bordered mb-2 mr-3"
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
                    <select
                        className="select-sm select-bordered mr-3"
                        id="month"
                        name="month"
                        value={monthFilter}
                        onChange={(e) => monthChange(e)}
                    >
                        <option value=''>All Months</option>
                        {monthsArray.map((month) => (
                            <option key={month} value={month}>
                                {month}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    className="btn btn-sm btn-primary m-2 w-fit mr-auto ml-auto"
                    onClick={clearFilters}>
                    Clear Filters
                </button>
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