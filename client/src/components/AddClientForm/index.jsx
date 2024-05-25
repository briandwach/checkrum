import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import { ADD_CLIENT } from '../../utils/mutations';


import Auth from '../../utils/auth';
import AddLocationForm from '../AddLocationForm';
import ClientCard from '../AddClientForm/ClientCard';
import NewClientForm from '../AddClientForm/AddNewClient';

const AddClientForm = () => {
    const [ location, setLocations ] = useState([]);
    var [ showBtn, setShowBtn ] = useState(true);
    const [ showLocationBtn, setShowLocationBtn ] = useState(false);
    const [ newClient, setNewClient ] = useState(true);
    const [ clientName, setClientName ] = useState('');
    const [ addLocationButton, setAddLocationButton ] = useState( false );

    //TO DO
    //Add button to add new client after form is completed

    
    const showLocationForm = async (event) => {
      await setShowLocationBtn(true);
      console.log(showLocationBtn);
      };

      const handleAddLocation = async (event) => {
        await setAddLocationButton( true );
      }

      return (
        <div>

          { newClient === true ? <NewClientForm setNewClient={setNewClient} newClient={newClient} setClientName={setClientName}/> : null}
           { newClient === false? <ClientCard clientName={clientName} /> : null }
           { newClient === false?  <button type="button" className="btn" onClick={()=>handleAddLocation()}>Add a Location heere</button>: null}
           { addLocationButton === true? <AddLocationForm />: null}
           {console.log(clientName)}
           {console.log(addLocationButton)}

        </div>
      )
}

export default AddClientForm