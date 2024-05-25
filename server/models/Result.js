const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const resultSchema = new Schema({
    reportId: {
        type: Schema.Types.ObjectId,
        ref: 'Report',
        required: true
    },
    equipmentId: {
        type: Schema.Types.ObjectId,
        ref: 'Equipment',
        required: true
    },
    result: {
        type: Boolean,
        required: true,
        unique: false
    },
    comment: {
        type: String,
        required: false,
        unique: false
    }
});

const Result = model('Result', resultSchema);

module.exports = Result;