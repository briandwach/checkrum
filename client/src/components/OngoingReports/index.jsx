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
                                <br />
                                Staff Assigned: <p>{report.assignedStaff.username}</p>
                                To Room: <p>{report.roomId.roomName}</p>
                                <br />
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}



export default OngoingReports;