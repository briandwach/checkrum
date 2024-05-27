import { useState } from 'react';
import { ALL_STAFF } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import { EDIT_USER } from '../../utils/mutations';
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';

const ViewStaff = () => {
    const [selectedUser, setSelectedUser] = useState('');
    const [selectedRole, setSelectedRole] = useState('');

    const { loading, data } = useQuery(ALL_STAFF);
    console.log(data);


    const handleEditUser = (username) => {
        setSelectedUser(username);
    };

    const handleRoleChange = (event) => {
        setSelectedRole(event.target.value);
    };

    const [editUser] = useMutation(EDIT_USER);

    const handleSubmit = () => {
        console.log(selectedUser, selectedRole);
        const variables = { username: selectedUser, role: selectedRole };
        console.log('variables', variables);
        const { data } = editUser({ variables });
    };


    const userRole = Auth.getProfile().authenticatedPerson.role;

        return (
            <div>
                {loading ? (
                <p>Loading...</p>
            ) : (
            <div>
                <select value={selectedUser} onChange={(e) => handleEditUser(e.target.value)}>
                    <option value="">Select User</option>
                    {data.allStaff.map((user) => (
                        <option key={user.username} value={user.username}>
                            {user.username} - {user.role}
                        </option>
                    ))}
                </select>
                {selectedUser !== '' && (
                    <div>
                        <select value={selectedRole} onChange={handleRoleChange}>
                            <option value="">Select Role</option>
                            <option value="staff">Staff</option>
                            <option value="manager">Manager</option>
                            <option value="admin">Admin</option>
                        </select>
                        <button onClick={handleSubmit}>Submit</button>
                    </div>
                )}
            </div>
        )}
    </div>
        );
}

export default ViewStaff;