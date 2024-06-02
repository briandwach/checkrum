import Auth from '../../utils/auth';

import { useState } from "react";
import { ALL_STAFF } from '../../utils/queries';
import { ALL_LOCATIONS } from '../../utils/queries';
import { ROOM_BY_LOCATION } from "../../utils/queries";
import { useLazyQuery, useQuery, useMutation } from '@apollo/client';
import { CREATE_REPORT } from "../../utils/mutations";
import { dateToLocale } from "../../utils/dateTimeTools.js";

const CreateReport = () => {
    //Queries to pull all the users with staff role and the locations to populate drop downs. -dh
    const { loading, data } = useQuery(ALL_STAFF);
    const { loading: loadingLocation, data: dataLocation } = useQuery(ALL_LOCATIONS);

    //state to manager the selected staff and location from dropdown -dh
    const [selectedStaff, setSelectedStaff] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    //runs the query to get the rooms based on the location selected, passes location name from handleSubmit function -dh
    const [loadRooms, { loading: loadingRoom, data: dataRoom }] = useLazyQuery(ROOM_BY_LOCATION);
    //mutation to create the report, create report runs from handleSendReports -dh
    const [createReport] = useMutation(CREATE_REPORT);
    //state to manage the status of the report creation -dh
    const [reportStatus, setReportStatus] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        loadRooms({ variables: { name: selectedLocation } });
    };

    //function to handle the creation of the report, loops through the rooms and creates a report for each room that is checked -dh
    const handleSendReports = () => {
        dataRoom.roomByLocation.forEach((room) => {
            const manager = Auth.getProfile().authenticatedPerson.username;
            const checkbox = document.getElementById(`checkbox-${room._id}`);
            if (checkbox.checked) {
                setReportStatus('Creating Report...');
                createReport({ variables: { roomId: room._id, assignedBy: manager, assignedStaff: selectedStaff } });
                setReportStatus('Report Created!');
            }
            //clears the report text after 3 seconds -dh
            setTimeout(() => {
                setReportStatus('');
            }, 3000);
        });
    };

    return (
        <div>
            {/* loading terinary operator otherwise will cause loading errors even on the smallest load times -dh */}
            {loading || loadingLocation ? (
                <p>Loading...</p>
            ) : (
                // inside this terenary operator is the form to select staff and location to search for rooms. Options for each dropdown are populated from the queries above  -dh
                <div>
                    <div className="flex" style={{ flexDirection: "column", alignItems: "center" }}>
                        <form >
                            <select
                                className="select select-bordered"
                                id="staff"
                                name="staff"
                                value={selectedStaff}
                                onChange={(e) => setSelectedStaff(e.target.value)}
                            >
                                <option value="">Assign Staff:</option>
                                {data.allStaff.map((staff) => (
                                    <option key={staff.id} value={staff.id}>
                                        {staff.username}
                                    </option>
                                ))}
                            </select>

                            <select
                                className="select select-bordered"
                                id="location"
                                name="location"
                                value={selectedLocation}
                                onChange={(e) => setSelectedLocation(e.target.value)}
                            >
                                <option value="">Choose a Location</option>
                                {dataLocation.allLocations.map((location) => (
                                    <option key={location.id} value={location.id}>
                                        {location.locationName}
                                    </option>
                                ))}
                            </select>
                        </form>

                        <button
                            className="btn btn-sm btn-primary m-2"
                            onClick={handleSubmit}
                            type="submit">Search for Rooms
                        </button>

                    </div>
                </div>
            )}
            {/* Section for rooms, loads after you hit "search for rooms" on the above form  -dh */}
            {loadingRoom ? (
                <p>Loading rooms...</p>
            ) : (
                dataRoom && (
                    //this block displays the rooms that are returned when you search for rooms. -dh
                    <>
                        <div className="flex flex-col" style={{ alignItems: "center" }} >
                            {dataRoom.roomByLocation.map((room) => (
                                <div key={room.id}>
                                    <div className="card w-96 m-2 bg-primary text-primary-content">
                                        <div className="flex p-3 justify-between">
                                            <div>
                                                <h2 className="font-bold mb-2">Room: {room.roomName}</h2>
                                                {room.dateTimeProperties.inspectionStatus === 'Current' &&
                                                    <>
                                                        <i className="fa-solid fa-clipboard-check fa-xl mr-3" style={{ color: "#63E6BE" }}></i>
                                                        <p className="font-bold inline">Next Due</p>
                                                        <p className="mt-2">{dateToLocale(room.dateTimeProperties.upcomingDueDate)}</p>
                                                    </>}
                                                {room.dateTimeProperties.inspectionStatus === 'Due' &&
                                                    <>
                                                        <i className="fa-regular fa-hourglass-half fa-xl mr-3" style={{ color: "#FFD43B" }}></i>
                                                        <p className="font-bold inline">Due in {room.dateTimeProperties.timeToUpcomingDueDate}</p>
                                                        <p className="mt-2"></p>
                                                        <p>{dateToLocale(room.dateTimeProperties.upcomingDueDate)}</p>
                                                    </>}
                                                {room.dateTimeProperties.inspectionStatus === 'Overdue' &&
                                                    <>
                                                        <i class="fa-solid fa-triangle-exclamation fa-xl mr-3" style={{ color: "#a46a6a" }}></i>
                                                        <p className="font-bold inline">OVERDUE</p>
                                                        <p className="mt-2"><span className="font-bold">Since: </span>{dateToLocale(room.dateTimeProperties.initialMissedDate)}</p>
                                                    </>}
                                            </div>
                                            <input id={`checkbox-${room._id}`} type="checkbox" className="checkbox checkbox-success mt-auto mb-auto mr-4" />

                                        </div>
                                    </div>
                                </div>
                            ))}
                            <button
                                className="btn btn-sm btn-primary m-2"
                                onClick={handleSendReports}>
                                Create Report
                            </button>
                        </div>
                        <h1 className="mb-3 text-2xl font-bold text-center">{reportStatus}</h1>
                    </>
                )
            )}
        </div>
    );
}

export default CreateReport;