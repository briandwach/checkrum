const { Schema, model } = require('mongoose');

const locationSchema = new Schema({
  locationName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  }, 
  address: {
    type: String, 
    required: true, 
    unique: false,
    trim: true
  },
  accessInstructions: {
    type: String,
    unique: false,
    trim: true
  },
  client: [
    {
        type: Schema.Types.ObjectId,
        ref: 'Client'
    }
  ]
});

const Location = model('Location', locationSchema);

module.exports = Location;
