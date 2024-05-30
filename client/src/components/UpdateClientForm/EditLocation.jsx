import React from "react";
import { set, useForm } from 'react-hook-form';
import { useMutation } from "@apollo/client";

import { EDIT_LOCATION } from "../../utils/mutations";

const EditLocation = ({locationId, address, locationName, accessInstructions}) => {
    const { register, handleSubmit } = useForm();
    const [editLocation, {loading, error, data}]=useMutation(EDIT_LOCATION);

    const onSubmitLocationEdit = async (val) => {
        const locationObj = val;
        locationObj.locationId = locationId;
        console.log(locationObj);
       try {
            const { data } = await editLocation({
                variables: { ...locationObj}
            })
       } catch (err){
            console.log(err);
        }
    }

    return (
        <>
        <form className="new-location" onSubmit={handleSubmit(onSubmitLocationEdit)}>
        <h3>Edit a Location</h3>
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Location Name:</span>
                </div>
                <input {...register("locationName", { required: true })} type="text" defaultValue={locationName} className="input input-bordered w-full max-w-xs" />
            </label>
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Location Address:</span>
                </div>
                <input {...register("address", { required: true })} type="text" defaultValue={address} className="input input-bordered w-full max-w-xs" />
            </label>
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Access Instructions:</span>
                </div>
                <input {...register("accessInstructions", { required: true })} type="text" defaultValue={accessInstructions} className="input input-bordered w-full max-w-xs" />
            </label>
            <button type="submit" className="btn btn-outline btn-accent" >Submit Location</button>
        </form>
        </>
    )
}

export default EditLocation