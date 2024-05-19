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
    console.log(authenticatedPerson);
    // If user is not a staff, redirect to homepage
    if (authenticatedPerson !== 'staff' && authenticatedPerson !== 'admin') {
        // Redirect to homepage
        window.location.href = '/';
        return null;
    }

    return (
        <div>
            <h1>Staff Page</h1>
            <p>Under construction</p>

            <div>
                <form>
                    <div>
                        <label htmlFor="file">Upload File:</label>
                        <input type="file" id="file" name="file" />
                    </div>
                    <div>
                        <label htmlFor="description">Description:</label>
                        <textarea id="description" name="description" rows="4" cols="50"></textarea>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Staff;