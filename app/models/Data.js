const mongoose = require('mongoose');

const { Schema } = mongoose;
mongoose.Promise = global.Promise;


const dataSchema = new Schema({
    key: {
        type: String,
        ref: 'Key',
        required: 'No valid key For this data'
    },
    message: {
        type: String,
        required: 'Please provide a valid message'
    },
    created: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Data', dataSchema);

