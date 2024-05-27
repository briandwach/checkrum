import { QUERY_CLIENT } from "../../utils/queries";
import { useQuery } from '@apollo/client';
import { useState } from 'react';

import ClientLocations from "./ClientLocations";


const UpdateClientForm = () => { 

    const [selectedClientId, setSelectedClientId] = useState(null);

    const { loading, data } = useQuery(QUERY_CLIENT);

    const handleClientChange = (event) => {
        setSelectedClientId(event.target.value)
    }

    const handleClientSubmit = (event) => {
        console.log(selectedClientId);
        event.preventDefault()
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    
    //this return is just an idea of how to structure the form
    return (
        <div>
            <h1>Select a Client to Update</h1>
            <form onSubmit={handleClientSubmit}>
            <select onChange={handleClientChange}>
                {data.clients.map((client) => (
                    <option key={client._id} value={client._id}>
                        {client.businessName}
                    </option>
                ))}
            </select>
            </form>
            <div>
                {data.clients.map((client) => (
                    <div key={client._id}>
                        {client._id === selectedClientId && (
                            <div className="card w-11/12 bg-primary text-primary-content">
                            <div className="card-body">
                                <h2 className="card-title">{client.businessName}</h2>
                                <p><b>Contact Name: </b>{client.contactName}</p>
                                <p><b>Contact Email: </b><a href="mailto:{client.contactEmail}">{client.contactEmail}</a></p>
                            </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {selectedClientId? <ClientLocations selectedClientId = {selectedClientId} /> : null}
        </div>
    );

}


export default UpdateClientForm;