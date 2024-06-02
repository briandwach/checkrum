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
            const setAssignedToStates = (reports) => {
                for (const report of reports) {
                    const staffId = report.assignedStaff._id;
                    setAssignedTo(prevState => ({ ...prevState, [report._id]: staffId }));
                }
            }
            setAssignedToStates(data.inProgressReports);
        }
    }, [data]);

    const handleDelete = async (reportId, roomName) => {
        if (window.confirm(`Delete report for room ${roomName}?`)) {
            try {
                const { data } = await deleteReport({
                    variables: {
                        reportId: reportId
                    }
                });

                if (!error) {
                    refetch();
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
        }, 3000);
    }

    return (
        <div>
            {loading || staffLoading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    {data.inProgressReports.length > 0 ? (
                        <ul>
                            {data.inProgressReports.map((report) => (
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
                                                <p className={`${updateStylings} ml-4 font-bold`}>{updateMessage[report._id]}</p>  
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
                        <h1>There are no ongoing reports</h1>
                    )}
                </div>
            )}
        </div>
    );
}



export default OngoingReports;