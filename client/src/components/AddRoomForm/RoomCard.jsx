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
         <div className="flex flex-wrap mt-10">
        <div className="p-4 max-w-sm">
        <div className="flex flex-col h-full p-8 ">
        <div className="flex mb-3 space-x-4">
        {roomList.map((room) => (
                <>
                    <div className="card w-96 bg-base-300 text-primary-content inline-flex items-center flex-shrink-0">
                        <div className="card-body">
                            <h2 className="card-title">{room.roomName}</h2>
                            { room.equipment && room.equipment.map((item) => (<ul key={item._id} className="m-1">{item.equipmentName}</ul>))}
                            <div className="card-actions justify-end">
                            </div>
                        </div>
                    </div>
                </>
            ))}
        </div>
        </div>
        </div>
        </div>
        </>
    )
}

export default RoomCard
