import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { SEED } from '../../utils/mutations';

const SeedButton = () => {
    const [seedMessage, setSeedMessage] = useState('');
    const [seedDatabase] = useMutation(SEED);

    const seedButton = async () => {
        try {
            setSeedMessage('Awaiting results...');
            await seedDatabase();
            setSeedMessage('Database reset and seeded successfully!');
        } catch (error) {
            console.error(error);
            setSeedMessage('Error seeding database. Check console for errors!');
        }

        setTimeout(() => {
            setSeedMessage('');
        }, 3000);
    };

    return (
        <div>
            <button className="btn btn-sm btn-info m-2" onClick={seedButton}>
                Reset & Seed DB
            </button>
            {seedMessage && <p className="text-white">{seedMessage}</p>}
        </div>
    );
};     
  
export default SeedButton;