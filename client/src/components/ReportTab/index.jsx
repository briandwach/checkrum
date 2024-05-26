import { useState } from "react";
import CreateReport from "../CreateReport";
import OngoingReports from "../OngoingReports";


const ReportTab = () => {

    const [selectedOption, setSelectedOption] = useState(null);

    const handleTabChange = (event) => {
        setSelectedOption(event.target.getAttribute("aria-label"));
    };

    return (
        <div className="relative"> 
            <div role="tablist" className="tabs tabs-bordered tabs-lg relative"> 
                <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Create Report" onChange={handleTabChange} />
                <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="See Ongoing" onChange={handleTabChange} />
            </div>
            {selectedOption === "Create Report" && <CreateReport />}
            {selectedOption === "See Ongoing" && <OngoingReports />}
        </div>       
    );
}






export default ReportTab;