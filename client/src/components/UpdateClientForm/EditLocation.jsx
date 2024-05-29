import React from "react";
import { set, useForm } from 'react-hook-form';

const EditLocation = ({locationId, address, locationName, accessInstructions}) => {
    const { register, handleSubmit } = useForm();

    const onSubmitLocationEdit = (val) => {
        console.log(val)
    }
    return (
        <>
        <form className="new-location" onSubmit={handleSubmit(onSubmitLocationEdit)}>
        <h3>Edit a Location</h3>
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Location Name:</span>
                </div>
                <input {...register("locationName", { required: true })} type="text" value={locationName} className="input input-bordered w-full max-w-xs" />
            </label>
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Location Address:</span>
                </div>
                <input {...register("address", { required: true })} type="text" value={address} className="input input-bordered w-full max-w-xs" />
            </label>
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Access Instructions:</span>
                </div>
                <input {...register("accessInstructions", { required: true })} type="text" value={accessInstructions} className="input input-bordered w-full max-w-xs" />
            </label>
            <button type="submit" className="btn btn-outline btn-accent" >Submit Location</button>
        </form>
        </>
    )
}

export default EditLocation