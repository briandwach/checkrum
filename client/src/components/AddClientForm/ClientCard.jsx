import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_SINGLE_CLIENT } from '../../utils/queries';


const ClientCard = ({clientName}) => {
  const clientNameVal = clientName;
  //const [ addLocationButton, setAddLocationButton ] = useState( false );
  const { loading, data, error } = useQuery(QUERY_SINGLE_CLIENT, 
    {
      variables: {businessName: "Legal For You"}, 
      fetchPolicy: "network-only"
    });
    if (loading){
      return <p>Loading...</p>
    }
    const clientId = data?._id || [];
    
  const getClientData = () => {
    console.log(clientId);
  }

  /* const handleAddLocation = async (event) => {
    event.preventDefault();
    setAddLocationButton( true );
  } */ 
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
    </div>
  </div>
  <div className="collapse collapse-plus">
  <input type="radio" name="my-accordion-3" defaultChecked /> 
  <div className="collapse-title text-xl font-medium">
    Click to open this one and close others
  </div>
  <div className="collapse-content"> 
    <p>hello</p>
  </div>
</div>
<div className="collapse collapse-plus">
  <input type="radio" name="my-accordion-3" /> 
  <div className="collapse-title text-xl font-medium">
    Click to open this one and close others
  </div>
  <div className="collapse-content"> 
    <p>hello</p>
  </div>
</div>
<div className="collapse collapse-plus">
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
{console.log(data)}
{getClientData()}
</div>
        </>
    )
}

export default ClientCard