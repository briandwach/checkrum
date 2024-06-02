import { useState, Fragment } from 'react';
import { useMutation, useQuery} from '@apollo/client';


import { ADD_EQUIPMENT } from '../../utils/mutations';
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

    // Submit add equipment mutation 
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

    // Handle entry of equipment name
    const handleChange = (event) => {
      event.preventDefault();
        const { name, value } = event.target;
            setEquipmentName(value)
        };
    
        // Handle state change for edit equipment itme
        const handleEditClick = (event, item) => {
            event.preventDefault();
            setEditEquipmentItem(item._id);
                equipmentName: item.equipmentName
            };

        // Setting edit form state
      const [editFormData, setEditFormData] = useState({
            _id: '',
            equipmentName: ''
        });

        // Handling changes to the edit form and updating state
        const handleEditFormChange = (event) => {
            event.preventDefault();
            const fieldName = event.target.getAttribute('name');
            const fieldValue = event.target.value;

            const newFormData = { ...editFormData };
            newFormData[fieldName] = fieldValue;
            setEditFormData(newFormData);
        };


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
                            <Fragment key={item._id}>
                                { editEquipmentItem === item._id? 
                                <EditableRow item = {item } editFormData={editFormData} handleEditFormChange={handleEditFormChange} setEditFormData={setEditFormData} setEditEquipmentItem={setEditEquipmentItem} /> : 
                                <ReadOnlyRow item = { item } handleEditClick={handleEditClick}/> }
                            </Fragment>
                        ))}
                        <tr>
                            <th>New Equipment</th>
                            <td><input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" value={equipmentName} onChange={handleChange}/>
                            </td>
                            <td><button onClick={handleFormSubmit}><i className="fa-solid fa-floppy-disk hover:text-green-400"></i></button></td>
                             </tr>
                     </tbody>
                </table>
            </form>
        </div>
        </div>
    )
}
export default AddEquipmentForm