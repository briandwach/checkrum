import { useState } from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

const AddLocationForm = () => {

    const [ locationName, setLocationName ] = useState('');
    const [ address, setLocationAddress ] = useState('');
    const [ accessInstructions, setAccessInstructions ] = useState('');

    return (
        <div>
        <h2> Location Information</h2>
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Locations</span>
                </div>
                <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            </label>
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Location Address</span>
                </div>
                <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            </label>
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Access Instructions</span>
                </div>
                <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            </label>
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Room Name</span>
                </div>
                <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            </label>

        </div>
    )

}

export default AddLocationForm;