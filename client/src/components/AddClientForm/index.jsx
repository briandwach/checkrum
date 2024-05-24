import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import { ADD_CLIENT } from '../../utils/mutations';


import Auth from '../../utils/auth';
import AddLocationForm from '../AddLocationForm';
import ClientCard from '../AddClientForm/ClientCard';
import NewClientForm from '../AddClientForm/AddNewClient';

const AddClientForm = () => {

    /* const [ businessName , setBusinessName ] = useState('');
    const [ contactName, setContactName ] = useState('');
    const [ contactEmail, setContactEmail ] = useState('');*/
    const [ location, setLocations ] = useState([]);
    var [ showBtn, setShowBtn ] = useState(true);
    const [ showLocationBtn, setShowLocationBtn ] = useState(false);
    const [ newClient, setNewClient ] = useState(false);
 
    /* const [addClient, { addClientError }] = useMutation(ADD_CLIENT);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
          const { data } = await addClient({
            variables: {
              businessName,
              contactName,
              contactEmail,
              location
            },
          });

          setShowBtn(false);
          setNewClient(false);
        } catch (err) {
          console.error(err);
        }
      };

      const handleChange = (event) => {
        const { name, value } = event.target;
    
        switch(name){
            case 'businessName': setBusinessName(value); break;
            case 'contactName': setContactName(value); break;
            case 'contactEmail': setContactEmail(value); break;
        }

      }; */

      const showLocationForm = async (event) => {
        //event.preventDefault();
        await setShowLocationBtn(true);
        console.log(showLocationBtn);
      };

    /*  const showButton = () => {
        if (showBtn == false) {
          return <><button type="button" className="btn btn-outline btn-accent" onClick={showLocationForm}>Add Location</button>
          <AddLocationForm /></>
        } else { 
          return <button type="button" className="btn btn-outline btn-accent" onClick={handleFormSubmit} id="save-new-client">Save new client</button>
        }
      }; */

      return (
        <div>

          { newClient === false ? <NewClientForm/> : <ClientCard />}
           
        </div>
      )
}

export default AddClientForm