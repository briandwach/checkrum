import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import Auth from '../utils/auth';
import AddEquipmentForm from '../components/EquipmentForm';

const Equipment = () => {

    return (
        <AddEquipmentForm />
    )

}

export default Equipment;