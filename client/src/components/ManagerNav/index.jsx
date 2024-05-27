import { useState } from "react";
import ReportTab from "../ReportTab";
import Maintain from "../Maintain";


const ManagerNav = () => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleTabChange = (event) => {
        setSelectedOption(event.target.getAttribute("aria-label"));
    };

    return (
        <div>
            {selectedOption === null ? (
                <div className="relative">
                    <div role="tablist" className="tabs tabs-bordered tabs-lg relative">
                        <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Reports" onChange={handleTabChange} />
                        <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Maintain" onChange={handleTabChange} />
                    </div>
                    <div>
                        <h2>Welcome To the manager page, please select one of the categories to start</h2>
                    </div>
                </div>
            ) : (
                <div className="relative">
                    <div role="tablist" className="tabs tabs-bordered tabs-lg relative">
                        <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Reports" onChange={handleTabChange} />
                        <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Maintain" onChange={handleTabChange} />
                    </div>
                    {selectedOption === "Reports" && <ReportTab />}
                    {selectedOption === "Maintain" && <Maintain />}
                </div>
            )}
        </div>
    );
}


export default ManagerNav;