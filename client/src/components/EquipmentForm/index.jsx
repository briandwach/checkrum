import { useState, useReducer, Fragment } from 'react';
import { useMutation, useQuery} from '@apollo/client';
import Auth from '../../utils/auth';
import { ADD_EQUIPMENT,  REMOVE_EQUIPMENT } from '../../utils/mutations';
import { QUERY_EQUIPMENT } from '../../utils/queries';
import ReadOnlyRow from './ReadOnlyRow';
import EditableRow from './EditableRow';

const AddEquipmentForm = () => {
    const [ equipmentName, setEquipmentName ] = useState('');
    const [ addEquipment, { error }] = useMutation(ADD_EQUIPMENT);
    const { loading, data } = useQuery(QUERY_EQUIPMENT, {
       pollInterval: 2000,
    });

    const [editEquipmentItem, setEditEquipmentItem] = useState(null);

    const items = data?.equipmentItems || [];

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
        const { data } = await addEquipment({
            variables: {
              equipmentName
            },
          });

          setEquipmentName('');
        } catch (err) {
          console.error(err);
        }
      };

    const handleChange = (event) => {
      event.preventDefault();
        const { name, value } = event.target;
        //if (name === "equipmentNameField"){
            setEquipmentName(value)
       // }
        };

       /* const [removeEquipment, { removeError }] = useMutation(REMOVE_EQUIPMENT)

        const handleRemoveEquipment = async (equipmentId) => {
            try {
                const { data } = await removeEquipment({
                variables: { equipmentId },
                });
                    console.log('Item deleted');

             } catch (err) {
                console.error(err);
            }
        };*/

        const handleEditClick = (event, item) => {
            event.preventDefault();
            setEditEquipmentItem(item._id);

          ///  const formValues = { 
                equipmentName: item.equipmentName
            };

           // setEditFormData(formValues);
       // };

      const [editFormData, setEditFormData] = useState({
            _id: '',
            equipmentName: ''
        });

        //console.log(editFormData);
        const handleEditFormChange = (event) => {
            event.preventDefault();
            const fieldName = event.target.getAttribute('name');
            const fieldValue = event.target.value;

            const newFormData = { ...editFormData };
            newFormData[fieldName] = fieldValue;
            setEditFormData(newFormData);
        };

       /* const handleEditFormSubmit = (event) => {
            event.preventDefault();
        }*/

    return (
        <div>
            <div className="overflow-x-auto">
            <form>
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Equipment Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items && items.map((item) => (
                            <Fragment>
                                { editEquipmentItem === item._id? 
                                <EditableRow item = {item } editFormData={editFormData} handleEditFormChange={handleEditFormChange} setEditFormData={setEditFormData} setEditEquipmentItem={setEditEquipmentItem} /> : 
                                <ReadOnlyRow item = { item } handleEditClick={handleEditClick}/> }
                            </Fragment>
                        ))}
                        <tr>
                            <th>New Equipment</th>
                            <td><input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" value={equipmentName} onChange={handleChange}/>
                            </td>
                            <td><button onClick={handleFormSubmit}><i className="fa-solid fa-floppy-disk"></i></button></td>
                             </tr>
                     </tbody>
                </table>
            </form>
        </div>
        </div>
    )
}
export default AddEquipmentForm