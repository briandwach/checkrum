import React from "react";
import { set, useForm } from 'react-hook-form';
import { useMutation } from "@apollo/client";

import { EDIT_CLIENT } from "../../utils/mutations";

const EditClient = ({clientId, businessName, contactName, contactEmail, setEditClient}) => {
    const { register, handleSubmit } = useForm();
    const [ editClient, { loading, data, errors }]=useMutation(EDIT_CLIENT);

  //Submits client edit mutation
    const onSubmitClientEdit = async (val) => {
      const clientObj = val;
      clientObj.clientId = clientId;
      try {
          const { data } = await editClient({
              variables: { ...clientObj }
          });
        setEditClient(null)
     } catch (err){
          console.log(err);
      }

    }

    //Resets setEditClient state, hiding edit form
    const handleCancelEdit = (event) => {
      event.preventDefault();
      setEditClient(null)
  }

    return (
        <>
        <form className="edit-client m-4" onSubmit={handleSubmit(onSubmitClientEdit)}>
          <h3>Edit {businessName}</h3>
            <label className="form-control w-full max-w-xs">
            <div className="label">
                    <span className="label-text">Business Name:</span>
                </div>
              <input {...register("businessName", { required: true  })} type="text" defaultValue={businessName} className="input input-bordered w-full max-w-xs" />
            </label>
            <label className="form-control w-full max-w-xs">
            <div className="label">
                    <span className="label-text">Contact Name:</span>
                </div>
              <input {...register("contactName", { required: true })} type="text" defaultValue={contactName} className="input input-bordered w-full max-w-xs" />  
            </label>
            <label className="form-control w-full max-w-xs">
            <div className="label">
                    <span className="label-text">Contact Email Address:</span>
                </div>
              <input {...register("contactEmail", { required: true })} type="email" defaultValue={contactEmail} placeholder="Contact Email Address" className="input input-bordered w-full max-w-xs"/>
            </label>
            <button type="submit" className="btn btn-outline m-4" >Submit Client</button>
            <button type="submit" className="btn btn-outline m-4" onClick={(event)=> handleCancelEdit(event)}>Cancel Edit Client</button>
        </form>
        </>
    )
}

export default EditClient