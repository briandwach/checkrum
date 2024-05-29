import React from "react";
import { set, useForm } from 'react-hook-form';

const EditClient = ({clientId, businessName, contactName, contactEmail}) => {
    const { register, handleSubmit } = useForm();

    const onSubmitClientEdit = (val) => {
        console.log(val)
    }

    return (
        <>
        <form className="new-client" onSubmit={handleSubmit(onSubmitClientEdit)}>
          <h3>Edit a Client</h3>
            <label className="form-control w-full max-w-xs">
            <div className="label">
                    <span className="label-text">Business Name:</span>
                </div>
              <input {...register("businessName", { required: true  })} type="text" value={businessName} className="input input-bordered w-full max-w-xs" />
            </label>
            <label className="form-control w-full max-w-xs">
            <div className="label">
                    <span className="label-text">Contact Name:</span>
                </div>
              <input {...register("contactName", { required: true })} type="text" value={contactName} className="input input-bordered w-full max-w-xs" />  
            </label>
            <label className="form-control w-full max-w-xs">
            <div className="label">
                    <span className="label-text">Contact Email Address:</span>
                </div>
              <input {...register("contactEmail", { required: true })} type="email" value={contactEmail} placeholder="Contact Email Address" className="input input-bordered w-full max-w-xs"/>
            </label>
            <button type="submit" className="btn btn-outline btn-accent" >Submit Client</button>
        </form>
        </>
    )
}

export default EditClient