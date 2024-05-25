import { useState } from 'react';
import { useQuery } from '@apollo/client';

import { QUERY_LOCATION } from '../../utils/queries';

const ClientLocations = ({selectedClientId}) => {
    const { loading, data } = useQuery(QUERY_LOCATION);

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
        {console.log(data.locations)}
        {console.log(reduced)}
        <h3>Locations</h3>
            {reduced.map((location) => (
                <>
                <div className="collapse collapse-plus bg-base-200">
                <input type="radio" name="my-accordion-3" /> 
                   <div className="collapse-title text-xl font-medium" key={location.locationName}>
                    {location.locationName}
                    </div>
                    <div className="collapse-content"> 
                        <b>Address: </b> {location.address} <br/>
                        <b>Access Instructions: </b> {location.accessInstructions}  <br/ >
                        <h3>Rooms in {location.locationName}: </h3>
                    </div>
                    </div>
                </>
            ))}
    </>
    )
}

export default ClientLocations