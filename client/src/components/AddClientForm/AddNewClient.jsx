import React, { useState, useEffect } from 'react';
import { set, useForm } from 'react-hook-form';
import { useMutation , useQuery, useLazyQuery, InMemoryCache } from '@apollo/client';
import { ADD_CLIENT } from '../../utils/mutations';
//import { QUERY_SINGLE_CLIENT } from '../../utils/queries';

import AddLocationForm from '../AddLocationForm';
import ClientCard from './ClientCard';

const NewClientForm = ({setNewClient, newClient, handleSetClientIdData}) => {
    const { register, handleSubmit } = useForm();
    const [ savedClientCard, setSavedClientCard ] = useState( false );
    const [ clientId, setClientId] = useState('');

    const [ addClient, { loading: addClientLoading, data: addClientData, error: addClientError }] = useMutation(ADD_CLIENT, {
      onCompleted({ addClient }){if (addClient){localStorage.setItem("clientId", addClient._id)}}
    });
   // });c
    //const [getNewClientId, { data: clientData, loading: clientLoading }] = useLazyQuery(QUERY_SINGLE_CLIENT);



    const onSubmitClient = async (val) => {
        const clientObj = val;
        try {
            const { data } = await addClient({
                variables: { ...clientObj }
            });
            //const clientIdData = localStorage.getItem("clientId");
            console.log(clientId);
            setNewClient(false);
            //var newClientName = Object.values(clientObj)[0];
            //setClientName(newClientName)
            //sendClientData(clientId)
            //setClientIdData(clientId)
       } catch (err){
            console.log(err);
        }

    }

    useEffect(() => {
      let result = localStorage.getItem("clientId");
      setClientId(result);
      handleSetClientIdData(result);
        }, [])

    return(
      <>
        <form className="new-client" onSubmit={handleSubmit(onSubmitClient)}>
          <h3>Add a New Client</h3>
            <label className="form-control w-full max-w-xs">
            <div className="label">
                    <span className="label-text">Business Name:</span>
                </div>
              <input {...register("businessName", { required: true  })} type="Business Name" placeholder="Business Name" className="input input-bordered w-full max-w-xs" />
            </label>
            <label className="form-control w-full max-w-xs">
            <div className="label">
                    <span className="label-text">Contact Name:</span>
                </div>
              <input {...register("contactName", { required: true })} type="Contact Name" placeholder="Contact Name" className="input input-bordered w-full max-w-xs" />  
            </label>
            <label className="form-control w-full max-w-xs">
            <div className="label">
                    <span className="label-text">Contact Email Address:</span>
                </div>
              <input {...register("contactEmail", { required: true })} type="Contact Email" placeholder="Contact Email Address" className="input input-bordered w-full max-w-xs"/>
            </label>
            {newClient === true? <button type="Submit" className="btn btn-outline btn-accent">Submit</button> : null} 
        </form>
      </>
    )
}

export default NewClientForm