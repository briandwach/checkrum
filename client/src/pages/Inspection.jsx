import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_ROOM } from '../utils/queries';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

function Inspection() {
    const { id } = useParams();
    const { loading, data } = useQuery(QUERY_SINGLE_ROOM, {
        variables: { id: id },
    });

    const [successCheckbox, setSuccessCheckbox] = useState({});
    const [errorCheckbox, setErrorCheckbox] = useState({});
    const [viewComment, setViewComment] = useState({});
    const [commentText, setCommentText] = useState({});

    if (loading) {
        return <div>Loading...</div>;
    }

    const { room } = data;
    const { roomName: name, location, inspectionCycleLength: cycle, equipment } = room;
    const { client: { businessName }, locationName, address } = location;

    //State logic to toggle viewing an equipment comment box
    const commentToggle = (equipmentItemId) => {
        setViewComment((prevState) => ({
            ...prevState,
            [equipmentItemId]: !prevState[equipmentItemId]
        }));
    };

    //State logic if comment text is present for an equipment item
    const commentPresent = (e, equipmentItemId) => {
        setCommentText(prevState => ({
            ...prevState,
            [equipmentItemId]: e.target.value
        }))
    };

    return (
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
                                        <input type="checkbox" className="checkbox checkbox-success"
                                            checked={successCheckbox[equipmentItem._id] ? successCheckbox[equipmentItem._id] : false}
                                            onClick={e => e.target.checked && setErrorCheckbox(prevState => ({ ...prevState, [equipmentItem._id]: false }))}
                                            onChange={e => setSuccessCheckbox(prevState => ({ ...prevState, [equipmentItem._id]: e.target.checked }))} />
                                    </label>
                                </div>
                                <div className="form-control" >
                                    <label className="cursor-pointer label">
                                        <input type="checkbox" className="checkbox checkbox-error"
                                            checked={errorCheckbox[equipmentItem._id] ? errorCheckbox[equipmentItem._id] : false}
                                            onClick={e => e.target.checked && setSuccessCheckbox(prevState => ({ ...prevState, [equipmentItem._id]: false }))}
                                            onChange={e => setErrorCheckbox(prevState => ({ ...prevState, [equipmentItem._id]: e.target.checked }))} />
                                    </label>
                                </div>
                                <button onClick={() => commentToggle(equipmentItem._id)}>
                                    {commentText[equipmentItem._id] ? (
                                        <i className={`fa-comment${viewComment[equipmentItem._id] ? '-dots fa-regular' : '-dots fa-solid'} fa-xl`}></i>
                                    ) : (
                                        <i className={`fa-comment${viewComment[equipmentItem._id] ? ' fa-regular' : '-slash fa-solid'} fa-xl`}></i>
                                    )}
                                </button>
                            </div>
                        </div>
                        <textarea
                            placeholder="Add comment here..."
                            value={commentText[equipmentItem._id] ? commentText[equipmentItem._id] : ''}
                            onChange={e => commentPresent(e, equipmentItem._id)}
                            className={`${viewComment[equipmentItem._id] ? '' : 'hidden'} m-1 rounded-md`}>
                        </textarea>
                    </div>
                ))}
                <p className="mt-3 font-bold">General Comments:</p>
                <textarea className=" rounded-md" placeholder="Add comments here..."></textarea>
                <div className="mt-1 card-actions justify-end">
                    <button className="btn btn-primary">Submit</button>
                </div>
            </div>
        </div>
    );
}

export default Inspection;