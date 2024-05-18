import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_CLIENT } from '../../utils/mutations';

import Auth from '../../utils/auth';

const AddClientForm = () => {

    const [ businessName , setBusinessName ] = useState('');
    const [ contactName, setContactName ] = useState('');
    const [ contactEmail, setContactEmail ] = useState('');
    const [ location, setLocations ] = useState([]);

    const [addClient, { addClientError }] = useMutation(ADD_CLIENT);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
          const { data } = await addClient({
            variables: {
              businessName,
              contactName,
              contactEmail,
              location
            },
          });
    
          console.log(data)
        } catch (err) {
          console.error(err);
        }
      };

      return (
        <div>
            <h1>Add a new client</h1>
            <h2> Client Information </h2>
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Business Name</span>
                </div>
                <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            </label>
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Contact Name</span>
                </div>
                <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            </label>
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Contact Email Address</span>
                </div>
                <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            </label>
            <button className="btn btn-outline btn-accent" onClick={handleFormSubmit}>Save new client</button>
        </div>
      )
}

export default AddClientForm