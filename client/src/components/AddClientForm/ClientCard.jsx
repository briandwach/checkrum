import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_SINGLE_CLIENT } from '../../utils/queries';


const ClientCard = ({clientName}) => {
  const clientNameVal = clientName;
  const [ addLocationButton, setAddLocationButton ] = useState( false );
  const { loading: clientLoading , data: clientData, error: clientError } = useQuery(QUERY_SINGLE_CLIENT, 
    {
      variables: { clientNameVal },
      notifyOnNetworkStatusChange: true
    });
    if (clientLoading){
      return <p>Loading...</p>
    }
    const clientId = clientData?._id || [];
    
  const getClientData = () => {
    console.log(clientId);
  }
  //TO DO
  // Get this location's _id
  // Render each location associated with client as accordian with button to add room under location 

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
{console.log(clientName)}
{console.log(clientData)}
{getClientData()}

</div>
        </>
    )
}

export default ClientCard