import React from "react";
import { useMutation } from "@apollo/client";
import { REMOVE_EQUIPMENT } from "../../utils/mutations";

const ReadOnlyRow = ({ item, handleEditClick }) => {

    const [removeEquipment, { removeError }] = useMutation(REMOVE_EQUIPMENT);

    // Handle mutation to delete equipment
    const handleRemoveEquipment = async (equipmentId) => {
        try {
            const { data } = await removeEquipment({
            variables: { equipmentId },
            });

         } catch (err) {
            console.error(err);
        }
    };

return (
    <>
     <tr key={item._id}>
            <th></th>
            <td key={item._id} name={item._id}>{item.equipmentName}</td>
            <td><button type="button" className="m-1"><i className="fa-solid fa-trash-can hover:text-red-400" onClick={() => handleRemoveEquipment(item._id)}></i></button>
            <button type="button" className="m-1"><i className="fa-solid fa-pencil hover:text-yellow-400" onClick={(event) => handleEditClick(event, item)}></i></button>
            </td>
    </tr>
    </>
)
}
export default ReadOnlyRow