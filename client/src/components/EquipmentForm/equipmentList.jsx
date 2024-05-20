import { Link } from 'react-router-dom';

const EquipmentList = ({ items }) => {
 ////   const [getEquipment, { error }] = useQuery(QUERY_EQUIPMENT);

  if (!items.length) {
    return <h3>No Equipment Yet</h3>;
  }

  return (
    <div>
      <div className="flex-row justify-space-between my-4">
        {items &&
          items.map((item) => (
            /*<div key={item} className="col-12 col-xl-6">
              <div className="card mb-3">
                <h4 className="card-header bg-dark text-light p-2 m-0 display-flex align-center">
                  <span>{item.equipmentName}</span>
                </h4>
              </div>
            </div>*/
            <>
            <tr>
            <th></th>
            <td>{item.equipmentName}</td>
            <td><button><i className="fa-solid fa-trash-can"></i></button>
            <button><i className="fa-solid fa-pencil"></i></button>
            </td>
          </tr>
          </>
          ))}
      </div>
    </div>
  );
};

export default EquipmentList;
