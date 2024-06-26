import { Link } from 'react-router-dom';
import { dateToLocale, dateTimeToLocale } from '../../utils/dateTimeTools.js';

function RecentReportCard({ id, name, client, location, inspectionDate, results, generalComments, assignedBy, assignedStaff }) {
    let renderResults = [];

    const parseResults = (results) => {
        for (const equipment of results) {
            if (!!equipment.comment || !equipment.result) {
                const resultObject = {
                    name: equipment.equipmentId.equipmentName,
                    result: equipment.result,
                    comment: equipment.comment
                }
                renderResults.push(resultObject);
            }
        }
    };
    parseResults(results);

    return (
        <div className="card lg:card-side bg-primary shadow-xl m-5">
            <div className="card-body">
                <h2 className="card-title">Room: {name}</h2>
                <p><span className="font-bold">Client: </span>{client}</p>
                <p><span className="font-bold">Location: </span>{location}</p>
                <br></br>
                <p><span className="font-bold">Assigned By: </span>{assignedBy}</p>
                <br></br>
                <p><span className="font-bold">Inspection Date: </span>{dateTimeToLocale(inspectionDate)}</p>
                <p><span className="font-bold">Inspected By: </span>{assignedStaff}</p>
                <br></br>
                <p className="card-title underline">Results Summary:</p>
                {(renderResults.length > 0) ? (
                    renderResults.map((result) => (
                        <div key={result.name} >
                            <p className="font-bold">{result.name}:
                                {!result.result ? <i className="fa-solid fa-triangle-exclamation fa-xl ml-3" style={{ color: "#a46a6a" }}></i>
                                    : <span className="font-light"> (comment)</span>
                                }
                            </p>

                            <p>{result.comment}</p>
                            <br></br>
                        </div>
                    ))
                ) : (
                    <p className="font-bold text-green-500">No failures or comments.</p>
                )}
                <br></br>
                <p className="font-bold">General Comments:</p>
                <p>{generalComments ? generalComments : 'N/A'}</p>
                <br></br>
                <div className="card-actions justify-end">
                    <Link to={`/Inspection/${id}`}>
                        <button className="btn btn-base-100">Update</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default RecentReportCard;