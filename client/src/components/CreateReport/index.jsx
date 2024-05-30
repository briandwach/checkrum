import { useState } from "react";
import { ALL_STAFF} from '../../utils/queries';
import { ALL_LOCATIONS } from '../../utils/queries';
import { ROOM_BY_LOCATION } from "../../utils/queries";
import { useLazyQuery, useQuery, useMutation } from '@apollo/client';
import { CREATE_REPORT } from "../../utils/mutations";


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
                <div className="flex" style={{alignItems: "center"}}>
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
            {/* Section for rooms, loads after you hit submit on the above form */}
            {loadingRoom ? (
                <p>Loading rooms...</p>
            ) : (
                dataRoom && (
                    <>
                        <div className="flex flex-col" style={{ alignItems: "center"}} >
                            {dataRoom.roomByLocation.map((room) => (
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
                            <button 
                            className="btn btn-sm btn-primary m-2"
                                onClick={handleSendReports}>
                                Create Report
                            </button>
                        </div>
                        <h2>{reportStatus}</h2>
                    </>
                )
            )}
        </div>
    );
}

export default CreateReport;