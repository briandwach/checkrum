import { Link } from 'react-router-dom';

import { useMutation} from '@apollo/client'

import { REMOVE_EQUIPMENT } from '../../utils/mutations';

const EquipmentList = ({ items }) => {
 ////   const [getEquipment, { error }] = useQuery(QUERY_EQUIPMENT);

const [removeEquipment, { error }] = useMutation(REMOVE_EQUIPMENT)

const handleRemoveEquipment = async (equipmentId) => {
  try {
    const { data } = await removeEquipment({
      variables: { equipmentId},
    });
    console.log('Item deleted')
  } catch (err) {
    console.error(err);
  }
};

 /* if (!items.length) {
    return 'No Equipment Yet';
  }*/

  return (
    <>
        {items &&
          items.map((item) => (
            <>
            <tr>
            <th></th>
            <td>{item.equipmentName}</td>
            <td><button><i className="fa-solid fa-trash-can" key={item._id} onClick={() => handleRemoveEquipment(item._id)}></i></button>
            <button><i className="fa-solid fa-pencil"></i></button>
            </td>
          </tr>
          </>
          ))}
          </>
  );
};

export default EquipmentList;
