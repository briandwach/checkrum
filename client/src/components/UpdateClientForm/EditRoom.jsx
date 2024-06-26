import React from "react";
import { useState, useEffect } from 'react';
import { useForm, set } from "react-hook-form";
import { useQuery, useMutation } from "@apollo/client";

import { QUERY_EQUIPMENT } from '../../utils/queries';
import { EDIT_ROOM } from "../../utils/mutations";

const EditRoom = ({ roomId, roomName, equipment, inspectionCycleLength, setEditRoom }) => {
    const { register, handleSubmit, formState: {errors} } = useForm();
    const { loading: loadingEquipment, data: dataEquipment } = useQuery(QUERY_EQUIPMENT);
    const [editRoom, { loading, error, data }] = useMutation(EDIT_ROOM);
    // Default item checkbox is an empty object
    // Eventually becomes an object with keys at equipmentIds and then values or true or false
    const [itemCheckbox, setItemCheckbox] = useState({});

    //This array handles existing equipment
    const checkedEquipment = [];

    //Identifies which items should be checked when a user opens the form
    const checkCheckedItems = () => {
        for (let i = 0; i < Object.keys(equipment).length; i++) {
            checkedEquipment.push(equipment[i]._id)
        }
    }
    checkCheckedItems();

    // Sets the state of all the checkboxes if the QUERY_EQUIPMENT data is successfully fetched
    useEffect(() => {
        if (dataEquipment) {
            const items = dataEquipment.equipmentItems;

            // Iterates through and populates state object with equipment Ids and true of false for check state
            const setCheckboxValues = (items) => {
                for (const item of items) {
                    const itemId = item._id;

                    if (checkedEquipment.includes(itemId)) {
                        setItemCheckbox(prevState => ({ ...prevState, [itemId]: true }));
                    } else {
                        setItemCheckbox(prevState => ({ ...prevState, [itemId]: false }));
                    }
                }
            }
            setCheckboxValues(items);
        }
    }, [dataEquipment]);

    if (loadingEquipment) {
        return <div>Loading...</div>;
    }

    // Declare an array of all equipment objects
    const equipmentItems = dataEquipment.equipmentItems;

    //Assemble the input for the editRoom mutation and submit that
    const onSubmitRoomEdit = async (val) => {

        // Create an array of all equipment IDs
        const equipmentIdsArr = [];
        equipmentItems.forEach(obj => {
            equipmentIdsArr.push(obj._id); // Extracting the 'name' property from each object
        });

        //Determines which equipment items should be included when submitting the form
        const equipmentList = [];
        for (let i = 0; i < equipmentIdsArr.length; i++) {
            if (itemCheckbox[equipmentIdsArr[i]])
                equipmentList.push(equipmentIdsArr[i])
        }

        val.roomId = roomId;
        val.equipment = equipmentList;
        const roomObj = val;

        try {
            const { data } = await editRoom({
                variables: { ...roomObj }
            })
            setEditRoom(null);
        } catch (err) {
            console.error(err);
        }
    }

       //Resets setEditClient state, hiding edit form
       const handleCancelEdit = (event) => {
        event.preventDefault();
        setEditRoom(null)
    }

    return (
        <>
            <form className="edit-room" onSubmit={handleSubmit(onSubmitRoomEdit)}>
                <h3>Edit a Room</h3>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Room Name</span>
                    </div>
                    <input {...register("roomName", { required: true, minLength: 1 })} type="text" defaultValue={roomName} className="input input-bordered w-full max-w-xs" />
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
                        {errors.inspectionCycleLength?.type == "required" && ( <p className="m-1"><i className="fa-solid fa-triangle-exclamation text-error text-s" />  Inspection cycle length is required.</p>)}
                    </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Equipment in Room</span>
                    </div>
                    {equipmentItems.map((item) => (
                        <div className="form-control" key={item.equipmentName}>
                            <label className="cursor-pointer label">
                                <input type="checkbox" checked={itemCheckbox[item._id]} className="checkbox" id="checkbox" key={item._id} name={item._id}
                                    onChange={e => setItemCheckbox(prevState => ({ ...prevState, [item._id]: e.target.checked }))} />
                                <span className="label-text">{item.equipmentName}</span>
                            </label>
                        </div>

                    ))}
                </label>
                <button type="submit" className="btn btn-outline m-2" onClick={() => document.getElementById('edit_room').close()}>Submit Room</button>
                <button type="button" className="btn btn-outline m-2" onClick={(event) => handleCancelEdit(event)}>Cancel Edit Room</button>
            </form>
        </>
    )
}

export default EditRoom
