import React from "react";
import { useState, useEffect } from 'react';
import { useForm, set } from "react-hook-form";
import { useQuery, useMutation } from "@apollo/client";

import { QUERY_EQUIPMENT } from '../../utils/queries';
import { EDIT_ROOM } from "../../utils/mutations";

const EditRoom = ({ roomId, roomName, equipment, inspectionCycleLength }) => {
    const { register, handleSubmit } = useForm();
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
        };

        // NOTE: I can confirm that up to here a successful array named equipmentList is created 
        // contaiting only the objectIDs of the equipment items that are checked

        val.roomId = roomId;
        val.equipment = equipmentList;
        console.log(val)
        const roomObj = val;

        try {
            const { data } = await editRoom({
                variables: { ...roomObj }
            })
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <form className="edit-room" onSubmit={handleSubmit(onSubmitRoomEdit)}>
                <h3>Edit a Room</h3>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Room Name</span>
                    </div>
                    <input {...register("roomName", { required: true })} type="text" defaultValue={roomName} className="input input-bordered w-full max-w-xs" />
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Inspection Cycle Length (Days)</span>
                    </div>
                    <input {...register("inspectionCycleLength", { required: true })} type="text" defaultValue={inspectionCycleLength} className="input input-bordered w-full max-w-xs" />
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Equipment in Room</span>
                    </div>
                    {equipmentItems.map((item) => (
                        <div className="form-control" key={item.equipmentName}>
                            <label className="cursor-pointer label">
                                <input type="checkbox" checked={itemCheckbox[item._id]} className="checkbox checkbox-accent" id="checkbox" key={item._id} name={item._id}
                                    onChange={e => setItemCheckbox(prevState => ({ ...prevState, [item._id]: e.target.checked }))} />
                                <span className="label-text">{item.equipmentName}</span>
                            </label>
                        </div>

                    ))}
                </label>
                <button type="submit" className="btn btn-outline btn-accent" onClick={() => document.getElementById('edit_room').close()}>Submit Room</button>
            </form>
        </>
    )
}

export default EditRoom

/*
              {items.map((item)=>(
                    <div className="form-control" key={item.equipmentName}>
                    <label className="cursor-pointer label">
                      <input type="checkbox" className="checkbox checkbox-accent" id="checkbox" key={item._id} name={item._id} onChange={handleCheck} />
                      <span className="label-text">{item.equipmentName}</span>
                    </label>
                  </div>
                    
                ))} 
*/