import React, { useState, useEffect } from 'react';
import { set, useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { ADD_CLIENT } from '../../utils/mutations';


const NewClientForm = ({setNewClient, newClient, handleSetClientIdData}) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [ savedClientCard, setSavedClientCard ] = useState( false );
    const [ clientId, setClientId] = useState('');

    //addClient saves the clientId to local storage on success so it can be passed to subsequent functions
    const [ addClient, { loading: addClientLoading, data: addClientData, error: addClientError }] = useMutation(ADD_CLIENT, {
      onCompleted({ addClient }){if (addClient){localStorage.setItem("clientId", addClient._id)}}
    });

    //Submit add mutation for new client
    const onSubmitClient = async (val) => {
        const clientObj = val;
        try {
            const { data } = await addClient({
                variables: { ...clientObj }
            });
            setNewClient(false);
       } catch (err){
            console.error(err);
        }

    }

    //Get clientId from local storage 
    useEffect(() => {
      let result = localStorage.getItem("clientId");
      setClientId(result);
      handleSetClientIdData(result);
        }, [])

    return(
      <div className="items-center">
      <div className="card bg-primary text-primary-content m-4">
        <form className="new-client m-4" onSubmit={handleSubmit(onSubmitClient)}>
          <h2 className="text-2xl">Add a New Client</h2>
            <label className="form-control w-full max-w-xs">
            <div className="label">
                    <span className="label-text">Business Name:</span>
                </div>
              <input {...register("businessName", { required: true, minLength: 1 })} type="text" placeholder="Business Name" className="input input-bordered w-full max-w-xs" />
              {errors.businessName?.type == "required" && (<p className="m-1"><i className="fa-solid fa-triangle-exclamation text-error text-s" />  Business name is required.</p>)}

            </label>
            <label className="form-control w-full max-w-xs">
            <div className="label">
                    <span className="label-text">Contact Name:</span>
                </div>
              <input {...register("contactName", { required: true, minLength: 1 })} type="text" placeholder="Contact Name" className="input input-bordered w-full max-w-xs" />  
              {errors.contactName?.type == "required" && ( <p className="m-1"><i className="fa-solid fa-triangle-exclamation text-error text-s" /> Contact name is required.</p>)}
            </label>
            <label className="form-control w-full max-w-xs">
            <div className="label">
                    <span className="label-text">Contact Email Address:</span>
                </div>
              <input {...register("contactEmail", { required: true, minLength: 1, pattern: /.+@.+\..+/ })} type="email" placeholder="Contact Email" className="input input-bordered w-full max-w-xs"/>
              {errors.contactEmail && ( <p className="m-1"><i className="fa-solid fa-triangle-exclamation text-error text-s" /> Contact email is required.</p>)}
            </label>
            {newClient === true? <button type="Submit" className="btn btn-outline m-4">Submit</button> : null} 
        </form>
      </div>
      </div>
    )
}

export default NewClientForm