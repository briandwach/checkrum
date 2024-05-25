import React, { useState } from 'react';
import { set, useForm } from 'react-hook-form';
import { useMutation} from '@apollo/client';
import { ADD_CLIENT } from '../../utils/mutations';

import AddLocationForm from '../AddLocationForm';
import ClientCard from './ClientCard';

const NewClientForm = ({setNewClient, newClient}) => {
    const { register, handleSubmit } = useForm();
    const [ savedClientCard, setSavedClientCard ] = useState( false );
    const [ addClient, { data, loading, error }] = useMutation(ADD_CLIENT);

    const onSubmitClient = async (val) => {
        const clientObj = val;
        console.log({...clientObj})
        try {
            const { data } = await addClient({
                variables: { ...clientObj }
            })
            setNewClient(false);
            console.log(newClient)
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