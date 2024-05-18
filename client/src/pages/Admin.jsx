import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import { QUERY_CLIENT } from '../utils/queries';

import AddClientForm from '../components/AddClientForm';

export default function DataAdmin ({ clientId }){
    const [ businessName , setBusinessName ] = useState('');
    const [ contactName, setContactName ] = useState('');
    const [ contactEmail, setContactEmail ] = useState('');
    const [ location, setLocations ] = useState([]);
    const [ address, setAddress ] = useState('');
    const [ accessInstructions, setAccessInstructions ] = useState('');
    const [ roomName, setRoomName ] = useState([]);
    const [ equipment, setEquipment ] = useState([]);
    const [ lastInspectionDate, setInspectionDate ] = useState(0);
    const [ inspectionCycleLength, setInspectionCycleLength ] = useState(0);
    const [ newClientForm, setNewClientForm ] = useState(false);

    const { client , clientQueryError } = useQuery(QUERY_CLIENT);

    const onClick = () => setNewClientForm(true);
    //const [addClient, { addClientError }] = useMutation(ADD_CLIENT);
    // Select Existing Client
    // Add New Client

    return (
        <main>
            <details className="dropdown">
                <summary className="m-1 btn">Edit a client</summary>
                    <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                    placeholder text
                    </ul>
            </details>
            <button className="btn btn-outline btn-accent" onClick={onClick}>Add a client</button>
            {newClientForm? <AddClientForm /> : null}
            
            <h2> Location Information</h2>
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Locations</span>
                </div>
                <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            </label>
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Location Address</span>
                </div>
                <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            </label>
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Access Instructions</span>
                </div>
                <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            </label>
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Room Name</span>
                </div>
                <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            </label>
        </main>
    )
}