const { Schema, model } = require('mongoose');

const { endOfYesterday, previousFriday, endOfDay, endOfMonth,
  subDays, addDays, subWeeks, addWeeks, subMonths, addMonths, isAfter, 
  formatDistanceToNowStrict } = require("date-fns");

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
    type: String,
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

// Virtual calculates inspection cycles based on the cycle length
// Determines the latest due date (11:59PM of specified day and does calculations from there)
// When data is fetched, determines if the current time is after the due date
// If true and the last inspected date is before the beginning of the last cycle
// Then the value for overdue is TRUE 
roomSchema.virtual('dateTimeProperties').get(function () {
  const cycle = this.inspectionCycleLength;
  const currentTime = Date.now();
  const lastInspected = this.lastInspectionDate;

  let latestDueDate;
  let upcomingDueDate;
  let startOfLatestCycle;
  let overdueStatus = false;
  let missedCycles = 0;
  let calculateFirstMiss = startOfLatestCycle;

  if (cycle === 'Daily') {
    latestDueDate = endOfYesterday();
    upcomingDueDate = addDays(latestDueDate, 2);
    startOfLatestCycle = subDays(latestDueDate, 1);
    const nowAfterDueDate = isAfter(currentTime, latestDueDate);
    
    if (nowAfterDueDate) {
      if (isAfter(startOfLatestCycle, lastInspected)) {
        overdueStatus = true;

        for (let cycleStart = startOfLatestCycle; isAfter(cycleStart, lastInspected); (cycleStart = subDays(cycleStart, 1))) {
          missedCycles++;
          calculateFirstMiss = cycleStart;
        }
        calculateFirstMiss = addDays(calculateFirstMiss, 1);
      }
    }
  }

  if (cycle === 'Weekly') {
    latestDueDate = endOfDay(previousFriday(currentTime));
    upcomingDueDate = (addWeeks(latestDueDate, 2));
    startOfLatestCycle = subWeeks(latestDueDate, 1);
    const nowAfterDueDate = isAfter(currentTime, latestDueDate);

    if (nowAfterDueDate) {
      if (isAfter(startOfLatestCycle, lastInspected)) {
        overdueStatus = true;

        for (let cycleStart = startOfLatestCycle; isAfter(cycleStart, lastInspected); (cycleStart = subWeeks(cycleStart, 1))) {
          missedCycles++;
          calculateFirstMiss = cycleStart;
        }
        calculateFirstMiss = addWeeks(calculateFirstMiss, 1);
      }
    }
  }

  if (cycle === 'Monthly') {
    latestDueDate = subMonths(endOfMonth(currentTime), 1);
    upcomingDueDate = addMonths(latestDueDate, 2);
    startOfLatestCycle = subMonths(latestDueDate, 1);
    const nowAfterDueDate = isAfter(currentTime, latestDueDate);
    
    if (nowAfterDueDate) {
      if (isAfter(startOfLatestCycle, lastInspected)) {
        overdueStatus = true;

        for (let cycleStart = startOfLatestCycle; isAfter(cycleStart, lastInspected); (cycleStart = subMonths(cycleStart, 1))) {
          missedCycles++;
          calculateFirstMiss = cycleStart;
        }
        calculateFirstMiss = addMonths(calculateFirstMiss, 1);
      }
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

  return dateTimeProperties;
})

const Room = model('Room', roomSchema);

module.exports = Room;