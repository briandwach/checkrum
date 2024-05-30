import React from "react";
import { useForm, set } from "react-hook-form";
import { useQuery, useMutation } from "@apollo/client";

import { QUERY_EQUIPMENT } from '../../utils/queries';
import { EDIT_ROOM } from "../../utils/mutations";

const EditRoom = ({roomId, roomName, equipment, inspectionCycleLength}) => {
    const { register, handleSubmit } = useForm();
    const { loading: loadingEquipment, data: dataEquipment } = useQuery(QUERY_EQUIPMENT);
    const [ editRoom, {loading, error, data}] = useMutation(EDIT_ROOM);

    const items = dataEquipment?.equipmentItems || [];


    //This array handles existing equipment
    const checkedEquipment = [];

    //Determines which items should be checked when a user opens the form
    const checkCheckedItems = () => {
        for (let i = 0; i < Object.keys(equipment).length; i ++){
            checkedEquipment.push(equipment[i]._id)
        }
    }
    checkCheckedItems();

      //These handle the equipment values at submit
      const equipmentList = [...checkedEquipment];
      const handleCheck = (event) => {
          const itemId = event.target.getAttribute('name');
          const filterList = (arr, value) => {
              let index = arr.indexOf(value);
              if (index > -1 ){
                  arr.splice(index, 1)
              }
              return arr
          }
          event.target.checked? equipmentList.push(itemId): filterList(equipmentList, itemId);
      }
  
      console.log(equipmentList);


    //Assemble the input for the editRoom mutation and submit that
    const onSubmitRoomEdit = async (val) => {
        val.roomId = roomId;
        val.equipment = equipmentList;
        console.log(val)
        const roomObj = val;

        try {
            const { data } = await editRoom({
                variables: { ...roomObj}
            })
       } catch (err){
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
                <input {...register("inspectionCycleLength", { required: true, valueAsNumber: true })} type="number" defaultValue={inspectionCycleLength} className="input input-bordered w-full max-w-xs" />
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
            <button type="submit" className="btn btn-outline btn-accent" onClick={()=> document.getElementById('edit_room').close()}>Submit Room</button>
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