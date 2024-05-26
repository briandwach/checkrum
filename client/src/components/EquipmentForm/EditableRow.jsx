import { useState, useReducer } from "react";
import { useMutation } from "@apollo/client";
import { EDIT_EQUIPMENT } from "../../utils/mutations";


const EditableRow = ({item, editFormData, setEditFormData, setEditEquipmentItem}) => {

        const [state, updateState] = useState({ _id: item._id, equipmentName: item.equipmentName});

        const handleFormEditChange = (event) => {
            const fieldValue = event.target.value;
            updateState({ _id: item._id, equipmentName: fieldValue});
            console.log(state);
        }

        const [editEquipment, editError ] = useMutation(EDIT_EQUIPMENT);

        const handleEditFormSubmit = async ({equipmentId, equipmentName}) => {
            console.log('Editing Item')
            try {
              const { data } = await editEquipment({
                variables: {
                  equipmentId: state._id, 
                  equipmentName: state.equipmentName
                }
              })
              setEditEquipmentItem(null);
            } catch(err){
              console.log(err)
            }
        }

    return (
        <tr>
            <td>
                <input type="text" defaultValue={item.equipmentName} onChange={(event) => handleFormEditChange(event)}></input>
            </td>
            <td>
                <button type="button" onClick={() => handleEditFormSubmit({state})}>
                    <i className="fa-solid fa-floppy-disk"></i>
                </button>
            </td>
        </tr>
    )
}

export default EditableRow