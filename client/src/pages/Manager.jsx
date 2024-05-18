import Auth from '../utils/auth';


const Manager = () => {
    // If user is not logged in, redirect to login page
    if (Auth.loggedIn() == false ) {
        // Redirect to homepage
        window.location.href = '/login';
        return null;
    }
    //assigning the logged in user's role to authenticatedPerson
    const authenticatedPerson = Auth.getProfile().authenticatedPerson.role;
    // If user is not a manager, redirect to homepage
    if (authenticatedPerson !== 'manager') {
        // Redirect to homepage
        window.location.href = '/';
        return null;
    }

    return (
        <div>
        <h1>Manager Page</h1>
        </div>
    );
    }

export default Manager;