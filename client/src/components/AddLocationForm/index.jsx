import { useState } from 'react';
import { Link } from 'react-router-dom';
import { set, useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';

import { ADD_LOCATION } from '../../utils/mutations'

import Auth from '../../utils/auth';

const AddLocationForm = ({clientIdData}) => {
    console.log('Loaded add location form')
   const [ addLocation, {data, loading, error}] = useMutation(ADD_LOCATION);

    //TO DO: 
    // Close form after submit
    // Add submit mutation 
    // Pass setAddLocation up to parent

        const onSubmitLocation = async (val) => {
        var clientIdVal = await localStorage.getItem("clientId");
        console.log(clientIdVal);
        const locationObj = val;
       try {
            const { data } = await addLocation({
                variables: { ...locationObj, client: { _id: clientIdVal } }
            })
            //setAddLocation(false);
       } catch (err){
            console.log(err);
        }
        console.log(locationObj)

    }

   const { register, handleSubmit } = useForm();

    return (
        <form className="new-location" onSubmit={handleSubmit(onSubmitLocation)}>
        <h3>Add New Location</h3>
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Location Name</span>
                </div>
                <input {...register("locationName", { required: true })} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            </label>
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Location Address</span>
                </div>
                <input {...register("address", { required: true })} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            </label>
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Access Instructions</span>
                </div>
                <input {...register("accessInstructions", { required: true })} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            </label>
            <button type="submit" className="btn btn-outline btn-accent" >Submit Location</button>
        </form>
    )

}

export default AddLocationForm;