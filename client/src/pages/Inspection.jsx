import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_ROOM } from '../utils/queries';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

function Inspection() {
    const { id } = useParams();
    const { loading, data } = useQuery(QUERY_SINGLE_ROOM, {
        variables: { id: id },
    });

    const [viewComment, setViewComment] = useState({});

    if (loading) {
        return <div>Loading...</div>;
    } 

    const { room } = data;
    const { roomName: name, location, inspectionCycleLength: cycle, equipment } = room;
    const { client: { businessName }, locationName, address } = location;

    const initialViewCommentState = equipment.reduce((acc, equipmentItem) => {
        return { ...acc, [equipmentItem._id]: '-slash' };
    }, {});

    const commentToggle = (equipmentItemId) => {
        setViewComment((prevState) => ({
            ...prevState,
            [equipmentItemId]: !prevState[equipmentItemId]
        }));
    };

    // Toggles checkboxes so only pass or fail can be checked at a time
    const resultToggle = (e) => {
        const clickedCheckbox = e.target;

        if (clickedCheckbox.classList.contains('checkbox-success')) {
            const otherCheckbox = clickedCheckbox.parentElement.parentElement.nextElementSibling.querySelector('.checkbox-error');
            otherCheckbox.checked = false;
        } else if (clickedCheckbox.classList.contains('checkbox-error')) {
            const otherCheckbox = clickedCheckbox.parentElement.parentElement.previousElementSibling.querySelector('.checkbox-success');
            otherCheckbox.checked = false;
        }
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
                                        <input type="checkbox" className="checkbox checkbox-success" onClick={resultToggle} />
                                    </label>
                                </div>
                                <div className="form-control" >
                                    <label className="cursor-pointer label">
                                        <input type="checkbox" className="checkbox checkbox-error" onClick={resultToggle} />
                                    </label>
                                </div>
                                <button onClick={() => commentToggle(equipmentItem._id)}>
                                    <i className={`fa-comment${viewComment[equipmentItem._id] ? ' fa-regular' : '-slash fa-solid'} fa-xl`}></i>
                                </button>
                            </div>
                        </div>
                        <textarea className={`${viewComment[equipmentItem._id] ? '' : 'hidden'} m-1 rounded-md`}></textarea>
                    </div>
                ))}
                <br></br>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Submit</button>
                </div>
            </div>
        </div>
    );
}

export default Inspection;