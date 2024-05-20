import { useState } from 'react';
import { ALL_STAFF } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import { EDIT_USER } from '../../utils/mutations';
import { useMutation } from '@apollo/client';

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
        const { data } = editUser({ variables });
        console.log(data);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>View Staff</h1>
            <div>
                {data.allStaff.map((staff) => (
                    <div key={staff.username} style={{ display: 'flex', alignItems: 'center' }}>
                        <p>{staff.username}</p>
                        <span style={{ marginLeft: '5px' }}>📋</span>
                        <button onClick={() => handleEditUser(staff.username)}>Edit</button>
                    </div>
                ))}
            </div>
            {selectedUser && (
                <div>
                    <h2>Edit User: {selectedUser}</h2>
                    <div>
                        <label htmlFor="role">Role:</label>
                        <select id="role" value={selectedRole} onChange={handleRoleChange}>
                            <option value="staff">Staff</option>
                            <option value="manager">Manager</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <button onClick={handleSubmit}>Submit</button>
                </div>
            )}
        </div>
    );
}

export default ViewStaff;