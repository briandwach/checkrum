import { useQuery } from "@apollo/client";
import { ALL_REPORTS } from "../../utils/queries";



const OngoingReports = () => {

    const { loading, data } = useQuery(ALL_REPORTS);
    console.log(data);


    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    {data.allReports.length > 0 ? (
                        <ul>
                            {data.allReports.map((report) => (
                                <li key={report._id}>
                                    <div className="bg-primary shadow-md rounded-md p-4 mb-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <p className="font-bold">Staff Assigned: </p>
                                            <p>{report.assignedStaff.username}</p>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <p className="font-bold">To Room: </p>
                                            <p>{report.roomId.roomName}</p>
                                        </div>
                                    </div>
                                </li>
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