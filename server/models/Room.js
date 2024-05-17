const { Schema, model } = require('mongoose');

const roomSchema = new Schema({
  roomName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  }, 
  location: [
    {
        type: Schema.Types.ObjectId,
        ref: 'Location'
    }
  ],
  equipment: [
    {
      type: String,
      trim: true,
    },
  ],
  lastInspectionDate: {
    type: Date,
    required: false,
    unique: false
  },
  inspectionCycleLength: {
    type: Number,
    required: false,
    unique: false
  },
});

//Virtuals needed
//Calculate inspections overdue--return date due
//Calculate inspections due soon (next 30 days)--return due date

const Room = model('Room', roomSchema);

module.exports = Room;
