const { Schema, model } = require('mongoose');

const reportSchema = new Schema({
  roomId: {
    type: Schema.Types.ObjectId,
    ref: 'Room'
  },
  assignedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  assignedStaff:
  {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  results: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Result',
    },
  ],
  generalComments: {
    type: String,
    unique: false,
    trim: true
  },
  inspectionDate: {
    type: Date
  },
  lastUpdated: {
    type: Date
  },
  lastUpdatedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Report = model('Report', reportSchema);

module.exports = Report;