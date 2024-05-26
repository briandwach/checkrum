const { Schema, model } = require('mongoose');
const equipmentSchema = require('./Equipment');
const { format } = require("date-fns");

const roomSchema = new Schema({
  roomName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  location: {
    type: Schema.Types.ObjectId,
    ref: 'Location'
  },
  equipment: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Equipment',
    },
  ],
  lastInspectionDate: {
    type: Date,
    default: Date.now,
    get: formatTime
  },
  inspectionCycleLength: {
    type: Number,
    required: false,
    unique: false
  },
},
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  });

// Getter function to return timestamp in an easier format to read
function formatTime(createdAt) {
  return format(createdAt, "PPpp");
}

//Virtuals needed
//Calculate inspections overdue--return date due

/*
roomSchema.virtual('overdueInspection').get( function(){
  let d1 = this.lastInspectionDate;
  let d2 = new Date();
  const diff = Math.abs(d1-d2);

})
//Calculate inspections due soon (next 30 days)--return due date

roomSchema.virtual('inspectionDueDate').get(
  function(){

  }
)
*/
const Room = model('Room', roomSchema);

module.exports = Room;
