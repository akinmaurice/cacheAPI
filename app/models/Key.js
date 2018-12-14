const mongoose = require('mongoose');

const { Schema } = mongoose;
mongoose.Promise = global.Promise;
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const keySchema = new Schema({
    name: {
        type: String,
        required: 'Please provide a key name',
        trim: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    ttl: Date
});


keySchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('Key', keySchema);
