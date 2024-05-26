const { Schema, model } = require('mongoose');
const { format } = require("date-fns");

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
    type: Date,
    get: formatTime
  }
},
{
  toJSON: {
    getters: true
  },
  id: false
});

// Getter function to return timestamp in an easier format to read
function formatTime(createdAt) {
  return format(createdAt, "PPpp");
}

const Report = model('Report', reportSchema);

module.exports = Report;