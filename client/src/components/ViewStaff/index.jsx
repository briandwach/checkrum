import { ALL_STAFF } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import { EDIT_USER } from '../../utils/mutations';
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';

const ViewStaff = () => {
    const { loading, data, refetch } = useQuery(ALL_STAFF);
    console.log(data);

    const [editUser] = useMutation(EDIT_USER);

    const handleSubmit = async (username, role) => {
        console.log(username, role);
        await editUser({
            variables: {
                username: username,
                role: role
            }
        });
        refetch(); // Rerun the ALL_STAFF query to fetch updated data. Also makes DOM re-render
    }

    const userRole = Auth.getProfile().authenticatedPerson.role;

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
                                {user.username} - Click to view details
                            </div>
                            <div className="collapse-content">
                                <p>
                                    Role: {user.role.charAt(0).toUpperCase() + user.role.slice(1)} 
                                    <br />
                                    
                                    Email: {user.email}
                                    
                                    <br />
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
