import { useQuery } from "@apollo/client";
import { IN_PROGRESS_REPORTS } from "../../utils/queries";
import { dateToLocale } from "../../utils/dateTimeTools"

const OngoingReports = () => {

    const { loading, data } = useQuery(IN_PROGRESS_REPORTS);
    console.log(data);


    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    {data.inProgressReports.length > 0 ? (
                        <ul>
                            {data.inProgressReports.map((report) => (
                                <div key={report.roomId._id}>
                                    <div className="card w-96 m-2 bg-primary text-primary-content">
                                        <div className="flex p-3 justify-between">
                                            {report.roomId.dateTimeProperties.inspectionStatus === 'Overdue' ? (
                                                <div>
                                                    <h2 className="font-bold">Room: {report.roomId.roomName}</h2>
                                                    <p className="font-bold text-red-500">OVERDUE</p>
                                                    <p><span className="font-bold">Since: </span>{dateToLocale(report.roomId.dateTimeProperties.initialMissedDate)}</p>
                                                </div>
                                            ) : (<div>
                                                <h2 className="font-bold">Room: {report.roomId.roomName}</h2>
                                                <p><span className="font-bold">Due: </span>{dateToLocale(report.roomId.dateTimeProperties.upcomingDueDate)}</p>
                                                <p>(in {report.roomId.dateTimeProperties.timeToUpcomingDueDate})</p>
                                            </div>
                                            )}
                                            <div className="mt-auto mb-auto mr-4">
                                                <p className="font-bold">Assigned to:</p>
                                                <p>{report.assignedStaff.username}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </ul>
                    ) : (
                        <h1>There are no ongoing reports</h1>
                    )}
                </div>
            )}
        </div>
    );
}



export default OngoingReports;