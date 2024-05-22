import { useState } from "react";
import ReportTab from "../ReportTab";
import Maintain from "../Maintain";

const ManagerNav = () => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

    return (
        <div>
            <nav style={{ display: "flex", width: "100%"}}>
                <button
                    className="btn btn-outline btn-primary"
                    onClick={() => handleOptionClick("Reports")}
                    style={{ backgroundColor: selectedOption === "Reports" ? "darkgray" : "" }}
                >
                    Reports
                </button>
                <button 
                    className="btn btn-outline btn-primary"
                    onClick={() => handleOptionClick("Maintain")}
                    style={{ backgroundColor: selectedOption === "Maintain" ? "darkgray" : "" }}
                >
                    Maintain
                </button>
            </nav>
            {selectedOption === "Reports" && <ReportTab />}
            {selectedOption === "Maintain" && <Maintain />}
        </div>
    );
}

export default ManagerNav;