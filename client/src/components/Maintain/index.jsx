import { useState } from "react";
import AddClientForm from "../AddClientForm";
import ViewStaff from "../ViewStaff";
import UpdateClientForm from "../UpdateClientForm";
import ManagerEquipment from "../EquipmentForm/index";

const Maintain = () => {

    const [selectedOption, setSelectedOption] = useState(null);

    const handleTabChange = (event) => {
        setSelectedOption(event.target.getAttribute("aria-label"));
    };

    return (
        <div className="relative"> 
            <div role="tablist" className="tabs tabs-bordered tabs-lg relative" style={{paddingBottom: "20px"}}> 
                <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="View Staff" onChange={handleTabChange} />
                <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Edit Client" onChange={handleTabChange} />
                <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Add Client" onChange={handleTabChange} />
                <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Manage Equipment" onChange={handleTabChange} />

            </div>
            {selectedOption === "View Staff" && <ViewStaff />}
            {selectedOption === "Edit Client" && <UpdateClientForm />}
            {selectedOption === "Add Client" && <AddClientForm />}
            {selectedOption === "Manage Equipment" && <ManagerEquipment />}
        </div>
    );
}

export default Maintain;