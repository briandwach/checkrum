import React, {useState} from "react";
import { useForm, set } from "react-hook-form";
import { useQuery, useMutation } from "@apollo/client";

import { QUERY_EQUIPMENT } from '../../utils/queries';

const AddRoomForm = () => {

    const { loading: loadingEquipment, data: dataEquipment } = useQuery(QUERY_EQUIPMENT);
    const { register, handleSubmit } = useForm();
    const [ selectedEquipment, setSelectedEquipment ] = useState([]);
    const equipmentList = [];
    //const equipmentOptions = dataEquipment.equipmentItems;
    //console.log(equipmentOptions);
    const items = dataEquipment?.equipmentItems || [];
    console.log(items);

    //Add and remove items from the equipment list for the room
    const handleCheck = (event) => {
        //event.target.checked? equipmentList.push(event.target.key): equipmentList.filter(event.target.key);
        console.log('check: ' + event.target.getAttribute('name'));
        const itemId = event.target.getAttribute('name');
        const filterList = (arr, value) => {
            let index = arr.indexOf(value);
            if (index > -1 ){
                arr.splice(index, 1)
            }
            return arr
        }
        event.target.checked? equipmentList.push(itemId): filterList(equipmentList, itemId);
        console.log(equipmentList)
    }

    console.log(equipmentList);

    //Submit the room function
    const onSubmitRoom = (val) => {
        console.log(val)
        console.log(selectedEquipment)
    }

    return (
        <>
            <form className="new-room" onSubmit={handleSubmit(onSubmitRoom)}>
            <h3>Add a Room</h3>
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
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Equipment in Room</span>
                </div>
                {items.map((item)=>(
                    <div className="form-control" key={item.equipmentName}>
                    <label className="cursor-pointer label">
                      <input type="checkbox" className="checkbox checkbox-accent" key={item._id} name={item._id} onChange={handleCheck} />
                      <span className="label-text">{item.equipmentName}</span>
                    </label>
                  </div>
                    
                ))} 
            </label>
            <button type="submit" className="btn btn-outline btn-accent">Submit Room</button>
            </form>
        </>
    )
}

/*
                {items.map((item)=>(
                    <div className="form-control" key={item.equipmentName}>
                    <label className="cursor-pointer label">
                      <input type="checkbox" className="checkbox checkbox-accent" key={item._id} onChange={handleCheck} />
                      <span className="label-text">{item.equipmentName}</span>
                    </label>
                  </div>
                    
                ))} 
*/

export default AddRoomForm