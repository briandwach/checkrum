import { useRoomContext } from '../contexts/RoomContext.jsx';

import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_ROOM_EQUIPMENT } from '../utils/queries';

function Inspection() {
    const { objectId, name, client, location, address, cycle } = useRoomContext();

    const { loading, data } = useQuery(QUERY_SINGLE_ROOM_EQUIPMENT, {
        variables: { id: objectId },
    })

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="card lg:card-side bg-base-100 bg-slate-300 shadow-xl m-5">
            <div className="card-body">
                <h2 className="card-title">Room: {name}</h2>
                <p><span className="font-bold">Client: </span>{client}</p>
                <p><span className="font-bold">Location: </span>{location}</p>
                <p>{address}</p>
                <p><span className="font-bold">Inspection Cycle: </span>{cycle} minutes</p>
                <br></br>
                {data.roomEquipment.equipment.map((equipment) => (
                    <div className="card card-compact bg-base-100 bg-slate-200 shadow-xl">
                        <div className="p-2 flex justify-between">
                            <h2 className="card-title">{equipment.equipmentName}</h2>

                            <div className="flex">
                                <div className="form-control">
                                    <label className="cursor-pointer label">
                                        <input type="checkbox" className="checkbox checkbox-success" />
                                    </label>
                                </div>

                                <div className="form-control">
                                    <label className="cursor-pointer label">
                                        <input type="checkbox" className="checkbox checkbox-error" />
                                    </label>
                                </div>
                            </div>

                        </div>
                    </div>
                ))}
                <br></br>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Submit</button>
                </div>
            </div>
        </div>
    );
}

export default Inspection;