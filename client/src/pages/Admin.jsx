import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import { QUERY_CLIENT } from '../utils/queries';

//import NewClientForm from '../components/AddClientForm/index';
import AddClientForm from '../components/AddClientForm/index';
import EditClientForm from '../components/EditClientForm';

export default function DataAdmin (){
    const [ location, setLocations ] = useState([]);
    const [ address, setAddress ] = useState('');
    const [ accessInstructions, setAccessInstructions ] = useState('');
    const [ roomName, setRoomName ] = useState([]);
    const [ equipment, setEquipment ] = useState([]);
    const [ lastInspectionDate, setInspectionDate ] = useState(0);
    const [ inspectionCycleLength, setInspectionCycleLength ] = useState(0);

    const { loading, clientData } = useQuery(QUERY_CLIENT);

    const clientList = clientData?.clients || {};
    
    // Button Logic
    const [ editClientForm, setEditClientForm ] = useState( false );
    const [ newClientForm, setNewClientForm] = useState( false );

    const handleButtonChange = async (event) => {
        const { name, value } = event.target;
        
        switch (name){
            case 'editClientButton': await setEditClientForm(true); await setNewClientForm(false); break;
            case 'newClientButton': await setEditClientForm(false); await setNewClientForm(true); break; 
        }
    }

    return (
        <main>
            <button type="button" className="m-1 btn" name="editClientButton" onClick={handleButtonChange}>Edit a client</button>
            <button type="button" className="btn btn-outline btn-accent" name="newClientButton" onClick={handleButtonChange}>Add a client</button>
            {newClientForm === true ? <AddClientForm /> : null}
            {editClientForm === true ? <EditClientForm /> : null}

            {console.log('Edit Client: ' + editClientForm + '; New Client: ' + newClientForm)}
            
        </main>
    )
}
