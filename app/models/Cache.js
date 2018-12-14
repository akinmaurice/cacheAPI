const mongoose = require('mongoose');

const { Schema } = mongoose;
mongoose.Promise = global.Promise;
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const cacheSchema = new Schema({
    name: {
        type: String,
        required: 'Please provide a cache name',
        trim: true
    },
    description: {
        type: String,
        required: 'Please provide a description of the cache'
    },
    created: {
        type: Date,
        default: Date.now
    },
    ttl: Date
});


cacheSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('Cache', cacheSchema);
