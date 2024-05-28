import React, { useState } from "react";
import { useQuery } from "@apollo/client";

import AddRoomForm from "../AddRoomForm";
import RoomCard from "../AddRoomForm/RoomCard";

import { QUERY_LOCATION_REVISED } from "../../utils/queries";

const LocationAccordian = ({locationPresent}) => {
    const { loading, data } = useQuery(QUERY_LOCATION_REVISED,{
        pollInterval: 2000
    });
    const [roomPresent, setRoomPresent] = useState(false);

    if (loading) {
        return <div>Loading...</div>;
    }


    const clientId = localStorage.getItem("clientId");

    const arr = data.locationsRevised.filter(( client ) => client._id === clientId );
    const locationArr = arr.find(({locations}) => locations);
    var locationList = [];
    console.log(locationArr);
    if (locationPresent === true){
        locationList = locationArr['locations']
    } else ( locationList = []);

    console.log(locationList);

    return (
        <>

            <p>Locations Display Here</p>
            <h3>Locations</h3>
            {locationList && locationList.map((location) => (
                <>
                <div className="collapse collapse-plus bg-base-200">
                <input type="radio" name="my-accordion-3" /> 
                   <div className="collapse-title text-xl font-medium" key={location.locationName}>
                    {location.locationName}
                    </div>
                    <div className="collapse-content" key={location._id}> 
                        <b>Address: </b> {location.address} <br/>
                        <b>Access Instructions: </b> {location.accessInstructions}  <br/ >
                        <h3>Rooms in {location.locationName}: </h3><br />
                        <button className="btn" type="button" onClick={()=>document.getElementById('add_room_modal').showModal()}>Add a Room</button>
                        <dialog id="add_room_modal" className="modal modal-bottom sm:modal-middle">
                        <div className="modal-box">
                        <AddRoomForm locationId={location._id} setRoomPresent={setRoomPresent} />
                        <div className="modal-action">
                        <form method="dialog">
                        <button className="btn">Close Without Saving</button>
                        </form>
                        </div>
                        </div>
                    </dialog>
                    </div>
                    </div>
                    { roomPresent === true? <RoomCard locationList={locationList} roomPresent={roomPresent} locationId={location._id}/> : null}
                    </>
                    ))}
        </>
    )
}

export default LocationAccordian
