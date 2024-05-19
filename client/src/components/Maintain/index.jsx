import { useState } from "react";
import AddClientForm from "../AddClientForm";
import ViewStaff from "../ViewStaff";
import UpdateClientForm from "../UpdateClientForm";

const Maintain = () => {

    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

    return (
        <div>
        <nav style={{ display: "flex", width: "100%"}}>
                <button
                    className="btn btn-outline btn-secondary"
                    onClick={() => handleOptionClick("View Staff")}
                    style={{ backgroundColor: selectedOption === "View Staff" ? "darkgray" : "" }}
                >
                    View Staff
                </button>
                <button 
                    className="btn btn-outline btn-secondary"
                    onClick={() => handleOptionClick("Add Client")}
                    style={{ backgroundColor: selectedOption === "Add Client" ? "darkgray" : "" }}
                >
                    Add Client
                </button>
                <button 
                    className="btn btn-outline btn-secondary"
                    onClick={() => handleOptionClick("Edit Client")}
                    style={{ backgroundColor: selectedOption === "Edit Client" ? "darkgray" : "" }}
                >
                    Edit Client
                </button>
            </nav>
            {selectedOption === "View Staff" && <ViewStaff />}
            {selectedOption === "Edit Client" && <UpdateClientForm />}
            {selectedOption === "Add Client" && <AddClientForm />}
    </div>
    );
}

export default Maintain;