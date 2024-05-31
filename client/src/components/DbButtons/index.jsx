import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { SEED } from '../../utils/mutations';
import { CLEAN_REPORTS_AND_RESULTS } from '../../utils/mutations';

const DbButtons = () => {

};     


export default DbButtons;

//old footer stuff


// const [dbMessage, setDbMessage] = useState('');
// const [seedDatabase] = useMutation(SEED);
// const [cleanReportsAndResults] = useMutation(CLEAN_REPORTS_AND_RESULTS);

// const seedButton = async () => {
//     let result = {};       
//     try {
//         setDbMessage('Awaiting results...');
//         result = await seedDatabase();
//         console.log(result);
//         setDbMessage(result.data.seed);
//     } catch (error) {
//         console.error(error);
//         setDbMessage(result.data.seed);
//     }

//     setTimeout(() => {
//         setDbMessage('');
//     }, 3000);
// };

// const cleanButton = async () => {
//     let result = {};
//     try {
//         setDbMessage('Awaiting results...');
//         result = await cleanReportsAndResults();
//         console.log(result);
//         setDbMessage(result.data.cleanReportsAndResults);
//     } catch (error) {
//         console.error(error);
//         setDbMessage(result.data.cleanReportsAndResults);
//     }

//     setTimeout(() => {
//         setDbMessage('');
//     }, 3000);
// };

// return (
//     <>
//         <div>
//             <button className="btn btn-sm btn-info m-2" onClick={seedButton}>
//                 Reset & Seed DB
//             </button>
//             <button className="btn btn-sm btn-info m-2" onClick={cleanButton}>
//                 Clear Collections
//             </button>
//             {dbMessage && <p className="text-white">{dbMessage}</p>}
//         </div>
//         <div>
//             <button className="btn btn-sm btn-info m-2">
//                 <Link to='/Staff'>Staff Page</Link>
//             </button>
//             <button className="btn btn-sm btn-info m-2">
//                 <Link to='/Manager'>Manager Page</Link>
//             </button>
//             <button className="btn btn-sm btn-info m-2">
//                 <Link to='/Admin'>Data Admin Page</Link>
//             </button>
//             <button className="btn btn-sm btn-info m-2">
//                 <Link to='/Equipment'>Equipment Admin Page</Link>
//             </button>
//             <button className="btn btn-sm btn-info m-2">
//                 <Link to='/Rooms'>All Rooms Page</Link>
//             </button>
//         </div>
//     </>
// );