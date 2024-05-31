import Auth from '../utils/auth';
import ManagerNav from '../components/ManagerNav';



const Manager = () => {
    
    // If user is not logged in, redirect to login page
    if (Auth.loggedIn() === false) {
        // Redirect to login page if not logged in
        window.location.href = '/login';
        return null;
    }

    // Assigning the logged in user's role to authenticatedPerson
    const authenticatedPerson = Auth.getProfile().authenticatedPerson.role;

    // If user is not a manager or admin, redirect to homepage. 
    if (authenticatedPerson !== 'manager' && authenticatedPerson !== 'admin') {
        // Redirect to home
        window.location.href = '/';
        return null;
    }

    return (
        <div>
        <ManagerNav></ManagerNav>
        </div>
    );
    }

export default Manager;