import React from "react";
import { set, useForm } from 'react-hook-form';
import { useMutation } from "@apollo/client";

import { EDIT_LOCATION } from "../../utils/mutations";

const EditLocation = ({locationId, address, locationName, accessInstructions, setEditLocation}) => {
    const { register, handleSubmit, formState: {errors} } = useForm();
    const [editLocation, {loading, error, data}]=useMutation(EDIT_LOCATION);

// Assembles object to be passed to edit location mutation, then submits it. 
    const onSubmitLocationEdit = async (val) => {
        const locationObj = val;
        locationObj.locationId = locationId;
       try {
            const { data } = await editLocation({
                variables: { ...locationObj}
            })
        setEditLocation(null)
       } catch (err){
            console.error(err);
        }
    }

    //Sets editLocation state to null, hiding the edit form
    const handleCancelEdit = (event) => {
        event.preventDefault();
        setEditLocation(null)
    }

    return (
        <div>
        <form className="edit-location m-4" onSubmit={handleSubmit(onSubmitLocationEdit)}>
        <h3>Editing {locationName} </h3>
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Location Name:</span>
                </div>
                <input {...register("locationName", { required: true, minLength: 1 })} type="text" defaultValue={locationName} className="input input-bordered w-full max-w-xs" />
                {errors.locationName?.type == "required" && ( <p className="m-1"><i className="fa-solid fa-triangle-exclamation text-error text-s" /> Location name is required.</p>)}
            </label>
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Location Address:</span>
                </div>
                <input {...register("address", { required: true, minLength: 1 })} type="text" defaultValue={address} className="input input-bordered w-full max-w-xs" />
                {errors.address?.type == "required" && ( <p className="m-1"><i className="fa-solid fa-triangle-exclamation text-error text-s" /> Address is required.</p>)}
            </label>
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Access Instructions:</span>
                </div>
                <input {...register("accessInstructions", { required: true, minLength: 1 })} type="text" defaultValue={accessInstructions} className="input input-bordered w-full max-w-xs" />
                {errors.accessInstructions?.type == "required" && ( <p className="m-1"><i className="fa-solid fa-triangle-exclamation text-error text-s" /> Access instructions are required.</p>)}
            </label>
            <button type="submit" className="btn btn-outline m-4" >Submit Location</button>
            <button type="button" className="btn btn-outline m-4" onClick={(event)=> handleCancelEdit(event)}> Cancel Edit Location</button>
        </form>
        </div>
    )
}

export default EditLocation