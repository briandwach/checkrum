import { useState } from 'react';
import { set, useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';

import { ADD_LOCATION } from '../../utils/mutations'

const AddLocationForm = ({clientIdData, setLocationPresent, setAddLocationButton}) => {
   const [ addLocation, {data, loading, error}] = useMutation(ADD_LOCATION);
  
   //update addLocationButton state to hide add form
   const handleCancelAdd = (event) => {
    event.preventDefault(event);
    setAddLocationButton(false)
    }

   //Add location mutation
    const onSubmitLocation = async (val) => {
        var clientIdVal = await localStorage.getItem("clientId");
        const locationObj = val;
        locationObj.clientId = clientIdVal;
       try {
            const { data } = await addLocation({
                variables: { ...locationObj}
            })
        
       } catch (err){
            console.log(err);
        }
        setLocationPresent(true);
        setAddLocationButton(false);
    }

   const { register, handleSubmit } = useForm();

    return (
        <form className="new-location m-4" onSubmit={handleSubmit(onSubmitLocation)}>
        <h3>Add New Location</h3>
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Location Name:</span>
                </div>
                <input {...register("locationName", { required: true })} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            </label>
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Location Address:</span>
                </div>
                <input {...register("address", { required: true })} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            </label>
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Access Instructions:</span>
                </div>
                <input {...register("accessInstructions", { required: true })} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            </label>
            <button type="submit" className="btn btn-outline m-4" >Submit Location</button>
            <button type="button" className="btn btn-outline m-4" onClick={(event)=>{handleCancelAdd(event)}}>Cancel Add Location</button>
        </form>
    )

}

export default AddLocationForm;