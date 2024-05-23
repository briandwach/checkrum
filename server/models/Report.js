const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const reportSchema = new Schema({
  roomName: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Room'
    }
  ], 
  assignedStaff: [
    {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
  ],
  inspectionDate: {
    default: Number
  }
});

// Array of result model documents

// General comments string

const Report = model('Report', reportSchema);

module.exports = Report;