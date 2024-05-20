import { useState } from 'react';
//import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import Auth from '../../utils/auth';
import { ADD_EQUIPMENT } from '../../utils/mutations';
import { QUERY_EQUIPMENT } from '../../utils/queries';


const AddEquipmentForm = () => {
    const [ equipmentName, setEquipmentName ] = useState('');
   // const [ rowCount, setRowCount ] = useState(0);

    const [ addEquipment, { error }] = useMutation(ADD_EQUIPMENT);

    const {loading, data } = useQuery(QUERY_EQUIPMENT);
    
    const items = data?.equipmentItems || [];
    console.log(items)


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
        const { name, value } = event.target;
        if (name === "equipmentNameField"){
            setEquipmentName(value)
        }
        };

    return (
        <div>
            <div className="overflow-x-auto">
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Equipment Name</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>New Equipment</th>
        <td><input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" value={equipmentName} name="equipmentNameField" onChange={handleChange}/>
</td>
        <td><button onClick={handleFormSubmit}><i className="fa-solid fa-floppy-disk"></i></button></td>
      </tr>
    </tbody>
  </table>
</div>
        </div>
    )
}

export default AddEquipmentForm;