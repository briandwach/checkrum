const { Schema, Types } = require('mongoose');

const equipmentSchema = new Schema({
  equipmentId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  equipmentName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  }, 
});

module.exports = equipmentSchema;