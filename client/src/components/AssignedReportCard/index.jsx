import { Link } from 'react-router-dom';
import { dateToLocale, dateTimeToLocale } from '../../utils/dateTimeTools.js';

function AssignedReportCard({ id, name, client, location, address, cycle, lastInspected, dateTimeProperties, completed }) {
    
    const { upcomingDueDate, timeToUpcomingDueDate, overdueStatus, missedCycles, initialMissedDate } = dateTimeProperties;
   
    return (
        <div className="card bg-secondary shadow-xl m-5">
            <div className="card-body">
                <h2 className="card-title">Room: {name}</h2>
                <p><span className="font-bold">Client: </span>{client}</p>
                <p><span className="font-bold">Location: </span>{location}</p>
                <p>{address}</p>
                <br></br>
                <p><span className="font-bold">Inspection Cycle: </span>{cycle}</p>
                <p><span className="font-bold">Last Inspected: </span>{dateTimeToLocale(lastInspected)}</p>
                <br></br>
                <p className="font-bold">Due For Next Inspection By:</p> 
                <p>{dateToLocale(upcomingDueDate)}</p>
                <p>(in {timeToUpcomingDueDate})</p>
                <br></br>
                <p className={overdueStatus ? "text-red-500" : "text-green-500" }>
                    <span className="font-bold">{overdueStatus ? `Overdue since ${dateToLocale(initialMissedDate)}` : 'Inspections are current'}</span>
                </p>
                {overdueStatus &&
                <p>{`Missed ${missedCycles} inspection cycle(s)`}</p>
                }
                {completed ? (
                <div className="card-actions justify-end">
                    <Link to={`/Inspection/${id}`}>
                        <button className="btn btn-primary">Update</button>
                    </Link>
                </div>
                ) : (
                    <div className="card-actions justify-end">
                        <Link to={`/Inspection/${id}`}>
                            <button className="btn btn-primary">Inspect</button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AssignedReportCard;