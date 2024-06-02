import { useState } from 'react';

import AddLocationForm from '../AddLocationForm';
import ClientCard from '../AddClientForm/ClientCard';
import NewClientForm from '../AddClientForm/AddNewClient';
import LocationAccordian from './LocationAccordian';

const AddClientForm = () => {
    const [ location, setLocations ] = useState([]);
    var [ showBtn, setShowBtn ] = useState(true);
    const [ showLocationBtn, setShowLocationBtn ] = useState(false);
    const [ newClient, setNewClient ] = useState(true);
    const [ clientIdData, setClientIdData ] = useState('');
    const [ addLocationButton, setAddLocationButton ] = useState( false );
    const [ locationPresent, setLocationPresent ] = useState(false);

    
    // Handles showing location form
    const showLocationForm = async (event) => {
      await setShowLocationBtn(true);
      };

    // Handles showing add location form
      const handleAddLocation = async (event) => {
        await setAddLocationButton( true );
      }

    // Handles setting the ClientId when recieved from new client add mutation so other components have access
      const handleSetClientIdData = (newIdData) => {
        setClientIdData(newIdData)
      }

      //Reset form states so user can add another client
      const resetForm = (event) => {
      setShowLocationBtn(false);
      setAddLocationButton(false);
      setNewClient(true)
  }

      return (
        <div className='flex w-10/12' style={{flexDirection:"column"}} >
          { newClient === true ? <NewClientForm setNewClient={setNewClient} newClient={newClient} handleSetClientIdData={handleSetClientIdData}/> : null}
          { newClient === false? <ClientCard clientIdData={clientIdData} /> : null }
          { newClient === false?  <button type="button" className="btn btn-outline m-4 w-48" onClick={()=>handleAddLocation()}>Add a Location</button>: null}
          { addLocationButton === true ? <AddLocationForm clientIdData={clientIdData} setLocationPresent={setLocationPresent} setAddLocationButton={setAddLocationButton}/>: null}
          { newClient === false? <LocationAccordian locationPresent={locationPresent}/> : null}
          { newClient === false? <button type="button" className="btn btn-outline m-4 w-48" onClick={(event)=>{resetForm(event)}}>Add Another Client</button> : null}
        </div>
      )
}

export default AddClientForm