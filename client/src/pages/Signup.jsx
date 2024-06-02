import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
    role: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="flex flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="card w-96 bg-neutral text-primary-content rounded-box m-4">
          <h4 className="card-header bg-primary text-light p-2">Sign Up</h4>
          <div className="card-body">
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <input
                  className="form-input w-full py-2 px-4 rounded-lg border mb-2 bg-neutral"
                  placeholder="Your username"
                  name="username"
                  type="text"
                  value={formState.name}
                  onChange={handleChange}
                />
                <input
                  className="form-input w-full py-2 px-4 rounded-lg border mb-2 bg-neutral"
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <input
                  className="form-input w-full py-2 px-4 rounded-lg border mb-2 bg-neutral"
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <select
                  className="form-select w-full py-2 px-4 rounded-lg border mb-2 bg-neutral"
                  name="role"
                  value={formState.role}
                  onChange={handleChange}
                >
                  <option value="">Select a role</option>
                  <option value="manager">Manager</option>
                  <option value="staff">Staff</option>
                </select>
                <button
                  className="btn btn-block btn-primary"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  Submit
                </button>
                <div className='flex justify-center mt-2'>
                  <Link to="/login"><a className="link">Already have an account?</a></Link>
                </div>
              </form>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;
