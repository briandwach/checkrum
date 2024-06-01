import React, { useState } from "react";
import { useQuery } from "@apollo/client";


import { QUERY_ROOM } from "../../utils/queries";
import EditRoom from "./EditRoom";
import AddRoomForm from "../AddRoomForm";

const LocationRooms = ({locations, locationId}) => {
    const { loading, error, data } = useQuery( QUERY_ROOM );
    const [ editRoom, setEditRoom] = useState(null);

    if (loading) {
        return <div>Loading...</div>;
    }

    // Filter room list by location
    var roomList = [];

    for (let i = 0; i < Object.keys(data.rooms).length; i++ ){
        if (data.rooms[i].location && data.rooms[i].location._id === locationId){
            var newVal = { _id: data.rooms[i]._id, roomName: data.rooms[i].roomName, equipment: data.rooms[i].equipment, inspectionCycleLength: data.rooms[i].inspectionCycleLength}
            roomList.push(newVal)
        }
        
    }

    // Update editRoom state on click
    const handleEditClick = (event, room) => {
        event.preventDefault();
        setEditRoom(room._id)
        };

    return (
      <div className="flex flex-wrap justify-center mt-10">
        {roomList.map((room)=>(
                <>
                <div className="p-4 max-w-sm">
                <div className="flex rounded-lg h-full bg-base-300 p-8 flex-col">
                    <div className="flex flex-col justify-between flex-grow">
                    <h2 className="card-title">{room.roomName}</h2>
                        <p><b>Inspection Cycle Length: </b>{room.inspectionCycleLength}</p>
                        { room.equipment && room.equipment.map((item) => (<ul key={item._id}>{item.equipmentName}</ul>))}
                        <div className="card-actions justify-end">
                                <button className="btn bg-secondary m-4 text-base-300 hover:bg-primary hover:text-white" onClick={()=>{document.getElementById('edit_room').showModal()}}>Edit Room</button>
                                <dialog id="edit_room" className="modal">
                                    <div className="modal-box">
                                        <EditRoom roomId={room._id} roomName={room.roomName} equipment={room.equipment} inspectionCycleLength={room.inspectionCycleLength} />
                                        <div className="modal-action">
                                            <form method="dialog">
                                                <button className="btn">Close</button>
                                            </form>
                                        </div>
                                    </div>
                                </dialog>
                            </div>
                    </div>
                </div>
            </div>
            </>
        ))}
        <div className="p-4 max-w-sm">
                <div className="flex rounded-lg h-full bg-primary p-8 flex-col">
                    <div className="flex flex-col justify-between flex-grow bg-base-300">
                    <button className="btn bg-secondary m-4 text-base-300 hover:bg-primary hover:text-white" onClick={()=>{document.getElementById('add_room_modal').showModal()}}>Add a Room</button>
                                <dialog id="add_room_modal" className="modal">
                                    <div className="modal-box">
                                        <AddRoomForm  locationId={locationId}/>
                                        <div className="modal-action">
                                            <form method="dialog">
                                                <button className="btn">Close</button>
                                            </form>
                                        </div>
                                    </div>
                                </dialog>
                    </div>
                </div>
            </div>
      </div>
    )
}

export default LocationRooms

/*

        <div className="flex mt-10">
        <div className="p-4 max-w-sm">
        <div className="flex flex-col">
        <div className="flex-wrap mb-3 space-x-4">
        {roomList.map((room) => (
        <div className="flex flex-wrap justify-center mt-10">
        {roomList.map((room)=>(
                <>
                  <div className="p-4 max-w-sm">
                        <div className="flex rounded-lg h-full bg-base-300 p-8 flex-col">
                            <div className="flex flex-col justify-between ">
                {room._id === editRoom? 
                    <EditRoom roomId={room._id} roomName={room.roomName} inspectionCycleLength={room.inspectionCycleLength} equipment={room.equipment} setEditRoom={setEditRoom}/> : 
                            <>
                            <h2 className="card-title">{room.roomName}</h2>
                            <p><b>Inspection Cycle Length: </b>{room.inspectionCycleLength}</p>
                            { room.equipment && room.equipment.map((item) => (<ul key={item._id} className="m-1">{item.equipmentName}</ul>))}
                                <div className="card-actions justify-end">
                                    <button type="button" className="btn btn-outline" onClick={(event)=>{handleEditClick(event, room)}}>Edit {room.roomName} <i className="fa-solid fa-pencil"></i></button>
                            </div>
                            </>
                }
                </div>
                </div>
                </div>
            </>
        ))}

      </div>
 
    )
}

*/