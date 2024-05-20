import React, { createContext, useContext, useState } from 'react';

const RoomContext = createContext();

export const useRoomContext = () => useContext(RoomContext);

export const RoomProvider = ({ children }) => {
    const [objectId, setObjectId] = useState(null);
    const [name, setName] = useState('');
    const [client, setClient] = useState('');
    const [location, setLocation] = useState('');
    const [address, setAddress] = useState('');
    const [cycle, setCycle] = useState('');

    return (
        <RoomContext.Provider value={{ 
            objectId, setObjectId,
            name, setName,
            client, setClient,
            location, setLocation,
            address, setAddress,
            cycle, setCycle            
            }}>
            {children}
        </RoomContext.Provider>
    );
};