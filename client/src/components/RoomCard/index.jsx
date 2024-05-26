// import { Link } from 'react-router-dom';
import dateToLocale from '../../utils/dateTimeTools';

function RoomCard({ id, name, client, location, address, cycle, lastInspected }) {
    return (
        <div className="card lg:card-side bg-base-100 bg-slate-300 shadow-xl m-5">
            <div className="card-body">
                <h2 className="card-title">Room: {name}</h2>
                <p><span className="font-bold">Client: </span>{client}</p>
                <p><span className="font-bold">Location: </span>{location}</p>
                <p>{address}</p>
                <br></br>
                <p><span className="font-bold">Inspection Cycle: </span>{cycle} minutes</p>
                <p><span className="font-bold">Last Inspected: </span>{dateToLocale(lastInspected)}</p>
            </div>
        </div>
    );
}

export default RoomCard;