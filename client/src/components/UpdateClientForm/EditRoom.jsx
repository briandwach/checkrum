import React from "react";
import { useForm, set } from "react-hook-form";

const EditRoom = ({roomId, roomName, equipment, inspectionCycleLength}) => {
    const { register, handleSubmit } = useForm();
    console.log(roomId);
    console.log(roomName);
    console.log(equipment);
    console.log(inspectionCycleLength);

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
                {equipment.map((item)=>(
                    <div className="form-control" key={item.equipmentName}>
                    <label className="cursor-pointer label">
                      <input type="checkbox" checked className="checkbox checkbox-accent" id="checkbox" key={item._id} name={item._id} onChange={handleCheck} />
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