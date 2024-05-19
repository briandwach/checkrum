import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import Auth from '../utils/auth';
import RoomList from '../components/RoomList';

const Rooms = () => {

    return (
        <RoomList />
    )

}

export default Rooms;