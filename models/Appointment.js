const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    servicegiver: {
        type: String,
        require: true
    }
});

module.exports = Appointment = mongoose.model('appointment', AppointmentSchema);