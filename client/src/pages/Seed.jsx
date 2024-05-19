import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { SEED } from '../utils/mutations';

const Seed = () => {
    const [successMessage, setSuccessMessage] = useState('');
    const [seedDatabase] = useMutation(SEED);

    const seedButton = async () => {
        try {
            await seedDatabase();
            setSuccessMessage('Database reset and seeded successfully!');
        } catch (error) {
            console.error(error);
            setSuccessMessage('Error seeding database. Check console for errors!');
        }
    };

    return (
        <div>
            <button className="btn btn-outline btn-accent" onClick={seedButton}>
                Reset and Seed Database
            </button>
            {successMessage && <p>{successMessage}</p>}
            <Link to="/">Return to homepage</Link>
        </div>
    );
};

export default Seed;