import React, { useState } from "react";
import { useQuery } from "@apollo/client";


import { QUERY_ROOM } from "../../utils/queries";
import EditRoom from "./EditRoom";

const LocationRooms = ({locationId}) => {
    const { loading, error, data } = useQuery( QUERY_ROOM );
    const [ currentLocation, setCurrentLocation] = useState('');

    if (loading) {
        return <div>Loading...</div>;
    }

    // Filter room list by location
    var roomList = [];

    for (let i = 0; i < Object.keys(data.rooms).length; i++ ){
        if (data.rooms[i].location && data.rooms[i].location._id === locationId){
            var newVal = { _id: data.rooms[i]._id, roomName: data.rooms[i].roomName, equipment: data.rooms[i].equipment}
            roomList.push(newVal)
        }
        
    }

    return (
        <div className="flex flex-wrap mt-10">
        <div className="p-4 max-w-sm">
        <div className="flex flex-col h-full p-8 ">
        <div className="flex mb-3 space-x-4">
        {roomList.map((room) => (
                <>
                    <div className="card w-96 bg-primary text-primary-content inline-flex items-center flex-shrink-0">
                        <div className="card-body">
                            <h2 className="card-title">{room.roomName}</h2>
                            <p><b>Inspection Cycle Length: </b>{room.inspectionCycleLength}</p>
                                { room.equipment &&
                                    room.equipment.map((item) => (<ul key={item._id}>{item.equipmentName}</ul>))
                                }
                            <div className="card-actions justify-end">
                            <button className="btn" onClick={()=>{document.getElementById('edit_room').showModal()}}>Edit Room</button>
<dialog id="edit_room" className="modal">
  <div className="modal-box">
    <EditRoom roomId={room._id} roomName={room.roomName} equipment={room.equipment} inspectionCycleLength={room.inspectionCycleLength} />
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
                            </div>
                        </div>
                    </div>
                </>
            ))}
        </div>
        </div>
        </div>
        </div>
    )
}

export default LocationRooms
