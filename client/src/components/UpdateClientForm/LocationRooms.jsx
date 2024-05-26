import React, { useState } from "react";
import { useQuery } from "@apollo/client";


import { QUERY_ROOM } from "../../utils/queries";

const LocationRooms = ({locationId}) => {
    const { loading, error, data } = useQuery( QUERY_ROOM );

    if (loading) {
        return <div>Loading...</div>;
    }

// Filter data by location
    const reduced = data.rooms.reduce(function(filtered, room){
        if (room.location._id === locationId){
            var newVal = { _id: room.id, roomName: room.roomName, equipment: room.equipment}
            filtered.push(newVal)
        }
        return filtered
    }, [])

    return (
        <div className="flex flex-wrap mt-10">
        <div className="p-4 max-w-sm">
        <div className="flex flex-col h-full p-8 ">
        <div className="flex mb-3 space-x-4">
            {reduced.map((room) => (
                <>
                    <div className="card w-96 bg-primary text-primary-content inline-flex items-center flex-shrink-0">
                        <div className="card-body">
                            <h2 className="card-title">{room.roomName}</h2>
                                {
                                    room.equipment.map((item) => (<ul key={item._id}>{item.equipmentName}</ul>))
                                }
                            <div className="card-actions justify-end">
                                <button type="button"className="btn">Edit Room</button>
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