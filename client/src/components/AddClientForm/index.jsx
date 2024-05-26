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
    const [ clientIdData, setClientIdData ] = useState('');
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

      const handleSetClientIdData = (newIdData) => {
        setClientIdData(newIdData)
      }

      return (
        <div>

          { newClient === true ? <NewClientForm setNewClient={setNewClient} newClient={newClient} handleSetClientIdData={handleSetClientIdData}/> : null}
          { newClient === false? <ClientCard clientIdData={clientIdData} /> : null }
          { newClient === false?  <button type="button" className="btn" onClick={()=>handleAddLocation()}>Add a Location heere</button>: null}
          { addLocationButton === true? <AddLocationForm clientIdData={clientIdData} />: null}
          {console.log(addLocationButton)}
          {console.log(clientIdData)}
        </div>
      )
}

export default AddClientForm