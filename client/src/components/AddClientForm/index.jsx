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

      const showLocationForm = async (event) => {
        await setShowLocationBtn(true);
        console.log(showLocationBtn);
      };

      return (
        <div>

          { newClient === true ? <NewClientForm setNewClient={setNewClient} newClient={newClient}/> : null}
           { newClient === false? <ClientCard /> : null }
        </div>
      )
}

export default AddClientForm