import { useState, useReducer } from "react";
import { useMutation } from "@apollo/client";
import { EDIT_EQUIPMENT } from "../../utils/mutations";


const EditableRow = ({item, editFormData, setEditFormData, setEditEquipmentItem}) => {

    // Set the initial state when the edit form opens
        const [state, updateState] = useState({ _id: item._id, equipmentName: item.equipmentName});

    // Handle changes to the value of fields
        const handleFormEditChange = (event) => {
            const fieldValue = event.target.value;
            updateState({ _id: item._id, equipmentName: fieldValue});
        }

        const [editEquipment, editError ] = useMutation(EDIT_EQUIPMENT);

      //Handle form submit; reset editEquipmentItem state to close edit form
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
              console.error(err)
            }
        }

    return (
        <tr>
            <td>
                <input type="text" defaultValue={item.equipmentName} onChange={(event) => handleFormEditChange(event)}></input>
            </td>
            <td>
                <button type="button" onClick={() => handleEditFormSubmit({state})}>
                    <i className="fa-solid fa-floppy-disk hover:text-green-400"></i>
                </button>
            </td>
        </tr>
    )
}

export default EditableRow