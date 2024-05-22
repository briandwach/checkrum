import React from "react";
import { useMutation } from "@apollo/client";
import { REMOVE_EQUIPMENT } from "../../utils/mutations";

const ReadOnlyRow = ({ item, handleEditClick }) => {

    const [removeEquipment, { removeError }] = useMutation(REMOVE_EQUIPMENT);

    const handleRemoveEquipment = async (equipmentId) => {
        event.preventDefault();
        try {
          console.log('Deletinig equipment...');
            const { data } = await removeEquipment({
            variables: { equipmentId },
            });
                console.log('Item deleted');

         } catch (err) {
            console.error(err);
        }
    };

return (
    <>
     <tr key={item._id}>
            <th></th>
            <td key={item._id} name={item._id}>{item.equipmentName}</td>
            <td><button><i className="fa-solid fa-trash-can" onClick={() => handleRemoveEquipment(item._id)}></i></button>
            <button><i className="fa-solid fa-pencil" onClick={(event) => handleEditClick(event, item)}></i></button>
            </td>
    </tr>
    </>
)
}
export default ReadOnlyRow