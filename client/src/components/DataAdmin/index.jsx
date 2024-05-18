import { useState } from 'react';
import { Link } from 'react-router-dom';

const DataAdmin = ({ clientId }) => {
    const [ businessName , setBusinessName ] = useState('');
    const [ contactName, setContactName ] = useState('');
    const [ contactEmail, setContactEmail ] = useState('');
    const [ locations, setLocations ] = useState([]);

    return (
        <>
            <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">What is your name?</span>
    <span className="label-text-alt">Top Right label</span>
  </div>
  <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
  <div className="label">
    <span className="label-text-alt">Bottom Left label</span>
    <span className="label-text-alt">Bottom Right label</span>
  </div>
</label>
        </>
    )
}