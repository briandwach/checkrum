import React from "react";
import { useForm, set } from "react-hook-form";
import { useQuery, useMutation } from "@apollo/client";

import { QUERY_EQUIPMENT } from '../../utils/queries';

const EditRoom = ({roomId, roomName, equipment, inspectionCycleLength}) => {
    const { register, handleSubmit } = useForm();
    const { loading: loadingEquipment, data: dataEquipment } = useQuery(QUERY_EQUIPMENT);

    console.log(equipment)
    console.log(typeof equipment)
    //console.log(dataEquipment.equipmentItems[0]['_id'])

    const checkedEquipment = [];

    const checkCheckedItems = () => {
        for (let i = 0; i < Object.keys(equipment).length; i ++){
            console.log(equipment[i]._id);
            checkedEquipment.push(equipment[i]._id)
        }
        console.log(checkedEquipment)
    }
    checkCheckedItems();
    const items = dataEquipment?.equipmentItems || [];

    const onSubmitRoomEdit = (val) => {
        console.log(val)
    }

    const handleCheck = () => {
        console.log('Checked values')
    }

    return (
        <>
        <form className="edit-room" onSubmit={handleSubmit(onSubmitRoomEdit)}>
            <h3>Edit a Room</h3>
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Room Name</span>
                </div>
                <input {...register("roomName", { required: true })} type="text" value={roomName} className="input input-bordered w-full max-w-xs" />
            </label>
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Inspection Cycle Length (Days)</span>
                </div>
                <input {...register("inspectionCycleLength", { required: true, valueAsNumber: true })} type="number" value={inspectionCycleLength} className="input input-bordered w-full max-w-xs" />
            </label>
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Equipment in Room</span>
                </div>
                {items.map((item)=>(
                    <div className="form-control" key={item.equipmentName}>
                    <label className="cursor-pointer label">
                        { checkedEquipment.includes(item._id)? <input type="checkbox" checked className="checkbox checkbox-accent" id="checkbox" key={item._id} name={item._id} onChange={handleCheck}/> :
                                              <input type="checkbox" className="checkbox checkbox-accent" id="checkbox" key={item._id} name={item._id} onChange={handleCheck} />
}
                      <span className="label-text">{item.equipmentName}</span>
                    </label>
                  </div>
                    
                ))} 
            </label>
            <button type="submit" className="btn btn-outline btn-accent" onClick={()=> document.getElementById('edit_room_modal').close()}>Submit Room</button>
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