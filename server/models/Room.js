const { Schema, model } = require('mongoose');
const equipmentSchema = require('./Equipment');
const dateFormat = require('../utils/dateFormat');

const roomSchema = new Schema({
  roomName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  client: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  location: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  equipment: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Equipment',
    },
  ],
  lastInspectionDate: {
    type: Date, 
    default: Date.now
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
