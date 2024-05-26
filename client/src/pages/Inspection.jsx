import { useParams } from 'react-router-dom';
import { useState } from 'react';

import { useQuery } from '@apollo/client';
import { ROOM_INFO_BY_REPORT_ID } from '../utils/queries';

import { useMutation } from '@apollo/client';
import { ADD_RESULT, SUBMIT_REPORT, DELETE_REPORT_RESULTS } from '../utils/mutations';

function Inspection() {

    // Pulls room objectId from url parameter to use for room data query
    const { id } = useParams();

    // graphQL query to pull data for single room: pulls objectIds for everything above in the data tree
    const { loading, data } = useQuery(ROOM_INFO_BY_REPORT_ID, {
        variables: { id: id },
    });

    // Defines mutations for creating Result documents and submitting Report
    const [addResult, { error }] = useMutation(ADD_RESULT);
    const [submitReport] = useMutation(SUBMIT_REPORT);
    const [deleteReportResults] = useMutation(DELETE_REPORT_RESULTS);

    // Defining state variables for UI and inspection data
    const [successCheckbox, setSuccessCheckbox] = useState({});
    const [errorCheckbox, setErrorCheckbox] = useState({});
    const [viewComment, setViewComment] = useState({});
    const [commentText, setCommentText] = useState({});
    const [generalComments, setGeneralComments] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [messageStyle, setMessageStyle] = useState('mt-1 mb-3 border-2 border-red-500 rounded-md bg-red-200');

    if (loading) {
        return <div>Loading...</div>;
    }

    // Destructure data from QUERY_SINGLE_ROOM
    const { roomInfoByReportId } = data;
    const { roomName: name, location, inspectionCycleLength: cycle, equipment } = roomInfoByReportId.roomId;
    const { client: { businessName }, locationName, address } = location;

    //State logic to toggle viewing an equipment comment box
    const commentToggle = (equipmentItemId) => {
        setViewComment((prevState) => ({
            ...prevState,
            [equipmentItemId]: !prevState[equipmentItemId]
        }));
    };

    // Force comment box to stay open after fail has been selected for equipment item
    const viewCommentForceWithFail = (equipmentItemId) => {
        setSuccessCheckbox(prevState => ({ ...prevState, [equipmentItemId]: false }));
        setViewComment(prevState => ({ ...prevState, [equipmentItemId]: true }));
    };

    //State logic that changes comment icon if comment text is present for an equipment item
    const commentPresent = (e, equipmentItemId) => {
        setCommentText(prevState => ({
            ...prevState,
            [equipmentItemId]: e.target.value
        }))
    };

    //Function to return an array of all properties in an object with the value of true
    function getEquipmentIds(checkboxObj) {
        const trueProperties = [];

        for (const key in checkboxObj) {
            if (checkboxObj[key] === true) {
                trueProperties.push(key);
            }
        }

        return trueProperties;
    }

    // Functions for taking inspection input form user and executing database mutations
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // Below two lines get total of pass and fail checkmarks
        const passResults = Object.values(successCheckbox).reduce((acc, currentValue) => acc + !!currentValue, 0);
        const failResults = Object.values(errorCheckbox).reduce((acc, currentValue) => acc + !!currentValue, 0);

        // Error message on form submission if not all equipment have pass or fail
        if ((passResults + failResults) < equipment.length) {
            setErrorMessage('Missing inspection results for one or more equipment categories.');
            // Exits code block if something is wrong so that the user can correct it
            return;
        }

        // Gets array of Equipment objectId for equipment that is marked as failed
        const failedEquipmentIdsArr = getEquipmentIds(errorCheckbox);

        // Determines the total of failed equipment with out a comment (failed equipment requires a comment)
        let missingComments = 0;
        for (const failedId of failedEquipmentIdsArr) {
            if (!commentText[failedId]) {
                missingComments++
            }
        }

        // Checks if amount of missing comments for failed equipment is above zero then sets error message
        if (missingComments > 0) {
            setErrorMessage('Failed equipment categories require a comment.');
            // Exits code block if something is wrong so that the user can correct it
            return;
        }

        // Deletes previously submitted results for the report on last submission
        try {
            const { data } = await deleteReportResults({
                variables: { reportId: id }
            });
        } catch (e) {
            console.error(e);
        };


        // Creates an array of all Equipment objectIds in the report
        const equipmentIdsArr = [];
        equipment.forEach(obj => {
            equipmentIdsArr.push(obj._id); // Extracting the 'name' property from each object
        });

        // Creates a variable result object to send to graphQL mutation when iterating through result creation
        let resultArr = [];
        for (var equipmentId of equipmentIdsArr) {
            let result = false;
            let comment = '';

            if (successCheckbox[equipmentId]) {
                result = true;
            };

            if (commentText[equipmentId]) {
                comment = commentText[equipmentId];
            };

            resultArr.push({
                reportId: id,
                equipmentId: equipmentId,
                result: result,
                comment: comment
            })
        };

        // Preps to collect array of result document objectIds
        let resultIdsArr = [];

        // Iterates through result objects and calls mutation to create result documents
        for (const result of resultArr) {
            try {
                const { data } = await addResult({
                    variables: { ...result }
                });
                resultIdsArr.push(data.addResult._id);
            } catch (e) {
                console.error(e);
            }
        };


        // Submits report by updating Report document with array of Result documents, generalComments, and inspectionDate
        try {
            const { data } = await submitReport({
                variables: {
                    reportId: id,
                    results: resultIdsArr,
                    generalComments: generalComments,
                    inspectionDate: Date.now()
                }
            });
        } catch (e) {
            console.error(e);
        };



        setMessageStyle('mt-1 mb-3 border-2 border-green-500 rounded-md bg-green-200');
        setErrorMessage('Inspection report successfully submitted. Returning to Assigned Inspections.');

        // Put a settimeout here to clear setErrorMessage
        setTimeout(() => {
            setMessageStyle('mt-1 mb-3 border-2 border-red-500 rounded-md bg-red-200');
            setErrorMessage('');
            window.location.href = '/staff';
        }, 4000);
    };

    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <div className="card lg:card-side bg-base-100 bg-slate-300 shadow-xl m-5">
                    <div className="card-body">
                        <h2 className="card-title">Room: {name}</h2>
                        <p><span className="font-bold">Client: </span>{businessName}</p>
                        <p><span className="font-bold">Location: </span>{locationName}</p>
                        <p>{address}</p>
                        <p><span className="font-bold">Inspection Cycle: </span>{cycle} minutes</p>
                        <br></br>
                        {equipment.map((equipmentItem) => (
                            <div key={equipmentItem._id} className="card card-compact bg-base-100 bg-slate-200 shadow-xl">
                                <div className="p-2 flex justify-between">
                                    <h2 className="card-title">{equipmentItem.equipmentName}</h2>
                                    <div className="flex">
                                        <div className="form-control" >
                                            <label className="cursor-pointer label">
                                                <input
                                                    type="checkbox"
                                                    name="successCheckbox"
                                                    className="checkbox checkbox-success"
                                                    checked={successCheckbox[equipmentItem._id] ? successCheckbox[equipmentItem._id] : false}
                                                    onClick={e => e.target.checked && setErrorCheckbox(prevState => ({ ...prevState, [equipmentItem._id]: false }))}
                                                    onChange={e => setSuccessCheckbox(prevState => ({ ...prevState, [equipmentItem._id]: e.target.checked }))} />
                                            </label>
                                        </div>
                                        <div className="form-control" >
                                            <label className="cursor-pointer label">
                                                <input
                                                    type="checkbox"
                                                    name="errorCheckbox"
                                                    className="checkbox checkbox-error"
                                                    checked={errorCheckbox[equipmentItem._id] ? errorCheckbox[equipmentItem._id] : false}
                                                    onClick={e => e.target.checked && viewCommentForceWithFail(equipmentItem._id)}
                                                    onChange={e => setErrorCheckbox(prevState => ({ ...prevState, [equipmentItem._id]: e.target.checked }))} />
                                            </label>
                                        </div>
                                        {errorCheckbox[equipmentItem._id] ? (
                                            <button type="button" onClick={() => commentToggle(equipmentItem._id)}>
                                                {viewComment[equipmentItem._id] ? (
                                                    <i className={`fa-regular fa-xl fa-comment${commentText[equipmentItem._id] ? '-dots' : ' fa-fade'}`}
                                                        style={{ color: commentText[equipmentItem._id] ? 'black' : 'red' }}>
                                                    </i>
                                                ) : (
                                                    <i className={`fa-xl fa-comment${commentText[equipmentItem._id] ? '-dots fa-solid' : ' fa-fade fa-regular'}`}
                                                        style={{ color: commentText[equipmentItem._id] ? 'black' : 'red' }}>
                                                    </i>
                                                )}
                                            </button>
                                        ) : (
                                            <button type="button" onClick={() => commentToggle(equipmentItem._id)}>
                                                {commentText[equipmentItem._id] ? (
                                                    <i className={`fa-comment${viewComment[equipmentItem._id] ? '-dots fa-regular' : '-dots fa-solid'} fa-xl`}></i>
                                                ) : (
                                                    <i className={`fa-comment${viewComment[equipmentItem._id] ? ' fa-regular' : '-slash fa-solid'} fa-xl`}></i>
                                                )}
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <textarea
                                    placeholder={`${errorCheckbox[equipmentItem._id] ? 'Comment required...' : 'Add comment here...'}`}
                                    name="equipmentComment"
                                    value={commentText[equipmentItem._id] ? commentText[equipmentItem._id] : ''}
                                    onChange={e => commentPresent(e, equipmentItem._id)}
                                    className={`${viewComment[equipmentItem._id] ? '' : 'hidden'} m-1 rounded-md`}>
                                </textarea>
                            </div>
                        ))}
                        <p className="mt-3 font-bold">General Comments:</p>
                        <textarea
                            name="generalComments"
                            value={generalComments}
                            onChange={e => setGeneralComments(e.target.value)}
                            placeholder="Add comments here..."
                            className=" rounded-md">
                        </textarea>
                        {errorMessage && (
                            <div className={messageStyle}>
                                <p className="p-1 font-semibold">{errorMessage}</p>
                            </div>)}
                        <div className="mt-1 card-actions justify-end">
                            <button className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Inspection;