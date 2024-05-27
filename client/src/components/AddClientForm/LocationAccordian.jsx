import React from "react";
import { useQuery } from "@apollo/client";

import AddRoomForm from "../AddRoomForm";

import { QUERY_LOCATION_REVISED } from "../../utils/queries";

const LocationAccordian = () => {
    const { loading, data } = useQuery(QUERY_LOCATION_REVISED/*,{
        pollInterval: 2000
    }*/);

    if (loading) {
        return <div>Loading...</div>;
    }


    const clientId = localStorage.getItem("clientId");

    const arr = data.locationsRevised.filter(( client ) => client._id === clientId );
    const locationArr = arr.find(({locations}) => locations);
    //console.log(locationArr);
    //console.log(arr);
    //console.log(locationArr['locations']);
    const locationList = locationArr['locations'];
    //console.log(locationList);
    //const locationArr2 = Object.entries(locationArr.locations);
    //console.log(locationArr2);
    //console.log(locationArr2[0])
    /*const reduced = data.locationsRevised.reduce(function(filtered, location){
        if (location.client._id === clientId) {
            var newVal = { _id: location._id, locationName: location.locationName, address: location.address, accessInstructions: location.accessInstructions}
            filtered.push(newVal)
        }
        return filtered; 
    }, []);
    console.log(reduced);*/

    return (
        <>

            <p>Locations Display Here</p>
            <h3>Locations</h3>
            {locationList.map((location) => (
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
                        <AddRoomForm />
                        <div className="modal-action">
                        <form method="dialog">
                        <button className="btn">Close</button>
                        </form>
                        </div>
                        </div>
                    </dialog>
                    </div>
                    </div>
                    </>
                    ))}
        </>
    )
}

export default LocationAccordian

/*             {locationList.map((location) => (
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
                        <AddRoomForm />
                        <div className="modal-action">
                        <form method="dialog">
                       /* <button className="btn">Close</button>
                        </form>
                        </div>
                        </div>
                    </dialog>
                    </div>
                    </div>*/