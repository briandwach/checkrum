import { ALL_STAFF } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import { EDIT_USER } from '../../utils/mutations';
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';

const ViewStaff = () => {
    const { loading, data, refetch } = useQuery(ALL_STAFF);

    const [editUser] = useMutation(EDIT_USER);

    const handleSubmit = async (username, role) => {
        await editUser({
            variables: {
                username: username,
                role: role
            }
        });
        refetch(); // Rerun the ALL_STAFF query to fetch updated data. Also makes DOM re-render
    }

    const userRole = Auth.getProfile().authenticatedPerson.role;

//below is mainly a daisy ui component that is a collapsible list of staff members. If the user is an admin, they can change the role of the staff member. -dh
    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {data.allStaff.map((user) => (
                        <div
                            key={user.id}
                            tabIndex={0}
                            className="collapse border border-base-300 bg-base-200"
                        >
                            <input type="checkbox" /> 
                            <div className="collapse-title text-xl font-medium">
                                {user.username}
                            </div>
                            <div className="collapse-content">
                                <p>
                                    {/* roles get capitalized because we store them as lowercase in the database. -dh */}
                                    Role: {user.role.charAt(0).toUpperCase() + user.role.slice(1)} Email: {user.email}
                                </p>
                                {userRole === 'admin' && (
                                    <div>
                                        Change Role to:  
                                        <button
                                            className='btn-sm bg-primary m-2'
                                            onClick={() => handleSubmit(user.username, 'staff')}
                                        >
                                            Staff
                                        </button>
                                        <button
                                            className='btn-sm bg-primary m-2'
                                            onClick={() => handleSubmit(user.username, 'manager')}
                                        >
                                            Manager
                                        </button>
                                        <button
                                            className='btn-sm bg-primary m-2'
                                            onClick={() => handleSubmit(user.username, 'admin')}
                                        >
                                            Admin
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
}

export default ViewStaff;
