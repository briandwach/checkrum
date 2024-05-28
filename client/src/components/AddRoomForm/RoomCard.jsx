import React from "react";

const RoomCard = ({locationList, roomPresent, locationId}) => {
    var roomList = [];
   // const filter = locationList.filter((location)=> location._id === locationId);
    //console.log(locationList)
    //console.log(filter)
    //console.log(filter[0])
    //console.log(filter[0].rooms)
    //console.log(Object.values(filter))

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
                    <div className="card w-96 bg-primary text-primary-content inline-flex items-center flex-shrink-0">
                        <div className="card-body">
                            <h2 className="card-title">{room.roomName}</h2>
                            [Equipment goes here]
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
        </>
    )
}

export default RoomCard

/*
 {roomList.map((room) => (
                <>
                    <div className="card w-96 bg-primary text-primary-content inline-flex items-center flex-shrink-0">
                        <div className="card-body">
                            <h2 className="card-title">{room._id}</h2>
                            
                            <div className="card-actions justify-end">
                                <button type="button"className="btn">Edit Room</button>
                            </div>
                        </div>
                    </div>
                </>
            ))}
*/