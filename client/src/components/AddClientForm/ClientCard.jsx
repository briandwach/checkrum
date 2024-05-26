import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_SINGLE_CLIENT } from '../../utils/queries';
import { set } from "react-hook-form";


const ClientCard = ({clientIdData}) => {

  //Setting client ID just submitted and querying client data based on ID
  const [clientIdVal, setClientIdVal] = useState();
  const clientCardId = localStorage.getItem("clientId");
  const { loading, data, error } = useQuery(QUERY_SINGLE_CLIENT, 
    {
      variables: { id: clientCardId }, 
    });
    if (loading){
      return <p>Loading...</p>
    }

    console.log(data);

    const handleClientIdData = (val) => {
      setClientIdVal(val)
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
    <h2 className="card-title"> {data.getClient.businessName}</h2>
    <p>{data.getClient.contactName}</p>
    <p>{data.getClient.contactEmail}</p>
    <p>Locations</p>
    <div className="card-actions justify-end">
    </div>
  </div>
{console.log(clientIdData)}
</div>
        </>
    )
}

export default ClientCard