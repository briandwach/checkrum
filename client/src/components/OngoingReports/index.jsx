import Auth from '../../utils/auth';

import { useQuery } from "@apollo/client";
import { IN_PROGRESS_REPORTS, ALL_STAFF } from "../../utils/queries";
import { dateToLocale } from "../../utils/dateTimeTools"

import { useState, useEffect } from 'react';

import { useMutation } from '@apollo/client';
import { DELETE_REPORT, UPDATE_ASSIGNED_TO } from '../../utils/mutations';

const OngoingReports = () => {

    const { loading, data, refetch } = useQuery(IN_PROGRESS_REPORTS);
    const { loading: staffLoading, data: staffData } = useQuery(ALL_STAFF);
    const [deleteReport, { error }] = useMutation(DELETE_REPORT);
    const [updateAssignedTo] = useMutation(UPDATE_ASSIGNED_TO);

    const [staffFilter, setStaffFilter] = useState('All Staff');
    const [reportsArr, setReportsArr] = useState('');
    const [assignedTo, setAssignedTo] = useState({});
    const [updateMessage, setUpdateMessage] = useState({});
    const [updateStylings, setUpdateStylings] = useState('');

    const userProfile = Auth.getProfile();
    const manager = userProfile.authenticatedPerson.username;

    // Call the `refetch` function whenever the component loads
    useEffect(() => {
        refetch();
    }, []);

    useEffect(() => {
        if (data) {
            setReportsArr(data.inProgressReports);

            const setAssignedToStates = (reports) => {
                for (const report of reports) {
                    const staffId = report.assignedStaff._id;
                    setAssignedTo(prevState => ({ ...prevState, [report._id]: staffId }));
                }
            }
            setAssignedToStates(data.inProgressReports);
        }
    }, [data]);

    if (loading || staffLoading) {
        return <div>Loading...</div>;
    }

    const allReportsArr = data.inProgressReports;

    const filterChange = (e) => {
        setStaffFilter(e.target.value);
        if (e.target.value !== 'All Staff') {
            const filteredReports = allReportsArr.filter(report => report.assignedStaff._id === e.target.value);
            setReportsArr(filteredReports);
        } else {
            setReportsArr(allReportsArr);
        }
    }

    const reportUpdate = async () => {
        const response = await refetch();
        if (response) {
            const newReportsArr = response.data.inProgressReports;

            if (staffFilter !== 'All Staff') {
            const filteredReports = newReportsArr.filter(report => report.assignedStaff._id === staffFilter);
            setReportsArr(filteredReports);
            } else {
                setReportsArr(newReportsArr);
            }
        }
    }

    const handleDelete = async (reportId, roomName) => {
        if (window.confirm(`Delete report for room ${roomName}?`)) {
            try {
                const { data } = await deleteReport({
                    variables: {
                        reportId: reportId
                    }
                });
                

                if (!error) {
                    setUpdateMessage(prevState => ({ ...prevState, [reportId]: 'Deleting...' }));

                    setTimeout(() => {
                        setUpdateMessage(prevState => ({ ...prevState, [reportId]: '' }));
                        reportUpdate();
                    }, 2000);
                }
            } catch (e) {
                console.error(e);
            };
        } else {
        }
    };

    const handleStaff = async (e, reportId) => {
        setAssignedTo(prevState => ({ ...prevState, [reportId]: e.target.value }));
        setUpdateMessage(prevState => ({ ...prevState, [reportId]: 'Updating...' }));
        try {
            const { data } = await updateAssignedTo({
                variables: {
                    reportId: reportId,
                    assignedBy: manager,
                    assignedStaff: e.target.value
                }
            });
        } catch (e) {
            setUpdateMessage(prevState => ({ ...prevState, [reportId]: 'Error Occurred' }));
            console.error(e);
        };

        setUpdateMessage(prevState => ({ ...prevState, [reportId]: 'Updated!' }));

        setTimeout(() => {
            setUpdateMessage(prevState => ({ ...prevState, [reportId]: '' }));
            setUpdateStylings('');
            reportUpdate();
        }, 2000);
    }

    return (
        <div>
           <div className="flex flex-col">
           <p className="font-bold text-center mb-2">Filter Reports by Assigned Staff</p>
            <select
                className="select-sm select-bordered w-fit ml-auto mr-auto"
                id="staff"
                name="staff"
                value={staffFilter}
                onChange={(e) => filterChange(e)}
            >
                <option key='default' value='All Staff'>All Staff</option>
                {staffData.allStaff.map((staff) => (
                    <option key={staff._id} value={staff._id}>
                        {staff.username}
                    </option>
                ))}
            </select>
            </div>
            {reportsArr.length > 0 ? (
                <ul className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                    {reportsArr.map((report) => (
                        <div key={report._id}>
                            <div className="card w-96 m-2 bg-primary text-primary-content">
                                <div className="flex p-3 justify-between">
                                    <div>
                                        <h2 className="font-bold mb-2">Room: {report.roomId.roomName}</h2>
                                        {report.roomId.dateTimeProperties.inspectionStatus === 'Current' &&
                                            <>
                                                <i className="fa-solid fa-clipboard-check fa-xl mr-3" style={{ color: "#63E6BE" }}></i>
                                                <p className="font-bold inline">Next Due</p>
                                                <p className="mt-2">{dateToLocale(report.roomId.dateTimeProperties.upcomingDueDate)}</p>
                                            </>}
                                        {report.roomId.dateTimeProperties.inspectionStatus === 'Due' &&
                                            <>
                                                <i className="fa-regular fa-hourglass-half fa-xl mr-3" style={{ color: "#FFD43B" }}></i>
                                                <p className="font-bold inline">Due in {report.roomId.dateTimeProperties.timeToUpcomingDueDate}</p>
                                                <p className="mt-2"></p>
                                                <p>{dateToLocale(report.roomId.dateTimeProperties.upcomingDueDate)}</p>
                                            </>}
                                        {report.roomId.dateTimeProperties.inspectionStatus === 'Overdue' &&
                                            <>
                                                <i className="fa-solid fa-triangle-exclamation fa-xl mr-3" style={{ color: "#a46a6a" }}></i>
                                                <p className="font-bold inline">OVERDUE</p>
                                                <p className="mt-2"><span className="font-bold">Since: </span>{dateToLocale(report.roomId.dateTimeProperties.initialMissedDate)}</p>
                                            </>}
                                    </div>
                                    <div className="mt-auto mb-auto mr-4">
                                        <p className="font-bold">Assigned To:</p>
                                        <select
                                            className="select-sm select-bordered"
                                            id="staff"
                                            name="staff"
                                            value={assignedTo[report._id]}
                                            onChange={(e) => handleStaff(e, report._id)}
                                        >
                                            {staffData.allStaff.map((staff) => (
                                                <option key={staff._id} value={staff._id}>
                                                    {staff.username}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="flex justify-between mt-1">
                                            <p className="ml-4 font-bold">{updateMessage[report._id]}</p>
                                            <button type="button" onClick={() => handleDelete(report._id, report.roomId.roomName)}>
                                                <i className="fa-regular fa-trash-can"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </ul>
            ) : (
                <>
                <br></br>
                <h1 className="text-center">Staff member has no reports.</h1>
                <br></br>
                </>
            )}
        </div>
    );
}



export default OngoingReports;