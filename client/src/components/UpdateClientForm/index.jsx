import { QUERY_CLIENT } from "../../utils/queries";
import { useQuery } from '@apollo/client';
import { useState, Fragment, useEffect } from 'react';

import ClientLocations from "./ClientLocations";
import EditClient from "./EditClient";
//import ClientLocations2 from "./ClientLocations2";
import AddNewLocation from "./AddNewLocation";

const UpdateClientForm = () => { 

    const [selectedClientId, setSelectedClientId] = useState(null);
    const [editClient, setEditClient] = useState(null);
    const [addLocation, setAddLocation ] = useState(null);

    const { loading, data } = useQuery(QUERY_CLIENT);

    var clientData = [];

//Filters client data to currently selected client
    const filterClients = () => {
        if (data) {
            clientData = data.clients.filter((client)=> client._id === selectedClientId)
        }}
    
    filterClients();

// Sets the client currently selected
    const handleClientChange = (event) => {
        setSelectedClientId(event.target.value)
    }

// Handles submit of client
    const handleClientSubmit = (event) => {
        event.preventDefault()
    }

//Handles click of edit client button
    const handleEditClick = (event, client) => {
        event.preventDefault();
        setEditClient(client._id)
        };

 // Update addLocation state to expose add room form
    const handleAddClick = (event) => {
        event.preventDefault();
        setAddLocation(true)
    } 

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2 className="m-4 text-xl"> Select a Client to Edit</h2>
            <form onSubmit={handleClientSubmit}>
            <select onChange={handleClientChange} className="m-4 select select-bordered">
                <option key="blank"></option>
                {data.clients.map((client) => (
                    <option key={client._id} value={client._id}>
                        {client.businessName}
                    </option>
                ))}
            </select>
            </form>
            <div>

            {clientData.map((client) => (
                <div className="card w-10/12 bg-primary text-primary-content m-4" key={client._id}>
                <Fragment key={client._id}>
                    { editClient === selectedClientId ? 
                        <EditClient clientId={client._id} businessName={client.businessName} contactName={client.contactName} contactEmail={client.contactEmail} setEditClient={setEditClient}/> :
                        <div key={client._id}>
  
                            <div className="card-body m-4">
                                <h1 className="card-title text-2xl">{client.businessName}</h1>
                                <p><b>Contact Name: </b>{client.contactName}</p>
                                <p><b>Contact Email: </b><a href="mailto:{client.contactEmail}">{client.contactEmail}</a></p>
                            </div>
                            <div className="card-footer m-4">
                                <button type="button" className="btn btn-outline m-2" onClick={(event) => handleEditClick(event, client)}>Edit Client <i className="fa-solid fa-pencil"></i></button>
                                <button type="button" className="btn btn-outline m-2" onClick={(event)=> handleAddClick(event)}>Add a Location</button>
                            </div>
                            { addLocation === true? <AddNewLocation clientId={client._id} setAddLocation={setAddLocation} /> : null}
                            </div>

                    }
                    </Fragment>
                    </div>
                ))}
            </div>
            {selectedClientId? <ClientLocations selectedClientId = {selectedClientId} /> : null}
        </div>
    );

}


export default UpdateClientForm;
