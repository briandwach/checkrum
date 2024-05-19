import Auth from '../utils/auth';



const Staff = () => {
    // If user is not logged in, redirect to login page
    if (Auth.loggedIn() == false ) {
        // Redirect to homepage
        window.location.href = '/login';
        return null;
    }
    //assigning the logged in user's role to authenticatedPerson
    const authenticatedPerson = Auth.getProfile().authenticatedPerson.role;
    // If user is not a staff, redirect to homepage
    if (authenticatedPerson !== 'staff' || authenticatedPerson !== 'admin') {
        // Redirect to homepage
        window.location.href = '/';
        return null;
    }

    return (
        <div>
            <h1>Staff Page</h1>
            <p>Under construction</p>
        </div>
    );
}

export default Staff;