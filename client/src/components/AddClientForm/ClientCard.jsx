import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_SINGLE_CLIENT } from '../../utils/queries';


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

    //Updates clientIdData state
    const handleClientIdData = (val) => {
      setClientIdVal(val)
    }

    return (
        <>
        <div className="flex card bg-primary text-primary-content m-4">
          <div className="card-body">
            <h2 className="card-title text-2xl"> {data.getClient.businessName}</h2>
            <p><b> Contact Name: </b>{data.getClient.contactName}</p>
            <p><b> Contact Email: </b>{data.getClient.contactEmail}</p>
            <div className="card-actions justify-end">
            </div>
          </div>
        </div>
        </>
    )
}

export default ClientCard