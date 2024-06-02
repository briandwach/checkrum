import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";


import { QUERY_ROOM } from "../../utils/queries";
import EditRoom from "./EditRoom";

const LocationRooms = ({locations, locationId}) => {
    const { loading, error, data, refetch } = useQuery( QUERY_ROOM );
    const [ editRoom, setEditRoom] = useState(null);

    useEffect(() => {
        refetch();
    }, []);

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
                            <div className="flex flex-col justify-between ">
                {room._id === editRoom? 
                    <EditRoom roomId={room._id} roomName={room.roomName} inspectionCycleLength={room.inspectionCycleLength} equipment={room.equipment} setEditRoom={setEditRoom}/> : 
                            <>
                            <h2 className="card-title">{room.roomName}</h2>
                            <p><b>Inspection Cycle Length: </b>{room.inspectionCycleLength}</p>
                            { room.equipment && room.equipment.map((item) => (<ul key={item._id} className="m-1">{item.equipmentName}</ul>))}
                                <div className="card-actions justify-end m-4">
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

export default LocationRooms