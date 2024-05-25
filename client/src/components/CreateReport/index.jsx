import { useState } from "react";
import { ALL_STAFF} from '../../utils/queries';
import { ALL_LOCATIONS } from '../../utils/queries';
import { ROOM_BY_LOCATION } from "../../utils/queries";
import { useLazyQuery, useQuery, useMutation } from '@apollo/client';
import { CREATE_REPORT } from "../../utils/mutations";


const CreateReport = () => {

    const { loading, data } = useQuery(ALL_STAFF);
    const { loading: loadingLocation, data: dataLocation } = useQuery(ALL_LOCATIONS);   


    const [selectedStaff, setSelectedStaff] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [loadRooms, { loading: loadingRoom, data: dataRoom }] = useLazyQuery(ROOM_BY_LOCATION);
    const [createReport] = useMutation(CREATE_REPORT);

    const handleSubmit = (e) => {
        e.preventDefault();
        loadRooms({ variables: { name: selectedLocation } });
    };

    const handleSendReports = () => {
        dataRoom.roomByLocation.forEach((room) => {
            const checkbox = document.getElementById(`checkbox-${room._id}`);
            if (checkbox.checked) {
                console.log(room._id, selectedStaff);
                createReport({ variables: { roomId: room._id, assignedStaff: selectedStaff } });
            }
        });
    };

    return (
        <div>
            {loading || loadingLocation ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <h1>Create Report</h1>

                    <form onSubmit={handleSubmit}>
                        <label htmlFor="staff">Select Staff:</label>
                        <select
                            id="staff"
                            name="staff"
                            value={selectedStaff}
                            onChange={(e) => setSelectedStaff(e.target.value)}
                        >
                            <option value="">Assign to:</option>
                            {data.allStaff.map((staff) => (
                                <option key={staff.id} value={staff.id}>
                                    {staff.username}
                                </option>
                            ))}
                        </select>
                        <label htmlFor="location">Select Location:</label>
                        <select
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
                        <button type="submit">Submit</button>
                    </form>
                </div>
            )}
            {/* Section for rooms, loads after you hit submit on the above form */}
            {loadingRoom ? (
                <p>Loading rooms...</p>
            ) : (
                <div>
                    {dataRoom && dataRoom.roomByLocation.map((room) => (
                        <div key={room.id}>
                            <div className="card w-96 m-2 bg-primary text-primary-content">
                                <div className="card-body">
                                    <h2 className="card-title">Room: {room.roomName} Due: 01/01/1999
                                    <input id={`checkbox-${room._id}`} type="checkbox" className="checkbox checkbox-success" />
                                    </h2>
                                </div>
                            </div>
                        </div>
                    ))}
                    <button onClick={handleSendReports}>Create Report</button>
                </div>
            )}
        </div>
    );
}

export default CreateReport;