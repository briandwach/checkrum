import { useState, useReducer } from "react";
import { useMutation } from "@apollo/client";
import { EDIT_EQUIPMENT } from "../../utils/mutations";


const EditableRow = ({item, editFormData, setEditFormData}) => {
    const [editEquipment, editError ] = useMutation(EDIT_EQUIPMENT);

        const handleEditFormSubmit = async ({equipmentId, equipmentName}) => {
            console.log('Editing Item')
            try {
              const { data } = await editEquipment({
                variables: {
                  equipmentId: state._id, 
                  equipmentName: state.equipmentName}
              })
              console.log('Edited equipment')
            } catch(err){
              console.log(err)
            }
        }

       /* const handleEditFormChange = (event) => {
            event.preventDefault();
            const fieldName = event.target.getAttribute('defaultValue');
            const fieldValue = event.target.value;

            const newFormData = { ...editFormData };
            newFormData[fieldName] = fieldValue;
            setEditFormData(newFormData);

        }; */

        const initialState = { _id: item._id, equipmentName: item.equipmentName};
        const [state, updateState] = useReducer(( state, updates) => ({...state, ...updates}), initialState)

        const handleFormEditChange = (event) => {
            //event.preventDefault();
            const fieldValue = event.target.value;
            updateState({equipmentName: fieldValue});
            console.log(state);
        }

    return (
        <tr>
            <td>
                <input type="text" defaultValue={item.equipmentName} onChange={(event) => handleFormEditChange(event)}></input>
            </td>
            <td>
                <button onClick={() => handleEditFormSubmit({state})}>
                    <i className="fa-solid fa-floppy-disk"></i>
                </button>
            </td>
        </tr>
    )
}

export default EditableRow