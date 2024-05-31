import React, {useState} from "react";
import { useForm, set } from "react-hook-form";
import { useQuery, useMutation } from "@apollo/client";

import { QUERY_EQUIPMENT } from '../../utils/queries';
import { ADD_ROOM } from "../../utils/mutations";

const AddRoomForm = ({locationId, setRoomPresent}) => {

    const { loading: loadingEquipment, data: dataEquipment } = useQuery(QUERY_EQUIPMENT);
    const [addRoom, {loading, error, data}] = useMutation(ADD_ROOM);
    const { register, handleSubmit } = useForm();
    const [ selectedEquipment, setSelectedEquipment ] = useState([]);
    const [ currentLocation, setCurrentLocation] = useState(locationId)
    var equipmentList = [];
    const items = dataEquipment?.equipmentItems || [];


    //Add and remove items from the equipment list for the room
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

    //Submit the room function
    const onSubmitRoom = async (val) => {
        const roomObj = val;
        roomObj.locationId = currentLocation;
       roomObj['equipment'] = equipmentList;
      

        try {
            const { data } = await addRoom({
                variables: { ...roomObj}
            })
       } catch (err){
            console.log(err);
        }

        //Resetting form
        equipmentList = equipmentList.splice(0, equipmentList.length);
        document.getElementById("checkbox").checked = false;
        setRoomPresent(true);
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
                <input {...register("inspectionCycleLength", { required: true, valueAsNumber: true })} type="number" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            </label>
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Equipment in Room</span>
                </div>
                {items.map((item)=>(
                    <div className="form-control" key={item.equipmentName}>
                    <label className="cursor-pointer label">
                      <input type="checkbox" className="checkbox checkbox-accent" id="checkbox" key={item._id} name={item._id} onChange={handleCheck} />
                      <span className="label-text">{item.equipmentName}</span>
                    </label>
                  </div>
                    
                ))} 
            </label>
            <button type="submit" className="btn btn-outline btn-accent" onClick={()=> document.getElementById('add_room_modal').close()}>Submit Room</button>
            </form>
        </>
    )
}


export default AddRoomForm