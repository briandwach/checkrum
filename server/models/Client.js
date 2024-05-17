const { Schema, model } = require('mongoose');

const clientSchema = new Schema({
  businessName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  }, 
  contactName: {
    type: String, 
    required: true, 
    unique: false,
    trim: true
  },
  contactEmail: {
    type: String,
    unique: false,
    trim: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  locations: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Location',
    },
  ],
});

const Client = model('Client', clientSchema);

module.exports = Client;
