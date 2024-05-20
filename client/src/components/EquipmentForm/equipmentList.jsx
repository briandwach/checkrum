import { useMutation, useQuery } from '@apollo/client';
import mongoose from 'mongoose';
const Equipment = mongoose.model('Equipment', 'equipmentName')
//import { QUERY_EQUIPMENT } from '../../utils/queries';

const EquipmentList = ({ equipment }) => {
    const [getEquipment, { error }] = useQuery(QUERY_EQUIPMENT);

console.log(Equipment)

  if (!equipment.length) {
    return <h3>No Equipment Yet</h3>;
  }

  return (
    <div>
      <div className="flex-row justify-space-between my-4">
        {equipment &&
          equipment.map((item) => (
            <div key={item} className="col-12 col-xl-6">
              <div className="card mb-3">
                <h4 className="card-header bg-dark text-light p-2 m-0 display-flex align-center">
                  <span>{item}</span>
                </h4>
              </div>
            </div>
          ))}
      </div>
      {error && (
        <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
      )}
    </div>
  );
};

export default EquipmentList;
