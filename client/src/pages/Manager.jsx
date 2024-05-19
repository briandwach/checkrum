import Auth from '../utils/auth';
import ManagerNav from '../components/ManagerNav';



const Manager = () => {
    // If user is not logged in, redirect to login page
    if (Auth.loggedIn() === false) {
        // Redirect to login page
        window.location.href = '/login';
        return null;
    }

    // Assigning the logged in user's role to authenticatedPerson
    const authenticatedPerson = Auth.getProfile().authenticatedPerson.role;

    // If user is not a manager or admin, redirect to homepage. 
    if (authenticatedPerson !== 'manager' && authenticatedPerson !== 'admin') {
        // Redirect
        window.location.href = '/';
        return null;
    }

    return (
        <div>
        <h1>Manager Page</h1>
        <ManagerNav></ManagerNav>
        </div>
    );
    }

export default Manager;