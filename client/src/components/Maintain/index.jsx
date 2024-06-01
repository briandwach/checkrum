import { useState } from "react";
import ViewStaff from "../ViewStaff";
import ManagerEquipment from "../EquipmentForm/index";
import EditClient from "../UpdateClientForm";

//entire component is a navigation element that makes radio buttons(that are tabs visually) that change the view of the page based on the selected tab. -dh
const Maintain = () => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleTabChange = (event) => {
        setSelectedOption(event.target.getAttribute("aria-label"));
    };

    return (
        <div className="relative"> 
            <div role="tablist" className="tabs tabs-bordered tabs-lg relative" style={{paddingBottom: "10px"}}> 
                <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="View Staff" onChange={handleTabChange} />
                <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Clients" onChange={handleTabChange} />
                <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Equipment" onChange={handleTabChange} />
            </div>
            {selectedOption === "View Staff" && <ViewStaff />}
            {selectedOption === "Clients" && <EditClient />}
            {selectedOption === "Equipment" && <ManagerEquipment />}
        </div>
    );
}

export default Maintain;