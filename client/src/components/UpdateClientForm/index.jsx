import { QUERY_CLIENT } from "../../utils/queries";
import { useQuery } from '@apollo/client';
import { useState, Fragment, useEffect } from 'react';

import ClientLocations from "./ClientLocations";
import EditClient from "./EditClient";
import ClientLocations2 from "./ClientLocations2";

const UpdateClientForm = () => { 

    const [selectedClientId, setSelectedClientId] = useState(null);
    const [editClient, setEditClient] = useState(null);

    const { loading, data } = useQuery(QUERY_CLIENT);

    var clientData = [];

//Filters client data to currently selected client
    const filterClients = () => {
        if (data) {
            clientData = data.clients.filter((client)=> client._id === selectedClientId)
            console.log(clientData);
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

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Select a Client to Edit</h1>
            <form onSubmit={handleClientSubmit}>
            <select onChange={handleClientChange} className="m-4 select select-bordered">
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
                                <h2 className="card-title">{client.businessName}</h2>
                                <p><b>Contact Name: </b>{client.contactName}</p>
                                <p><b>Contact Email: </b><a href="mailto:{client.contactEmail}">{client.contactEmail}</a></p>
                            </div>
                            <div className="card-footer m-4">
                                <button type="button" className="btn btn-outline m-2" onClick={(event) => handleEditClick(event, client)}>Edit Client <i className="fa-solid fa-pencil"></i></button>
                                <button type="button" className="btn btn-outline m-2">Add a Location</button>
                            </div>
                            </div>

                    }
                    </Fragment>
                    </div>
                ))}
            </div>
            {selectedClientId? <ClientLocations2 selectedClientId = {selectedClientId} /> : null}
        </div>
    );

}


export default UpdateClientForm;

/*
     <button className="btn" onClick={()=>document.getElementById('edit_client').showModal()}>Edit Client</button>
                            <dialog id="edit_client" className="modal">
                                <div className="modal-box">
                                    <EditClient clientId={client._id} businessName={client.businessName} contactName={client.contactName} contactEmail={client.contactEmail}/>
                                    <div className="modal-action">
                                        <form method="dialog">
                                        <button className="btn">Close</button>
                                        </form>
                                    </div>
                                </div>
                            </dialog>
*/

/*
{data.clients.map((client) => (
                    <div key={client._id}>
                    
                        {client._id === selectedClientId && (
                            <div className="card w-10/12 bg-primary text-primary-content m-4">
                            <div className="card-body m-4">
                                <h2 className="card-title">{client.businessName}</h2>
                                <p><b>Contact Name: </b>{client.contactName}</p>
                                <p><b>Contact Email: </b><a href="mailto:{client.contactEmail}">{client.contactEmail}</a></p>
                            </div>
                            <div className="card-footer m-4">
                                Footer
                            </div>
                            </div>
                        )}
                    </div>
                ))}
*/