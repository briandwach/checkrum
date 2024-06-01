import { useState } from "react";
import AddClientForm from "../AddClientForm";
import EditClient from "../UpdateClientForm/EditClient";


const ClientTab = () => {

    const [selectedOption, setSelectedOption] = useState(null);

    const handleTabChange = (event) => {
        setSelectedOption(event.target.getAttribute("aria-label"));
    };

    return (
        <div className="relative"> 
            <div role="tablist" className="tabs tabs-bordered tabs-lg relative" style={{paddingBottom: "20px"}}> 
                <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Edit Clients" onChange={handleTabChange} />
                <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Add Clients" onChange={handleTabChange} />
            </div>
            <div style={{ display: "flex", justifyContent: "center"}}>
            {selectedOption === "Edit Clients" && <EditClient/>}
            {selectedOption === "Add Clients" && <AddClientForm />}
            </div>
        </div>       
    );
}






export default ClientTab;