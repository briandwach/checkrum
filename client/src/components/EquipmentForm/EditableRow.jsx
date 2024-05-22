import React from "react";

const EditableRow = ({ editFormData, handleEditFormChange, handleEditFormSubmit }) => {
    return (
        <tr>
            <td>
                <input type="text" defaultValue={editFormData.equipmentName} onChange={handleEditFormChange}></input>
            </td>
            <td>
                <button type="submit" onClick={() => handleEditFormSubmit(editFormData)}>
                    <i className="fa-solid fa-floppy-disk"></i>
                </button>
            </td>
        </tr>
    )
}

export default EditableRow