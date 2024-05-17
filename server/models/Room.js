const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

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
    get: (timestamp) => dateFormat(timestamp),
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
  },
  id: false
});

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
