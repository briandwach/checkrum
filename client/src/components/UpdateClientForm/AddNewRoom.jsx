import React, { useState } from "react";
import { useForm, set } from "react-hook-form";
import { useQuery, useMutation } from "@apollo/client";

import { QUERY_EQUIPMENT } from '../../utils/queries';
import { ADD_ROOM } from "../../utils/mutations";

const AddNewRoom = ({ locationId, setAddRoom }) => {

    const { loading: loadingEquipment, data: dataEquipment } = useQuery(QUERY_EQUIPMENT);
    const [addRoom, { loading, error, data }] = useMutation(ADD_ROOM);
    const { register, handleSubmit, formState: {errors} } = useForm();
    const [selectedEquipment, setSelectedEquipment] = useState([]);
    var equipmentList = [];
    const items = dataEquipment?.equipmentItems || [];

    //Add and remove items from the equipment list for the room
    const handleCheck = (event) => {
        const itemId = event.target.getAttribute('name');
        const filterList = (arr, value) => {
            let index = arr.indexOf(value);
            if (index > -1) {
                arr.splice(index, 1)
            }
            return arr
        }
        event.target.checked ? equipmentList.push(itemId) : filterList(equipmentList, itemId);
    }

    //Update state of addRoom to Cancel to hide add room form
    const handleCancelAdd = (event) => {
        event.preventDefault(event);
        setAddRoom(false)
    }

    //Submit the room function
    const onSubmitRoom = async (val) => {
        const roomObj = val;
        roomObj.locationId = locationId;
        roomObj.location = locationId
        roomObj['equipment'] = equipmentList;

        try {
            const { data } = await addRoom({
                variables: { ...roomObj }
            })
        } catch (err) {
            console.error(err);
        }

        //Resetting form
        equipmentList = equipmentList.splice(0, equipmentList.length);
        document.getElementById("checkbox").checked = false;
        setAddRoom(false)
    }

    return (
        <>
            <form className="new-room bg-base-300" onSubmit={handleSubmit(onSubmitRoom)}>
                <div className="m-4">
                    <br />
                    <h3>Add a Room</h3>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Room Name</span>
                        </div>
                        <input {...register("roomName", { required: true })} type="text" placeholder="Room Name" className="input input-bordered w-full max-w-xs" />
                        {errors.roomName?.type == "required" && ( <p className="m-1"><i className="fa-solid fa-triangle-exclamation text-error text-s" />  Room name is required.</p>)}

                    </label>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Inspection Cycle Length</span>
                        </div>
                        <select
                            {...register("inspectionCycleLength", { required: true, validate: (value) => ['Daily', 'Weekly', 'Monthly'].includes(value) })}
                            className="m2 select select-bordered"
                        >
                            <option value="">Choose</option>
                            <option value="Daily">Daily</option>
                            <option value="Weekly">Weekly</option>
                            <option value="Monthly">Monthly</option>
                        </select>
                        {errors.inspectionCycleLength && ( <p className="m-1"><i className="fa-solid fa-triangle-exclamation text-error text-s" />  Inspection cycle length is required.</p>)}
                    </label>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Equipment in Room</span>
                        </div>
                        {items.map((item) => (
                            <div className="form-control" key={item.equipmentName}>
                                <label className="cursor-pointer label">
                                    <input type="checkbox" className="checkbox" id="checkbox" key={item._id} name={item._id} onChange={handleCheck} />
                                    <span className="label-text">{item.equipmentName}</span>
                                </label>
                            </div>

                        ))}
                    </label>
                    <button type="submit" className="btn btn-outline m-4">Submit Room</button>
                    <button type="button" className="btn btn-outline m-4" onClick={(event) => { handleCancelAdd(event) }}>Cancel Add Room</button>
                </div>
            </form>
        </>
    )
}


export default AddNewRoom