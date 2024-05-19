import { QUERY_CLIENT } from "../../utils/queries";
import { useQuery } from '@apollo/client';
import { useState } from 'react';




const UpdateClientForm = () => { 

    const [selectedClientId, setSelectedClientId] = useState(null);

    const { loading, data } = useQuery(QUERY_CLIENT);

    if (loading) {
        return <div>Loading...</div>;
    }

    
    //this return is just an idea of how to structure the form
    return (
        <div>
            <h1>Select a Client to Update</h1>
            <select>
                {data.clients.map((client) => (
                    <option key={client._id} value={client._id}>
                        {client.businessName}
                    </option>
                ))}
            </select>
            <div>
                {data.clients.map((client) => (
                    <div key={client._id}>
                        {client._id === selectedClientId && (
                            <div>
                                <h2>{client.businessName}</h2>
                                <p>{client.address}</p>
                                <p>{client.city}</p>
                                <p>{client.state}</p>
                                <p>{client.zip}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );

}


export default UpdateClientForm;