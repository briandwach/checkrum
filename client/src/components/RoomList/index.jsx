import RoomCard from '../RoomCard';

import { useQuery } from '@apollo/client';
import { QUERY_ALL_ROOMS } from '../../utils/queries';


const RoomList = () => {

const { loading, data } = useQuery(QUERY_ALL_ROOMS);

if (loading) {
    return <div>Loading...</div>;
  }

  return (
      <div>
          <h1 className="ml-3 text-3xl font-bold">All Rooms</h1>
          <div className="">
              {data.allRooms.map((room) => (
                  <RoomCard
                      key={room.roomName}
                      id={room._id}
                      name={room.roomName}
                      client={room.location.client.businessName}
                      location={room.location.locationName}
                      address={room.location.address}
                      cycle={room.inspectionCycleLength}
                      lastInspected={room.lastInspectionDate}
                      overdue={room.overdueInspection}
                  />
              ))}
          </div>
      </div>
  );
}

export default RoomList;