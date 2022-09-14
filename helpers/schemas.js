const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');



exports.phone = new mongoose.Schema({
    fullNumber: { type: String, required: false },
    countryCode: { type: String, required: false },
    shortNumber: { type: String, required: false }
}, { _id: false, timestamps: true })


exports.profile = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    middlename: {
        type: String,
        required: false,
    },
    lastname: {
        type: String,
        required: true,
    },
    displayname: {
        type: String,
        required: true,
    },
    birthdate: {
        type: Date,
        required: false,
    },
}, { _id: false,timestamps: true })