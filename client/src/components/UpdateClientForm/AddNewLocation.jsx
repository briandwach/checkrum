import { useState } from 'react';
import { set, useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';

import { ADD_LOCATION } from '../../utils/mutations'


const AddNewLocation = ({clientId, setAddLocation}) => {
   const [ addLocation, {data, loading, error}] = useMutation(ADD_LOCATION);

    //Update state of addRoom to Cancel to hide add room form
    const handleCancelAdd = (event) => {
        event.preventDefault(event);
        setAddLocation(false)
    }

   //Add mutation for new location
    const onSubmitLocation = async (val) => {
        const locationObj = val;
        locationObj.clientId = clientId;

       try {
            const { data } = await addLocation({
                variables: { ...locationObj}
            })
            setAddLocation(false)
       } catch (err){
            console.log(err);
        }
    }

   const { register, handleSubmit } = useForm();

    return (
        <div className="m-8">
            <form className="new-location" onSubmit={handleSubmit(onSubmitLocation)}>
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
                    <button type="submit" className="btn btn-outline m-4" >Submit New Location</button>
                    <button type="button" className="btn btn-outline m-4" onClick={(event) => {handleCancelAdd(event)}}> Cancel Adding Location</button>
        </form>
        </div>
    )

}

export default AddNewLocation;