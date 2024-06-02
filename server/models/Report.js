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
    type: String
  }
},
{
  toJSON: {
    virtuals: true
  },
  id: false
});

reportSchema.virtual('failStatus').get(function () {
  const resultsArray = this.results;
  const hasFailed = resultsArray.some(result => result.result === false);
  return hasFailed;
});

const Report = model('Report', reportSchema);

module.exports = Report;