import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SEED } from '../../utils/mutations';
import { CLEAN_REPORTS_AND_RESULTS } from '../../utils/mutations';

const DbButtons = () => {
    const [dbMessage, setDbMessage] = useState('');
const [seedDatabase] = useMutation(SEED);
const [cleanReportsAndResults] = useMutation(CLEAN_REPORTS_AND_RESULTS);

const seedButton = async () => {
    let result = {};       
    try {
        setDbMessage('Awaiting results...');
        result = await seedDatabase();
        setDbMessage(result.data.seed);
    } catch (error) {
        console.error(error);
        setDbMessage(result.data.seed);
    }

    setTimeout(() => {
        setDbMessage('');
    }, 3000);
};

const cleanButton = async () => {
    let result = {};
    try {
        setDbMessage('Awaiting results...');
        result = await cleanReportsAndResults();
        setDbMessage(result.data.cleanReportsAndResults);
    } catch (error) {
        console.error(error);
        setDbMessage(result.data.cleanReportsAndResults);
    }

    setTimeout(() => {
        setDbMessage('');
    }, 3000);
};

  

    return (
        <div>
        <button className="btn btn-sm btn-info m-2" onClick={seedButton}>
            Reset & Seed DB
        </button>
        <button className="btn btn-sm btn-info m-2" onClick={cleanButton}>
            Clear Collections
        </button>
        {dbMessage && <p className="text-white">{dbMessage}</p>}
    </div>

    );
};



export default DbButtons;
