const { Schema, model } = require('mongoose');

const { startOfToday, addMinutes, subMinutes, differenceInMinutes, isAfter, formatDistanceToNowStrict } = require("date-fns");

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
      virtuals: true
    },
    id: false
  });

// Virtual calculates inspection cycles based on the start of the day
// Determines the latest cycle begin and end time
// When data is fetched, determines if the current time is after the due date
// If true and the last inspected date is before the beginning of the last cycle
// Then the value for overdue is TRUE 
roomSchema.virtual('dateTimeProperties').get( function(){
  const currentTime = Date.now();
  const lastInspected = this.lastInspectionDate;
  const cycle = this.inspectionCycleLength;
  
  
  const inspectionCycles = Math.floor((differenceInMinutes(currentTime, startOfToday()) / cycle));
 
  const latestDueDate = addMinutes(startOfToday(), (inspectionCycles * cycle));

  const upcomingDueDate = addMinutes(startOfToday(), ((inspectionCycles + 1) * cycle));

  const startOfLatestCycle = subMinutes(latestDueDate, cycle);

  const nowAfterDueDate = isAfter(currentTime, latestDueDate);

  let overdueStatus = false;
  let calculateFirstMiss = startOfLatestCycle;
  let missedCycles = 0;

  if (nowAfterDueDate) {
    if (isAfter(startOfLatestCycle, lastInspected)) {
      overdueStatus= true;

      for (let cycleStart = startOfLatestCycle; isAfter(cycleStart, lastInspected); (cycleStart = subMinutes(cycleStart, cycle))) {
        missedCycles++;
        calculateFirstMiss = cycleStart;
      }
      calculateFirstMiss = addMinutes(calculateFirstMiss, cycle);
    }
  }

  const timeToUpcomingDueDate = formatDistanceToNowStrict(upcomingDueDate);

  const dateTimeProperties = {
    upcomingDueDate: upcomingDueDate,
    timeToUpcomingDueDate: timeToUpcomingDueDate,
    overdueStatus: overdueStatus,
    missedCycles: missedCycles,
    initialMissedDate: calculateFirstMiss
  }

  // Use these comments for debugging
  // console.log('Minutes since start of today: ' + differenceInMinutes(currentTime, startOfToday()));
  // console.log('Inspection Cycle: ' + cycle + ' Minutes');
  // console.log('Inspection Cycles that occurred today: ' + inspectionCycles);
  // console.log('Minutes into the day for latest due date: ' + (inspectionCycles * cycle));
  // console.log('Start of latest cycle: ' + startOfLatestCycle);
  // console.log('Last Inspected: ' + lastInspected);
  // console.log('Latested Due Date: ' + upcomingDueDate);
  // console.log('Now after due date?: ' + nowAfterDueDate)
  // console.log(overdue);

  return dateTimeProperties;
})

//Calculate inspections due soon (next 30 days)--return due date

// roomSchema.virtual('inspectionDueDate').get(
//   function(){

//   }
// )

const Room = model('Room', roomSchema);

module.exports = Room;