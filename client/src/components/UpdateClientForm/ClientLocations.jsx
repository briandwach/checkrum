import { useState } from 'react';
import { useQuery } from '@apollo/client';

import { QUERY_LOCATION } from '../../utils/queries';

import LocationRooms from './LocationRooms';

const ClientLocations = ({selectedClientId}) => {
    const { loading, data } = useQuery(QUERY_LOCATION);
    const [ locationId, setLocationId] = useState('');
    if (loading) {
        return <div>Loading...</div>;
    }

    const reduced = data.locations.reduce(function(filtered, location){
        if (location.client._id === selectedClientId) {
            var newVal = { _id: location._id, locationName: location.locationName, address: location.address, accessInstructions: location.accessInstructions}
            filtered.push(newVal)
        }
        return filtered; 
    }, [])

    return (
        <>
        <h3>Locations</h3>
            {reduced.map((location) => (
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
                        <LocationRooms locationId = {location._id}/>
                    </div>
                    </div>
                </>
            ))}
    </>
    )
}

export default ClientLocations