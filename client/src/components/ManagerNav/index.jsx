import { useState } from "react";
import ReportTab from "../ReportTab";
import Maintain from "../Maintain";


//entire component is a navigation element that makes radio buttons(that are tabs visually) that change the view of the page based on the selected tab. -dh
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
                        <h1 className="m-3 text-3xl font-bold text-center">Welcome, click one of the tabs to get started</h1>
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