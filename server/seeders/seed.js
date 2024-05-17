const db = require('../config/connection');
const { User, Client, Location, Room, Equipment } = require('../models');
const userSeeds = require('./userSeeds.json');
const clientSeeds = require('./clientSeeds.json');
const locationSeeds = require('./locationSeeds.json');
const roomSeeds = require('./roomSeeds.json');
const equipmentSeeds = require('./equipmentSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    await cleanDB('User', 'users');
    await cleanDB('Client', 'clients');
    await cleanDB('Location', 'locations');
    await cleanDB('Room', 'rooms');
    await cleanDB('Equipment', 'equipments');
    
    await User.create(userSeeds);
    await Equipment.create(equipmentSeeds);
    await Client.create(clientSeeds);

    // Create locations and iteratively update references to client model
    for (let i = 0; i < locationSeeds.length; i++) {
      const { _id, client } = await Location.create(locationSeeds[i]);
      const clientAddLocation = await Client.findOneAndUpdate(
        { businessName: client },
        {
          $addToSet: {
            locations: _id,
          },
        }
      );
    }

     // Create rooms and iteratively update references to location model
     for (let i = 0; i < roomSeeds.length; i++) {
      const { _id, location } = await Room.create(roomSeeds[i]);
      const locationAddRoom = await Location.findOneAndUpdate(
        { locationName: location },
        {
          $addToSet: {
            rooms: _id,
          },
        }
      );
    }

  } catch (err) {
    console.error(err);
    process.exit(1);
  }  

  console.log('all done!');
  process.exit(0);
});
