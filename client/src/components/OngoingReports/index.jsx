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
                                        <div>
                                                <h2 className="font-bold mb-2">Room: {report.roomId.roomName}</h2>
                                                {report.roomId.dateTimeProperties.inspectionStatus === 'Current' &&
                                                    <>
                                                        <i className="fa-solid fa-clipboard-check fa-xl mr-3" style={{ color: "#63E6BE" }}></i>
                                                        <p className="font-bold inline">Next Due</p>
                                                        <p className="mt-2">{dateToLocale(report.roomId.dateTimeProperties.upcomingDueDate)}</p>
                                                    </>}
                                                {report.roomId.dateTimeProperties.inspectionStatus === 'Due' &&
                                                    <>
                                                        <i className="fa-regular fa-hourglass-half fa-xl mr-3" style={{ color: "#FFD43B" }}></i>
                                                        <p className="font-bold inline">Due in {report.roomId.dateTimeProperties.timeToUpcomingDueDate}</p>
                                                        <p className="mt-2"></p>
                                                        <p>{dateToLocale(report.roomId.dateTimeProperties.upcomingDueDate)}</p>
                                                    </>}
                                                {report.roomId.dateTimeProperties.inspectionStatus === 'Overdue' &&
                                                    <>
                                                        <i class="fa-solid fa-triangle-exclamation fa-xl mr-3" style={{ color: "#a46a6a" }}></i>
                                                        <p className="font-bold inline">OVERDUE</p>
                                                        <p className="mt-2"><span className="font-bold">Since: </span>{dateToLocale(report.roomId.dateTimeProperties.initialMissedDate)}</p>
                                                    </>}
                                            </div>
                                            <div className="mt-auto mb-auto mr-4">
                                                <p className="font-bold">Assigned To:</p>
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