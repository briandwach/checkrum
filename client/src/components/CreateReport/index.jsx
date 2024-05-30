import { useState } from "react";
import { ALL_STAFF } from '../../utils/queries';
import { ALL_LOCATIONS } from '../../utils/queries';
import { ROOM_BY_LOCATION } from "../../utils/queries";
import { useLazyQuery, useQuery, useMutation } from '@apollo/client';
import { CREATE_REPORT } from "../../utils/mutations";
import { dateToLocale } from "../../utils/dateTimeTools.js";

const CreateReport = () => {

    //Queries to pull all the users with staff role and the locations to populate drop downs.
    const { loading, data } = useQuery(ALL_STAFF);
    const { loading: loadingLocation, data: dataLocation } = useQuery(ALL_LOCATIONS);

    //state to manager the selected staff and location from dropdown
    const [selectedStaff, setSelectedStaff] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    //runs the query to get the rooms based on the location selected, passes location name from handleSubmit function
    const [loadRooms, { loading: loadingRoom, data: dataRoom }] = useLazyQuery(ROOM_BY_LOCATION);
    //mutation to create the report, create report runs from handleSendReports
    const [createReport] = useMutation(CREATE_REPORT);
    const [reportStatus, setReportStatus] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        loadRooms({ variables: { name: selectedLocation } });
    };

    const handleSendReports = () => {
        dataRoom.roomByLocation.forEach((room) => {
            const checkbox = document.getElementById(`checkbox-${room._id}`);
            if (checkbox.checked) {
                console.log(room._id, selectedStaff);
                setReportStatus('Creating Report...');
                createReport({ variables: { roomId: room._id, assignedStaff: selectedStaff } });
                setReportStatus('Report Created!');
            }
            setTimeout(() => {
                setReportStatus('');
            }, 3000);
        });
    };

    return (
        <div>
            {/* loading terinary operator otherwise will cause loading errors even on the smallest load times */}
            {loading || loadingLocation ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <div className="card  m-2 bg-primary text-primary-content">
                        <form onSubmit={handleSubmit}>
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
                            <button
                                className="ml-2 mr-2"
                                type="submit">Search for Rooms </button>
                        </form>
                    </div>
                </div>
            )}
            {/* Section for rooms, loads after you hit submit on the above form */}
            {loadingRoom ? (
                <p>Loading rooms...</p>
            ) : (
                dataRoom && (
                    <>
                        <div className="flex flex-col" style={{ alignItems: "center" }} >
                            {dataRoom.roomByLocation.map((room) => (
                                <div key={room.id}>
                                    <div className="card w-96 m-2 bg-primary text-primary-content">
                                        <div className="flex p-3 justify-between">
                                            {room.dateTimeProperties.overdueStatus ? (
                                                <div>
                                                    <h2 className="font-bold">Room: {room.roomName}</h2>
                                                    <p className="font-bold text-red-500">OVERDUE</p>
                                                    <p><span className="font-bold">Since: </span>{dateToLocale(room.dateTimeProperties.initialMissedDate)}</p>
                                                </div>
                                            ) : (<div>
                                                <h2 className="font-bold">Room: {room.roomName}</h2>
                                                <p><span className="font-bold">Due: </span>{dateToLocale(room.dateTimeProperties.upcomingDueDate)}</p>
                                                <p>(in {room.dateTimeProperties.timeToUpcomingDueDate})</p>
                                            </div>
                                            )}
                                            <input id={`checkbox-${room._id}`} type="checkbox" className="checkbox checkbox-success mt-auto mb-auto mr-4" />

                                        </div>
                                    </div>
                                </div>
                            ))}
                            <button onClick={handleSendReports}>Create Report</button>
                        </div>
                        <h2>{reportStatus}</h2>
                    </>
                )
            )}
        </div>
    );
}

export default CreateReport;