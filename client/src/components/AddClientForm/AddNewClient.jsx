import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation} from '@apollo/client';
import { ADD_CLIENT } from '../../utils/mutations';

const NewClientForm = () => {
    const { register, handleSubmit } = useForm();
    const [ addClient, { data, loading, error }] = useMutation(ADD_CLIENT);

    const onSubmitClient = async (val) => {
        const clientObj = val;
        console.log({...clientObj})
        try {
            const { data } = await addClient({
                variables: { ...clientObj }
            })
       } catch (err){
            console.log(err);
        }

    }

    return(
        <form className="new-client" onSubmit={handleSubmit(onSubmitClient)}>
            <input {...register("businessName", { required: true  })} type="Business Name" placeholder="Business Name" className="input input-bordered w-full max-w-xs" />
            <input {...register("contactName", { required: true })} type="Contact Name" placeholder="Contact Name" className="input input-bordered w-full max-w-xs" />
            <input {...register("contactEmail", { required: true })} type="Contact Email" placeholder="Contact Email Address"  className="input input-bordered w-full max-w-xs"/>
            <button type="Submit">Submit</button>
        </form>
    )
}

export default NewClientForm