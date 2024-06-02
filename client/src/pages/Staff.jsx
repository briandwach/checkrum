import Auth from '../utils/auth';
import AssignedReports from '../components/StaffDashboard/AssignedReports.jsx';
import CompletedReports from '../components/StaffDashboard/RecentReports.jsx';

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
    // If user is not a staff, redirect to homepage
    if (authenticatedPerson !== 'staff' && authenticatedPerson !== 'admin') {
        // Redirect to homepage
        window.location.href = '/';
        return null;
    }

    const [selectedOption, setSelectedOption] = useState("Assigned Reports");

    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const handleTabChange = (event) => {
        setSelectedOption(event.target.getAttribute("aria-label"));
    };

    return (
        // tab navigation. Only one tab can be active at a time(technically they are radio buttons). Whatever tab is selected it renders the component. -dh
        <div className="relative">
            <div role="tablist" className="tabs tabs-bordered tabs-lg relative">
                <input type="radio" defaultChecked name="my_tabs_1" role="tab" className="tab" aria-label="Assigned Reports" onChange={handleTabChange} />
                <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Recent Reports" onChange={handleTabChange} />
            </div>
            <br></br>
            {selectedOption === "Assigned Reports" && <AssignedReports assignedStaff={assignedStaff} />}
            {selectedOption === "Recent Reports" && <CompletedReports assignedStaff={assignedStaff} />}
        </div>
    );
}

export default Staff;