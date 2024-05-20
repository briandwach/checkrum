import { useRoomContext } from '../contexts/RoomContext.jsx';

import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_ROOM_EQUIPMENT} from '../utils/queries';

function Inspection() {
    const { objectId, name, client, location, address, cycle } = useRoomContext();

    const { loading, data } = useQuery(QUERY_SINGLE_ROOM_EQUIPMENT, {
        variables: { objectId },
      })

    return (
        <div className="card lg:card-side bg-base-100 bg-slate-300 shadow-xl m-5">
            <div className="card-body">
                <h2 className="card-title">Room: {name}</h2>
                <p><span className="font-bold">Client: </span>{client}</p>
                <p><span className="font-bold">Location: </span>{location}</p>
                <p>{address}</p>
                <p><span className="font-bold">Inspection Cycle: </span>{cycle} minutes</p>

                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Submit</button>
                </div>
            </div>
        </div>
    );
}

export default Inspection;