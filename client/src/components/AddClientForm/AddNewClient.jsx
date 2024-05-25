import React, { useState } from 'react';
import { set, useForm } from 'react-hook-form';
import { useMutation , useQuery, useLazyQuery } from '@apollo/client';
import { ADD_CLIENT } from '../../utils/mutations';
//import { QUERY_SINGLE_CLIENT } from '../../utils/queries';

import AddLocationForm from '../AddLocationForm';
import ClientCard from './ClientCard';

const NewClientForm = ({setNewClient, newClient, setClientName}) => {
    const { register, handleSubmit } = useForm();
    const [ savedClientCard, setSavedClientCard ] = useState( false );
    const [ addClient, { loading: addClientLoading, data: addClientData, error: addClientError }] = useMutation(ADD_CLIENT);
    //const [getNewClientId, { data: clientData, loading: clientLoading }] = useLazyQuery(QUERY_SINGLE_CLIENT);



    const onSubmitClient = async (val) => {
        const clientObj = val;
        try {
            const { data } = await addClient({
                variables: { ...clientObj }
            })
            setNewClient(false);
            var newClientName = Object.values(clientObj)[0]
            setClientName(newClientName)
       } catch (err){
            console.log(err);
        }

    }

    return(
      <>
        <form className="new-client" onSubmit={handleSubmit(onSubmitClient)}>
          <h3>Add New Client</h3>
            <label className="input flex items-center gap-2">
              <input {...register("businessName", { required: true  })} type="Business Name" placeholder="Business Name" className="input input-bordered w-full max-w-xs" />
            </label>
            <label className="input flex items-center gap-2">
              <input {...register("contactName", { required: true })} type="Contact Name" placeholder="Contact Name" className="input input-bordered w-full max-w-xs" />  
            </label>
            <label className="input flex items-center gap-2">
              <input {...register("contactEmail", { required: true })} type="Contact Email" placeholder="Contact Email Address" className="input input-bordered w-full max-w-xs"/>
            </label>
            {newClient === true? <button type="Submit" className="btn btn-outline btn-accent">Submit</button> : null} 
        </form>
      </>
    )
}

export default NewClientForm