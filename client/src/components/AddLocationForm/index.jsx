import { useState } from 'react';
import { Link } from 'react-router-dom';
import { set, useForm } from 'react-hook-form';

//import { ADD_LOCATION } from '../../utils/mutations'

import Auth from '../../utils/auth';

const AddLocationForm = () => {
    console.log('Loaded add location form')
   // const [ addLocation, {data, loading, error}] = useMutation();

   const { register, handleSubmit } = useForm();

  const onSubmitLocation =  (val) => {
//make async and add try catch
         console.log(val)
   }; 

    return (
        <form className="new-location" onSubmit={handleSubmit(onSubmitLocation)}>
        <h3>Add New Location</h3>
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Locations</span>
                </div>
                <input {...register("locationName", { required: true })} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            </label>
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Location Address</span>
                </div>
                <input {...register("locationAddress", { required: true })} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            </label>
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Access Instructions</span>
                </div>
                <input {...register("accessInstructions", { required: true })} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            </label>
        </form>
    )

}

export default AddLocationForm;