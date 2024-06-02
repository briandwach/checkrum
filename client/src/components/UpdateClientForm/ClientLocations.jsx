import { useState, useEffect, Fragment } from 'react';
import { useQuery } from '@apollo/client';

import { QUERY_LOCATION_REVISED } from '../../utils/queries';

import LocationRooms from './LocationRooms';
import EditLocation from './EditLocation';
import AddNewRoom from './AddNewRoom';

const ClientLocations = ({selectedClientId}) => {
    const { loading, data, refetch } = useQuery(QUERY_LOCATION_REVISED, {pollInterval: 2000});
    const [ locations, setLocations] = useState([]);
    const [currentLocation, setCurrentLocation] = useState();
    const [ editLocation, setEditLocation] = useState({
        _id: '',
        locationName: '',
        accessInstructions: '',
        equipment: []
    });
    const [ addRoom, setAddRoom] = useState(false);

// Filter locations by client
    useEffect(() => {
        if (data) {
            const arr = data.locationsRevised.filter((client) => client._id === selectedClientId);
            const locationArr = arr.find(({locations}) => locations);
            const locationList = locationArr['locations'];
          setLocations( locationList)
        }
      }, [data, selectedClientId])

    // Update editLocation state to expose edit location form
      const handleEditClick = (event, loc) => {
        event.preventDefault();
        setEditLocation(loc._id)
        };
    
    // Update addRoom state to expose add room form
        const handleAddClick = (event) => {
            event.preventDefault();
            setAddRoom(true)
        } 

    return (
        <>
        <h4 className="text-xl font-bold m-4">Locations:</h4>
        {locations && locations.map(loc => (
                <div className="collapse bg-primary m-4 w-10/12" key={loc._id}>
                    <input type="checkbox" name="my-accordion-3" /> 
                    <div className="collapse-title text-xl font-medium" key={loc.locationName}>
                            {loc.locationName}
                            </div>
                    <Fragment>
                        { editLocation === loc._id? 
                        <EditLocation locationName={loc.locationName} address={loc.address} accessInstructions={loc.accessInstructions} locationId={loc._id} setEditLocation={setEditLocation}/> : 
                            <>
                                <div className="collapse-title text-xl font-medium" key={loc.locationName}>
                                    {loc.locationName}
                                </div>
                                 <div className="collapse-content" key={loc._id}> 
                                     <b>Address: </b> {loc.address} <br/>
                                     <b>Access Instructions: </b> {loc.accessInstructions}  <br/ >
                                    <button className="btn btn-outline m-2" type="button" onClick={(event) => handleEditClick(event, loc)}>Edit {loc.locationName} <i className="fa-solid fa-pencil"></i></button>
                                    <button className="btn btn-outline m-2" type="button" onClick={(event) => handleAddClick(event)}>Add a Room</button>
                                    <>
                                    { addRoom === true? 
                                        <AddNewRoom locationId={loc._id} setAddRoom={setAddRoom} /> : 
                                        <div> <h3>Rooms in {loc.locationName} </h3><br /> <LocationRooms locationId = {loc._id}/></div>
                                    }
                                    </>
                                </div>
                            </>
                        }
                    </Fragment>
                </div>
        ))}
        </>
    )
}

export default ClientLocations
