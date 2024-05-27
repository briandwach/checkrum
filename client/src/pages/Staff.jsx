import Auth from '../utils/auth';
import AssignedReports from '../components/StaffDashboard/AssignedReports.jsx';
import CompletedReports from '../components/StaffDashboard/CompletedReports.jsx';

import { useState } from "react";

const Staff = () => {
    // If user is not logged in, redirect to login page
    if (Auth.loggedIn() == false) {
        // Redirect to homepage
        window.location.href = '/login';
        return null;
    }
    //assigning the logged in user's role to authenticatedPerson
    const userProfile = Auth.getProfile();
    const authenticatedPerson = userProfile.authenticatedPerson.role;
    const assignedStaff = userProfile.authenticatedPerson._id;
    //console.log(userProfile);
    // If user is not a staff, redirect to homepage
    if (authenticatedPerson !== 'staff' && authenticatedPerson !== 'admin') {
        // Redirect to homepage
        window.location.href = '/';
        return null;
    }

    const [selectedOption, setSelectedOption] = useState("Assigned");

    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
console.log("User's timezone: ", userTimeZone);

    const handleTabChange = (event) => {
        setSelectedOption(event.target.getAttribute("aria-label"));
    };

    return (
        <div className="relative"> 
            <div role="tablist" className="tabs tabs-bordered tabs-lg relative"> 
                <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Assigned Reports" onChange={handleTabChange} />
                <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Completed Reports" onChange={handleTabChange} />
            </div>
            <br></br>
            {selectedOption === "Assigned Reports" && <AssignedReports assignedStaff={assignedStaff} />}
            {selectedOption === "Completed Reports" && <CompletedReports assignedStaff={assignedStaff} />}
        </div>

        // <div>
        //     <h1>Staff Page</h1>
        //     <p>Under construction</p>

        //     <div>
        //         <form>
        //             <div>
        //                 <label htmlFor="file">Upload File:</label>
        //                 <input type="file" id="file" name="file" />
        //             </div>
        //             <div>
        //                 <label htmlFor="description">Description:</label>
        //                 <textarea id="description" name="description" rows="4" cols="50"></textarea>
        //             </div>
        //             <button type="submit">Submit</button>
        //         </form>
        //     </div>
        // </div>
    );
}

export default Staff;