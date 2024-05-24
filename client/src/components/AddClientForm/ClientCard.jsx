import React from "react";

const ClientCard = () => {

    return (
        <>
        <div className="card w-11/12 bg-primary text-primary-content">
  <div className="card-body">
    <h2 className="card-title"> [Client Name Here]</h2>
    <p>[Client Contact]</p>
    <p>[Client Email Address]</p>
    <p>Locations</p>
    <div className="card-actions justify-end">
      <button type="button" className="btn">Add a Location</button>
    </div>
  </div>
</div>
        </>
    )
}

export default ClientCard