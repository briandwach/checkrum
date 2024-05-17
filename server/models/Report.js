const { Schema, model } = require('mongoose');

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
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
    unique: false
  }
});

const Report = model('Report', reportSchema);

module.exports = Report;