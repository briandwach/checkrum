import React, { useState } from "react";
import { useQuery } from "@apollo/client";


import { QUERY_ROOM } from "../../utils/queries";

const LocationRooms = ({locationId}) => {
    const { loading, error, data } = useQuery( QUERY_ROOM );

    if (loading) {
        return <div>Loading...</div>;
    }

    const room = data?.room || error || [];

    const returnData = () => {
        console.log(room);
        if (error){
            console.error(error)
        }
    }
    /*const reduced = data.rooms.reduce(function(filtered, room){
        if (room.location._id === locationId) {
            var newVal = { _id: room._id, roomName: room.roomName}
            filtered.push(newVal)
        }
        return filtered; 
    }, [])*/

    return (
        <p>Rooms go here
            {console.log(locationId)}
            {returnData()}
        </p>
    )
}

export default LocationRooms