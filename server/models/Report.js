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
    type: Date,
    required: true, 
    unique: false
  }
});

const Report = model('Report', reportSchema);

module.exports = Report;
