const mongoose = require('mongoose');

const ServiceProviderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    workhours: {
        type: String,
        required: true
    }
});

module.exports = ServiceProvider = mongoose.model('serviceProvider', ServiceProviderSchema);