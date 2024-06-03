import React from "react";

const RoomCard = ({locationList, roomPresent, locationId}) => {
    var roomList = [];

//Filter location list to rooms in this location
    if (roomPresent === true ){
        const filteredList = locationList.filter((location)=> location._id === locationId)
        roomList = filteredList[0].rooms
    } else { roomList = []}

    return (
        <>

        <div className="flex flex-wrap">
        {roomList.map((room) => (
                <>
                    <div className="card bg-base-300 text-primary-content m-1">
                        <div className="card-body">
                            <h2 className="card-title">{room.roomName}</h2>
                            <p><b>Inspection Cycle Length:</b> {room.inspectionCycleLength} </p>
                            <p><b>Equipment:</b> </p>
                            <ul className="m-1 list-disc">
                                { room.equipment && room.equipment.map((item) => (<li key={item._id}>{item.equipmentName}</li>))}
                            </ul>
                            <div className="card-actions justify-end">
                            </div>
                        </div>
                    </div>
                </>
            ))}
        </div>
        </>
    )
}

export default RoomCard
