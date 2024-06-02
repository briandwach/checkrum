import React, { useState } from "react";
import { useQuery } from "@apollo/client";

import AddRoomForm from "../AddRoomForm";
import RoomCard from "../AddRoomForm/RoomCard";

import { QUERY_LOCATION_REVISED } from "../../utils/queries";

const LocationAccordian = ({locationPresent}) => {

    const [locationText, setLocationText] = useState('');
    const { loading, data } = useQuery(QUERY_LOCATION_REVISED,{
        pollInterval: 2000
    });
    const [roomPresent, setRoomPresent] = useState(false);
    const [addRoom, setAddRoom] = useState(false);

    if (loading) {
        return <div>Loading...</div>;
    }

//Retrieve clientId from location storage
    const clientId = localStorage.getItem("clientId");

//Filter locations based on clientId
    const arr = data.locationsRevised.filter(( client ) => client._id === clientId );
    const locationArr = arr.find(({locations}) => locations);
    var locationList = [];
    if (locationPresent === true){
        locationList = locationArr['locations']
    } else ( locationList = []);

    //Set state of addRoom to show add room form
    const handleAddClick = (event) => {
        event.preventDefault();
        setLocationText("Locations")
        setAddRoom(true)
        };

    return (
        <>
            <h3 className="m-4 text-xl">{locationText}</h3>
            {locationList && locationList.map((location) => (
                <>
                <div className="collapse bg-primary m-4" key={location.locationName}>
                <input type="checkbox" name="my-accordion-3" /> 
                   <div className="collapse-title text-xl font-medium" key={location.locationName}>
                    {location.locationName}
                    </div>
                    <div className="content-start collapse-content" key={location._id}> 
                        <b>Address: </b> {location.address} <br />
                        <b>Access Instructions: </b> {location.accessInstructions}<br />
                        <button className="btn btn-outline m-4 w-48" onClick={(event)=>{handleAddClick(event)}}>Add a Room</button>
                        { addRoom === true? <AddRoomForm locationId={location._id} setRoomPresent={setRoomPresent} setAddRoom={setAddRoom} />: null}
                        <h3 className="text-l">Rooms in {location.locationName}: </h3><br />
                        { roomPresent === true? <RoomCard locationList={locationList} roomPresent={roomPresent} locationId={location._id}/> : null}

                    </div>
                    </div>
                    
                    </>
                    ))}
        </>
    )
}

export default LocationAccordian
