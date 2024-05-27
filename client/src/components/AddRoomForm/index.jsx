import React from "react";
import { useForm, set } from "react-hook-form";
import { useQuery, useMutation } from "@apollo/client";

import { QUERY_EQUIPMENT } from '../../utils/queries';

const AddRoomForm = () => {

    const { loading: loadingEquipment, data: dataEquipment } = useQuery(QUERY_EQUIPMENT);
    const { register, handleSubmit } = useForm();
    console.log(dataEquipment);
    return (
        <>
            <form className="new-room">
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Room Name</span>
                </div>
                <input {...register("roomName", { required: true })} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            </label>
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Inspection Cycle Length (Days)</span>
                </div>
                <input {...register("inspectionCycleLength", { required: true })} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            </label>

            </form>
        </>
    )
}

// {dataEquipment.equipmentItems.map((item)=>{item.equipmentName})

//}

export default AddRoomForm