import { useQuery } from "@apollo/client";
import { ALL_REPORTS } from "../../utils/queries";



const OngoingReports = () => {

    const { loading, data } = useQuery(ALL_REPORTS);
    console.log(data);


    return (
        <div>
            <h1>Ongoing Reports</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <ul>
                        {data.allReports.map((report) => (
                            <li key={report._id}>
                                <div className="bg-white shadow-md rounded-md p-4 mb-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <p className="font-bold">Staff Assigned:</p>
                                        <p>{report.assignedStaff.username}</p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="font-bold">To Room:</p>
                                        <p>{report.roomId.roomName}</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}



export default OngoingReports;