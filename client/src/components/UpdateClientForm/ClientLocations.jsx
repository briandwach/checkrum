import { useState } from 'react';
import { useQuery } from '@apollo/client';

//import { QUERY_LOCATION } from '../../utils/queries';
import { QUERY_LOCATION_REVISED } from '../../utils/queries';

import LocationRooms from './LocationRooms';
import EditLocation from './EditLocation';

const ClientLocations = ({selectedClientId}) => {
    const { loading, data } = useQuery(QUERY_LOCATION_REVISED);
    const [ locationId, setLocationId] = useState('');
    if (loading) {
        return <div>Loading...</div>;
    }

    // Filtering data by the ID of the client being viewed and returning a usable list
    const arr = data.locationsRevised.filter((client) => client._id === selectedClientId);
    const locationArr = arr.find(({locations}) => locations);
    const locationList = locationArr['locations'];


    return (
        <>
            <h3>Locations</h3>
             {locationList && locationList.map((location) => (
            <>
                <div className="collapse collapse-plus bg-base-200 " class = "test" key={location._id}>
                    <input type="radio" name="my-accordion-3" /> 
                    <div className="collapse-title text-xl font-medium" key={location.locationName}>
                    {location.locationName}
                </div>
                <div className="collapse-content"  key={location._id}> 
                    <b>Address: </b> {location.address} <br/>
                    <b>Access Instructions: </b> {location.accessInstructions}  <br/ >
                    <h3>Rooms in {location.locationName}: </h3><br />
                    <LocationRooms locationId = {location._id}/>
                </div>
                <button className="btn" onClick={()=>document.getElementById('edit_location').showModal()}>Edit Location</button>
                <dialog id="edit_location" className="modal">
                  <div className="modal-box">
                    <EditLocation locationId={location._id} locationName={location.locationName} address={location.address} accessInstructions={location.accessInstructions} />
                    <div className="modal-action">
                    <form method="dialog">
                      <button className="btn">Close</button>
                    </form>
                    </div>
                  </div>
                </dialog>
              </div>
            </>
          ))}
        </>
    )
}

export default ClientLocations
