import { useState } from "react";
import CreateReport from "../CreateReport";
import OngoingReports from "../OngoingReports";


const ReportTab = () => {

    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

    return (
    <div>
        <nav style={{ display: "flex", width: "100%"}}>
                <button
                    className="btn btn-outline btn-secondary"
                    onClick={() => handleOptionClick("Create Report")}
                    style={{ backgroundColor: selectedOption === "Create Report" ? "darkgray" : "" }}
                >
                    Create Report
                </button>
                <button 
                    className="btn btn-outline btn-secondary"
                    onClick={() => handleOptionClick("See Ongoing")}
                    style={{ backgroundColor: selectedOption === "See Ongoing" ? "darkgray" : "" }}
                >
                    See Ongoing Reports
                </button>
            </nav>
            {selectedOption === "Create Report" && <CreateReport />}
            {selectedOption === "See Ongoing" && <OngoingReports />}
    </div>
            
    );
}






export default ReportTab;