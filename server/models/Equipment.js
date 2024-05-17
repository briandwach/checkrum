const { Schema, model } = require('mongoose');

const equipmentSchema = new Schema({
  equipmentName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  }, 
});

const Equipment = model('Equipment', equipmentSchema);

module.exports = Equipment;
