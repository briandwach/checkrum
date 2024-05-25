import React from "react";
import { useMutation, useQuery } from "@apollo/client";



const ClientCard = () => {
  const [ addLocationButton, setAddLocationButton ] = useState( false );

  //TO DO
  // Get this location's _id
  // Render each location associated with client as  

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
  <div className="collapse collapse-plus bg-base-200">
  <input type="radio" name="my-accordion-3" defaultChecked /> 
  <div className="collapse-title text-xl font-medium">
    Click to open this one and close others
  </div>
  <div className="collapse-content"> 
    <p>hello</p>
  </div>
</div>
<div className="collapse collapse-plus bg-base-200">
  <input type="radio" name="my-accordion-3" /> 
  <div className="collapse-title text-xl font-medium">
    Click to open this one and close others
  </div>
  <div className="collapse-content"> 
    <p>hello</p>
  </div>
</div>
<div className="collapse collapse-plus bg-base-200">
  <input type="radio" name="my-accordion-3" /> 
  <div className="collapse-title text-xl font-medium">
    Click to open this one and close others
  </div>
  <div className="collapse-content"> 
    <p>hello</p>
  </div>
</div>
# Using Accordion and Join together

</div>
        </>
    )
}

export default ClientCard