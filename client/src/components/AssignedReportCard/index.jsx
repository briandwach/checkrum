import { Link } from 'react-router-dom';
import { dateToLocale, dateTimeToLocale } from '../../utils/dateTimeTools.js';

function AssignedReportCard({ id, name, client, location, address, cycle, lastInspected, dateTimeProperties, completed, assignedBy }) {

    const { upcomingDueDate, timeToUpcomingDueDate, inspectionStatus, missedCycles, initialMissedDate } = dateTimeProperties;

    return (
        <div className="card bg-primary shadow-xl m-5">
            <div className="card-body">
                <h2 className="card-title">Room: {name}</h2>
                <p><span className="font-bold">Client: </span>{client}</p>
                <p><span className="font-bold">Location: </span>{location}</p>
                <p>{address}</p>
                <br></br>
                <p><span className="font-bold">Inspection Cycle: </span>{cycle}</p>
                <p><span className="font-bold">Assigned By: </span>{assignedBy}</p>
                <br></br>
                <p><span className="font-bold">Last Inspected: </span>{dateTimeToLocale(lastInspected)}</p>                
                <br></br>
                {inspectionStatus === 'Current' &&
                    <>
                        <p className="font-bold">Next Inspection:</p>
                        <p>{dateToLocale(upcomingDueDate)}</p>
                        <p>(in {timeToUpcomingDueDate})</p>
                    </>}
                {inspectionStatus === 'Due' &&
                    <>
                        <p className="font-bold">Inspection Due in {timeToUpcomingDueDate}</p>
                        <p>{dateToLocale(upcomingDueDate)}</p>
                        <p></p>
                    </>}
                <br></br>
                {inspectionStatus === 'Current' && <i className="fa-solid fa-clipboard-check fa-2xl" style={{ color: "#63E6BE" }}></i>}
                {inspectionStatus === 'Due' && <i className="fa-regular fa-hourglass-half fa-2xl" style={{ color: "#FFD43B" }}></i>}
                {inspectionStatus === 'Overdue' &&
                    <>
                        <p className="font-bold">Overdue since {dateToLocale(initialMissedDate)} :</p>
                        <p>{`Missed ${missedCycles} inspection cycle(s)`}</p>
                        <br></br>
                        <i className="fa-solid fa-triangle-exclamation fa-2xl" style={{ color: "#a46a6a" }}></i>
                    </>}
                {completed ? (
                    <div className="card-actions justify-end">
                        <Link to={`/Inspection/${id}`}>
                            <button className="btn btn-primary">Update</button>
                        </Link>
                    </div>
                ) : (
                    <div className="card-actions justify-end">
                        <Link to={`/Inspection/${id}`}>
                            <button className="btn btn-base-100">Inspect</button>
                        </Link>
                    </div>
                )}
            </div>
        </div >
    );
}

export default AssignedReportCard;