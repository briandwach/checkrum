const db = require('../config/connection');
const { User, Client, Location, Room, Equipment } = require('../models');
const userSeeds = require('./userSeeds.json');
const clientSeeds = require('./clientSeeds.json');
const locationSeeds = require('./locationSeeds.json');
const roomSeeds = require('./roomSeeds.json');
const equipmentSeeds = require('./equipmentSeeds.json');
const cleanDB = require('./cleanDB');

const equipmentRandomizer = require('./equipmentRandomizer.js');

db.once('open', async () => {
  try {
    await cleanDB('User', 'users');
    await cleanDB('Client', 'clients');
    await cleanDB('Location', 'locations');
    await cleanDB('Room', 'rooms');
    // Equipment collection is named without an "s" by default
    await cleanDB('Equipment', 'equipment');

    await User.create(userSeeds);
    await Equipment.create(equipmentSeeds);
    await Client.create(clientSeeds);

    // Create locations and iteratively updates references to client model
    for (let i = 0; i < locationSeeds.length; i++) {
      const { _id, client } = await Location.create(locationSeeds[i]);
      await Client.findOneAndUpdate(
        { businessName: client },
        {
          $addToSet: {
            locations: _id,
          },
        }
      );
    }

    // Iteratively creates room documents and adds references to equipment and location
    for (let i = 0; i < roomSeeds.length; i++) {
      const { _id, location } = await Room.create(roomSeeds[i]);

      const randomEquipment = equipmentRandomizer();

      for (let q = 0; q < randomEquipment.length; q++) {
        const { equipmentName } = randomEquipment[q];

        const equipmentData = await Equipment.findOne({ equipmentName: equipmentName });
        const equipmentId = equipmentData._id;

        // Update room document with equipment object IDs
        await Room.findOneAndUpdate(
          { _id: _id },
          {
            $addToSet: {
              equipment: equipmentId,
            },
          }
        );

        // Update location model with room object ID
        await Location.findOneAndUpdate(
          { locationName: location },
          {
            $addToSet: {
              rooms: _id,
            },
          }
        );
      }
    }

  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('Database successfully seeded!');
  process.exit(0);
});