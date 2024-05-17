const db = require('../config/connection');
const { User, Client, Location, Room, Report, Equipment } = require('../models');
const userSeeds = require('./userSeeds.json');
const clientSeeds = require('./clientSeeds.json');
const locationSeeds = require('./locationSeeds.json');
const roomSeeds = require('./roomSeeds.json');
const reportSeeds = require('./reportSeeds.json');
const equipmentSeeds = require('./equipmentSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    await cleanDB('User', 'users');
    await cleanDB('Client', 'clients');
    await cleanDB('Location', 'locations');
    await cleanDB('Room', 'rooms');
    await cleanDB('Report', 'reports');
    await cleanDB('Equipment', 'equipments');
    
    await User.create(userSeeds);

    for (let i = 0; i < thoughtSeeds.length; i++) {
      const { _id, thoughtAuthor } = await Thought.create(thoughtSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: thoughtAuthor },
        {
          $addToSet: {
            thoughts: _id,
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
