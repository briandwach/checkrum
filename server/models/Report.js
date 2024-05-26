const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const reportSchema = new Schema({
  roomId: {
    type: Schema.Types.ObjectId,
    ref: 'Room'
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
  }
});

const Report = model('Report', reportSchema);

module.exports = Report;