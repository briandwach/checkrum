import { useQuery } from "@apollo/client";
import { COMPLETED_REPORTS, ALL_STAFF, QUERY_CLIENT } from "../../utils/queries";

import { calculateMonths } from "../../utils/dateTimeTools";
import { exportCsv }  from "../../utils/exportCSV";

import { isSameMonth } from 'date-fns';

import { useState, useEffect } from 'react';

import RecentReportCard from '../RecentReportCard/index.jsx';

const CompletedReports = () => {

    const { loading, data, refetch } = useQuery(COMPLETED_REPORTS);
    const { loading: staffLoading, data: staffData, refetch: refetchAllStaff } = useQuery(ALL_STAFF);
    const { loading: clientLoading, data: clientData, refetch: refetchAllClients } = useQuery(QUERY_CLIENT);

    const [staffFilter, setStaffFilter] = useState('');
    const [clientFilter, setClientFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [monthFilter, setMonthFilter] = useState('All Months');

    const [staffName, setStaffName] = useState('All Staff');
    const [clientName, setClientName] = useState('All Clients');
    const [statusName, setStatusName] = useState('All Statuses');

    const [reportsArr, setReportsArr] = useState([]);
    const [downloadCSV, setDownloadCSV] = useState('');
    const [reportName, setReportName] = useState('');

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

    useEffect(() => {
       setReportName(clientName + '.' + monthFilter + '.' + staffName + '.' + statusName);
    }, [clientName, monthFilter, staffName, statusName]);

    useEffect(() => {
        setDownloadCSV(exportCsv(reportsArr));
     }, [reportsArr]);

    if (loading || staffLoading || clientLoading) {
        return <div>Loading...</div>;
    }

    const allReportsArr = data.completedReports;

    const reportsLength = allReportsArr.length;

    let monthsArray = [];

    if (reportsLength > 0) {
    monthsArray = calculateMonths(allReportsArr[reportsLength - 1].inspectionDate);
    };
  
    const clientChange = (e) => {
        setClientFilter(e.target.value);
        setClientName(e.target.dataBusinessName);

        const filters = [
            { property: 'roomId.location.client._id', value: e.target.value },
            { property: 'assignedStaff._id', value: staffFilter },
            { property: 'failStatus', value: statusFilter }
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

        if (monthFilter !== 'All Months') {
            filteredReports = filteredReports.filter(item => {
                return (isSameMonth(monthFilter, item.inspectionDate));
            });
        }

        setReportsArr(filteredReports);
    };

    const staffChange = (e) => {
        setStaffFilter(e.target.value);
        setStaffName(e.target.dataUsername);

        const filters = [
            { property: 'roomId.location.client._id', value: clientFilter },
            { property: 'assignedStaff._id', value: e.target.value },
            { property: 'failStatus', value: statusFilter }
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

        if (monthFilter !== 'All Months') {
            filteredReports = filteredReports.filter(item => {
                return (isSameMonth(monthFilter, item.inspectionDate));
            });
        }

        setReportsArr(filteredReports);
    };

    const statusChange = (e) => {
        setStatusFilter(e.target.value);
        setStatusName(e.target.dataStatus);

        const filters = [
            { property: 'roomId.location.client._id', value: clientFilter },
            { property: 'assignedStaff._id', value: staffFilter },
            { property: 'failStatus', value: e.target.value }
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

        if (monthFilter !== 'All Months') {
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
            { property: 'failStatus', value: statusFilter }
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

        if (e.target.value !== 'All Months') {
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
        setStatusFilter('');
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
                        <option value='' dataBusinessName='All Clients'>All Clients</option>
                        {clientData.clients.map((client) => (
                            <option key={client._id} value={client._id} dataBusinessName={client.businessName}>
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
                        <option value='' dataUsername='All Staff'>All Staff</option>
                        {staffData.allStaff.map((staff) => (
                            <option key={staff._id} value={staff._id} dataUsername={staff.username}>
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
                        <option value='All Months'>All Months</option>
                        {monthsArray.map((month) => (
                            <option key={month} value={month}>
                                {month}
                            </option>
                        ))}
                    </select>
                    <select
                        className="select-sm select-bordered mb-2 mr-3"
                        id="status"
                        name="status"
                        value={statusFilter}
                        onChange={(e) => statusChange(e)}
                    >
                        <option value='' dataStatus='Status ALL'>All Statuses</option>
                        <option key='Reported Fail' value='true' dataStatus='Status FAIL'>Fail Reported</option>
                        <option key='Pass' value='false' dataStatus='Status PASS'>Passing</option>
                    </select>
                </div>
                <div className="mr-auto ml-auto">
                <button
                    className="btn btn-sm btn-primary m-2"
                    onClick={clearFilters}>
                    Clear Filters
                </button>
                <a href={downloadCSV} download={`${reportName}.csv`}>
                <button
                    className="btn btn-sm btn-primary m-2">
                    Export CSV File
                </button>
                </a>
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