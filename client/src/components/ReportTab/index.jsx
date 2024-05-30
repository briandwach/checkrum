import { useState } from "react";
import CreateReport from "../CreateReport";
import OngoingReports from "../OngoingReports";
import CompletedReports from "../CompletedReports";


const ReportTab = () => {

    const [selectedOption, setSelectedOption] = useState(null);

    const handleTabChange = (event) => {
        setSelectedOption(event.target.getAttribute("aria-label"));
    };

    return (
        <div className="relative"> 
            <div role="tablist" className="tabs tabs-bordered tabs-lg relative" style={{paddingBottom: "20px"}}> 
                <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Assign" onChange={handleTabChange} />
                <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="In Progress" onChange={handleTabChange} />
                <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Completed" onChange={handleTabChange} />
            </div>
            <div style={{ display: "flex", justifyContent: "center"}}>
            {selectedOption === "Assign" && <CreateReport />}
            {selectedOption === "In Progress" && <OngoingReports />}
            {selectedOption === "Completed" && <CompletedReports />}
            </div>
        </div>       
    );
}






export default ReportTab;